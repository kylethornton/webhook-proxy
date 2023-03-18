import * as iam from "aws-cdk-lib/aws-iam";
import { Cognito, StackContext, use } from "sst/constructs";
import { ApiStack } from "./ApiStack";

export function AuthStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);

  // Create a Cognito User Pool and Identity Pool
  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
  });

  auth.attachPermissionsForAuthUsers(stack, [
    // Allow access to the API
    api,
  ]);
  
  // Show the auth resources in the output
  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });

  // Return the auth resource
  return {
    auth,
  };
}