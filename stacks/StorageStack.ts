import { Table, StackContext } from "sst/constructs";

export function StorageStack({ stack, app }: StackContext) {

  // Create the DynamoDB table
  const connectionsTable = new Table(stack, "Connections", {
    fields: {
      customerName: "string",
      connectionId: "string",
      connectionName: "string",
      tokenUri: "string",
    },
    primaryIndex: { partitionKey: "customerName", sortKey: "connectionId" },
  });

  const userCustomersTable = new Table(stack, "UserCustomers", {
    fields: {
      userId: "string",
      customerName: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "customerName" },
  });

  return {
    connectionsTable,
    userCustomersTable,
  };
}