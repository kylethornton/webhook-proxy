import { Table } from "sst/node/table";
import handler from "@webhook-proxy/core/handler";
import dynamoDb from "@webhook-proxy/core/dynamodb";

export const main = handler(async (event:any) => {
  const params = {
    TableName: Table.Connections.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    KeyConditionExpression: "customerId = :customerId",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be the id of the author
    ExpressionAttributeValues: {
      ":customerId": event.requestContext.authorizer.iam.cognitoIdentity.identityId,
    },
  };

  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return result.Items;
});