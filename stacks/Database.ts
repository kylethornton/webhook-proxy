import { Table, StackContext } from "sst/constructs";

export function StorageStack({ stack, app }: StackContext) {
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
  };
}