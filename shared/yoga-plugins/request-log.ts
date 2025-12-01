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
      let variables: Record<string, any> | undefined = args.variableValues;
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
      const formattedQuery = print(args.document)
        .replace(/\n/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const formattedVariables = variables
        ? JSON.stringify(variables, null, 2)
            .replace(/\n/g, " ")
            .replace(/\s+/g, " ")
            .trim()
        : undefined;

      return {
        onExecuteDone({ result }) {
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
              subgraph,
              operationName,
              query: formattedQuery,
              variables: formattedVariables,
              errors: result.errors,
            });
          } else {
            yogaLogger.info("Subgraph operation completed successfully", {
              subgraph,
              operationName,
              query: formattedQuery,
              variables: formattedVariables,
            });
          }
        },
      };
    },
  };
};
