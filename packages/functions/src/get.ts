import { Table } from "sst/node/table";
import handler from "@webhook-proxy/core/handler";
import dynamoDb from "@webhook-proxy/core/dynamodb";

export const main = handler(async (event:any) => {
  const params = {
    TableName: Table.Connections.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      customerId: "123", // The id of the customer
      connectionId: event.pathParameters.connectionId, // The id of the connection from the path
    },
  };

  const result = await dynamoDb.get(params);

  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Item;
});