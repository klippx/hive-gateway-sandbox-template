import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { buildSchema } from "./build-schema.js";
import { useRequestLog } from "@sandbox-template/shared/yoga-plugins/index.js";

export const startUserServer = () => {
  console.info("Starting User subgraph....");
  const port = 4002;
  const schema = buildSchema();
  const yoga = createYoga({
    schema,
    plugins: [useRequestLog({ subgraph: "user" })],
  });
  const server = createServer(yoga);
  server.listen(port, () => {
    console.info(
      `User subgraph is running on http://localhost:${port}/graphql`
    );
  });
};
