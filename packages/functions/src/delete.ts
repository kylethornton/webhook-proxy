import { Table } from "sst/node/table";
import handler from "@webhook-proxy/core/handler";
import dynamoDb from "@webhook-proxy/core/dynamodb";

export const main = handler(async (event:any) => {
  const params = {
    TableName: Table.Connections.tableName,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      customerId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      connectionId: event.pathParameters.id, // The id of the connection from the path
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});