import type { GatewayConfigContext } from "@graphql-hive/gateway";
import type { MeshPlugin } from "@graphql-mesh/types";
import { servicesConfig } from "../config/services.js";

export function useRequestLog(ctx: GatewayConfigContext): MeshPlugin<any> {
  const logger = ctx.logger.child("supergraph");
  const subgraphEntries = Object.entries(servicesConfig.subgraphs);
  const map = new Map<string, string>();

  subgraphEntries.forEach(([name, subgraph]) => {
    const localUrl = `http://localhost:${subgraph.port}/graphql`;
    map.set(localUrl, name);
  });

  return {
    onDelegate({ operationName }) {
      logger.info(
        "REVIEW: When is this called?? Delegating operation to subgraphs",
        {
          operation_name: operationName,
        }
      );
    },

    // Log subgraph responses
    onFetch({ url, context, info, options: _options }) {
      if (context != null) {
        const operationName = info.operation.name?.value ?? "unknown";

        return async ({ response }) => {
          const { status } = response;
          if (status >= 500) {
            logger.error("5XX error from subgraph", {
              operation_name: operationName,
              subgraph: map.get(url),
              url,
            });
          } else {
            logger.info("Received subgraph response", {
              operation_name: operationName,
              subgraph: map.get(url),
              url,
            });
          }
        };
      }
    },

    // Log supergraph responses
    // onExecute(options) {
    //   const operationName = options.args.operationName;
    //   const variableValues = options.args.variableValues as
    //     | Record<string, unknown>
    //     | undefined;
    //   const clientName = options.args.contextValue.clientName;
    //   return {
    //     onExecuteDone({ result }) {
    //       if (!isAsyncIterable(result)) {
    //         if (operationName === "IntrospectionQuery") {
    //           return;
    //         }

    //         logger.info("incoming operation", {
    //           result: Object.keys(result),
    //           args: JSON.stringify(result.data, null, 2),
    //         });
    //       }
    //     },
    //   };
    // },
  };
}
