import * as fs from "fs";
import { parseEnv, z } from "znv";
import { defineConfig } from "@graphql-hive/gateway";
import {
  unifiedGraphHandler,
  useQueryPlan,
} from "@graphql-hive/router-runtime";
import { log } from "./logger.js";

const envSchemas = {
  SERVICE_NAME: z.string().default("hive-gateway"),
  HIVE_CDN_ENDPOINT: z.string().optional(),
  HIVE_CDN_KEY: z.string().optional(),
};

const config = parseEnv(process.env, envSchemas);
const createSupergraph = () => {
  if (config.HIVE_CDN_ENDPOINT && config.HIVE_CDN_KEY) {
    log.info("Using Hive CDN to fetch supergraph schema");
    return {
      type: "hive" as const,
      endpoint: config.HIVE_CDN_ENDPOINT,
      key: config.HIVE_CDN_KEY,
    };
  }

  // Check if the supergraph schema is available locally
  if (fs.existsSync("./supergraph.graphql")) {
    log.info("Using supergraph schema defined in ./supergraph.graphql");
    return "./supergraph.graphql";
  }

  throw new Error(
    "Failed to start gateway, supergraph schema is not available"
  );
};

const defaultQuery = `query SampleQuery {
  topProducts {
    name
    price
    reviews {
      body
      user {
        name
        organization {
          name
        }
      }
    }
  }
}`.trim();

export const gatewayConfig = defineConfig({
  unifiedGraphHandler,
  supergraph: createSupergraph(),
  graphqlEndpoint: "/",
  graphiql: {
    defaultQuery,
  },
  plugins: (ctx) => [
    useQueryPlan({
      // Query plan available callback
      onQueryPlan(queryPlan) {
        ctx.log.info({ queryPlan }, "Generated Query Plan");
      },
      // Expose the query plan in the graphql result extensions
      expose: true,
    }),
  ],
});
