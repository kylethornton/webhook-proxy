import { Bucket, Table, StackContext } from "sst/constructs";

export function StorageStack({ stack, app }: StackContext) {

  // Create an S3 bucket
  const bucket = new Bucket(stack, "Uploads");

  // Create the DynamoDB table
  const table = new Table(stack, "Connections", {
    fields: {
      customerId: "string",
      connectionId: "string",
      name: "string",
    },
    primaryIndex: { partitionKey: "customerId", sortKey: "connectionId" },
  });
  
  return {
    table,
    bucket,
  };
}