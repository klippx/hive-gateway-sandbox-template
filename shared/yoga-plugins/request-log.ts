import type { Plugin, YogaLogger } from "graphql-yoga";
import { print } from "graphql";

interface RequestLogOptions {
  subgraph: string;
}

export const useRequestLog = ({ subgraph }: RequestLogOptions): Plugin => {
  let yogaLogger: YogaLogger;

  return {
    onYogaInit({ yoga }) {
      // Access Yoga's internal logger
      yogaLogger = yoga.logger;
    },

    onExecute({ args }) {
      const operationName = args.operationName;
      let variables = args.variableValues;
      if (
        typeof variables === "object" &&
        variables !== null &&
        "representations" in variables
      ) {
        variables = {
          ...variables,
          representations: JSON.stringify(variables.representations),
        };
      }
      const query = print(args.document)
        .replace(/\n/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const requestTimestamp = Date.now();

      return {
        onExecuteDone({ result }) {
          const duration = Date.now() - requestTimestamp;

          if (
            operationName === "IntrospectionQuery" ||
            !(operationName || variables)
          ) {
            return;
          }

          // Check if result has errors
          const hasErrors =
            result &&
            typeof result === "object" &&
            "errors" in result &&
            result.errors &&
            result.errors.length > 0;

          if (hasErrors) {
            yogaLogger.error("Subgraph operation completed with errors", {
              query,
              subgraph,
              operationName,
              variables,
              duration,
              errors: result.errors,
            });
          } else {
            yogaLogger.info("Subgraph operation completed successfully", {
              query,
              subgraph,
              operationName,
              variables,
              duration,
            });
          }
        },
      };
    },

    // onResponse({ response }) {
    //   const status = response.status;
    //   const statusText = response.statusText;

    //   if (status >= 400) {
    //     yogaLogger.error("GraphQL error response", {
    //       subgraph,
    //       status,
    //       statusText,
    //       headers: Object.fromEntries(response.headers.entries()),
    //     });
    //   } else {
    //     yogaLogger.info("GraphQL response sent", {
    //       subgraph,
    //       status,
    //       statusText,
    //     });
    //   }
    // },
  };
};
