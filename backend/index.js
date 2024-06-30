const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
const ConnectToDb = require("./mongodb/mongo_connect");
const clientRoutes = require('./routes/client');
const adminRoutes = require('./routes/admin');
const waiterRoutes = require('./routes/waiter');
const superAdmin = require('./routes/superAdmin');
const serverless = require("serverless-http");
const apis = require("./controllers/api");
const ENDPOINT = "https://2378vailra.execute-api.ap-south-1.amazonaws.com/production/";

const { ApiGatewayManagementApi } = require('@aws-sdk/client-apigatewaymanagementapi');
const client = new ApiGatewayManagementApi({ endpoint: ENDPOINT });
const Notifications = require('./mongodb/schemas/notifications')
const names = {};

  
  
ConnectToDb();

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.use('/api/client', clientRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/waiter', waiterRoutes);
app.use('/api/superAdmin', superAdmin);

const port =2000;


httpServer.listen(port, () => {
    console.log(`Server Started at ${port}`)
})


module.exports.handler = serverless(app);