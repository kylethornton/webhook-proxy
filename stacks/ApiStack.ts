import { Api, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }: StackContext) {
  const { table } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET /connections": "packages/functions/src/list.main",
      "GET /connections/{connectionId}": "packages/functions/src/get.main",
      "POST /connections": "packages/functions/src/create.main",
      "PUT /connections/{connectionId}": "packages/functions/src/update.main",
      "DELETE /connections/{id}": "packages/functions/src/delete.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}