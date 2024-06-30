const AWS  = import('aws-sdk')
const ENDPOINT = "izduk8fwqc.execute-api.ap-south-1.amazonaws.com/production/";
const client   = new AWS.ApiGatewayManagementApi({endpoint:ENDPOINT});
const sendToOne = async(id,body)=>{
  try{
    await client.postToConnection({
      'ConnectionId':id,
      'Data':Buffer.from(JSON.stringify(body))
    }).promise();
  }
  catch(err){
    console.log(err);
  }
};
const sendToAll = async(ids,body)=>{
  const all = ids.map(i=>sendToOne(i,body));
  return Promise.all(all);
};

exports.handler = async(event)=>{
  if(event.requestContext){
const connectionId = event.requestContext.connectionId;
const routeKey = event.requestContext.routeKey;

let body = {};
try{
  if(event.body){
    body = JSON.parse(event.body);
  }

}
catch(err){
  console.log(err)
}
switch (routeKey) {
  case '$connect':
    break;
      case '$disconnect':
    break;
      case '$default':
    break;
      case 'setName':
    break;
          case 'sendPublic':
            await sendToAll([connectionId],{publicMessage:"this is public"})
    break;
          case 'sendPrivate':
            await sendToOne(connectionId,{privateMessage:"this is public"})

    break;
    
}
const response = {
  statusCode:200,
  body:JSON.stringify("hello"),
};
return response;}
}
