import { Table } from "sst/node/table";
import handler from "@webhook-proxy/core/handler";
import dynamoDb from "@webhook-proxy/core/dynamodb";

export const main = handler(async (event:any) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: Table.Connections.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      customerId: "123", // The id of the customer
      connectionId: event.pathParameters.connectionId, // The id of the connection from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET connectionName = :connectionName, tokenUri = :tokenUri",
    ExpressionAttributeValues: {
      ":connectionName": data.connectionName || null,
      ":tokenUri": data.tokenUri || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});