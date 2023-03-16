import { Table } from "sst/node/table";
import * as uuid from "uuid";
import handler from "@webhook-proxy/core/handler";
import dynamoDb from "@webhook-proxy/core/dynamodb";


export const main = handler(async (event:any) => { //TODO: add event type
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  
  const params = {
    TableName: Table.Connections.tableName,
    Item: {
      // The attributes of the item to be created
      customerId: "123", // The id of the connection
      connectionId: uuid.v1(), // A unique uuid
      name: data.name,
      tokenUri: data.tokenUri,
      createdAt: Date.now(), // Current Unix timestamp
    },
  };
  
  await dynamoDb.put(params);
  
  return params.Item;
});