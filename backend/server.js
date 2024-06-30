const ENDPOINT = "https://zatgrpz5v7.execute-api.ap-south-1.amazonaws.com/prod";
const ConnectToDb = require("./mongodb/mongo_connect");
const { ApiGatewayManagementApi } = require('@aws-sdk/client-apigatewaymanagementapi');
const client = new ApiGatewayManagementApi({ endpoint: ENDPOINT });
const Notifications = require('./mongodb/schemas/notifications')
const Orders = require('./mongodb/schemas/Orders')

const {AddConnectionFromMongoDB,removeConnectionFromMongoDB,GetAllConnectionsFromMongoDB ,removeAllConnectionsFromMongoDB}= require('./connect');
const names = {};


const connectionActivityTimestamps = new Map();

// Function to update the last activity timestamp for a connection
// 


ConnectToDb();
const getAllNotifications = async () => {
    try {
      // Use the Notifications model to find all notifications in the database
      const notifications = await Notifications.find().exec();
      return notifications;
    } catch (err) {
      console.error("Error fetching notifications:", err);
      throw err;
    }
  };
  const getAllOrders = async () => {
    try {
      // Use the Notifications model to find all notifications in the database
      const orders = await Orders.find().exec();
      return orders;
    } catch (err) {
      console.error("Error fetching Orders:", err);
      throw err;
    }
  };
  
  const sendToOne = async (id, body) => {
    return new Promise(async (resolve, reject) => {
      try {
        await client.postToConnection({
          'ConnectionId': id,
          'Data': Buffer.from(JSON.stringify(body))
        }, async (err, data) => {
          if (err) {
            // Log the error and connection ID
            console.error(`Error for connection ID ${id}:`, err);
  
            // Check if the error is a "gone" error (status code 410)
            if (err.statusCode === 410) {
              console.log("Connection is gone, treating as success.");
  
              // Remove the connection from your collection
              await removeConnectionFromMongoDB(id);
            }
  
            // Treat all errors, including "unknown" errors, as a success
            // Remove all connections if needed
  
            resolve(data);
          } else {
            console.log("Message sent successfully");
            resolve(data);
          }
        });
      } catch (err) {
        console.error(`Error for connection ID ${id}:`, err);
  
        // Treat all errors, including unknown errors, as a success
        // Remove all connections if needed
        await removeConnectionFromMongoDB(id);
  
        reject(err);
      }
    });
  };
  
  
  
  const sendToAll = async (ids, body) => {
    const all = ids.map(i => sendToOne(i, body));
    return Promise.all(all);
  };
  
exports.handler = async (event) => {
  if (event.requestContext) {
    const connectionId = event.requestContext.connectionId;
    const routeKey = event.requestContext.routeKey;
    let body = {};
    try {
      if (event.body) {
        body = JSON.parse(event.body);
      }
    } catch (err) {
      console.log(err);
    }

    switch (routeKey) {
      case '$connect':
        try {
          // Check if the connectionId already exists
          
            // Insert the connection information into MongoDB
            await AddConnectionFromMongoDB(connectionId);
            
            // Update the last activity timestamp
            
            console.log('Connection established:', connectionId);
          
        } catch (err) {
          console.error('Error during connection:', err);
        }
        break;
      
        case '$disconnect':
          try {
            // Remove the connection information from MongoDB
            await removeConnectionFromMongoDB(connectionId);
            console.log('Connection disconnected:', connectionId);
          } catch (err) {
            console.error('Error removing connection from MongoDB:', err);
          }
          break;
        
      case '$default':
        break;
      case 'setName':
        names[connectionId] = body.name;
        break;
      case 'sendPublic':
        const newNotifications = await getAllNotifications();
        const connectedClients1 = await GetAllConnectionsFromMongoDB();
        console.log(newNotifications)
        console.log(connectedClients1)


        await sendToAll(connectedClients1, { publicMessage: newNotifications });
        break;
      case 'sendPrivate':
        const newOrder = await getAllOrders();
        const connectedClients2 = await GetAllConnectionsFromMongoDB();
        console.log(newOrder)
        console.log(connectedClients2)
        await sendToAll(connectedClients2, { privateMessage: newOrder });        break;

      default:
        break;
    }



    const response = {
      statusCode: 200,
      body: JSON.stringify("hello"),
    };
    return response;
  }
};

module.exports.GetAllConnectionsFromMongoDB = GetAllConnectionsFromMongoDB;
module.exports.sendToAll = sendToAll;
