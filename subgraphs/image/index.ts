import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { buildSchema } from "./build-schema.js";
import { useRequestLog } from "@sandbox-template/shared/yoga-plugins/index.js";

export const startImageServer = () => {
  console.info("Starting Image subgraph....");
  const port = 4002;
  const schema = buildSchema();
  const yoga = createYoga({
    schema,
    plugins: [useRequestLog({ subgraph: "image" })],
  });
  const server = createServer(yoga);
  server.listen(port, () => {
    console.info(
      `Image subgraph is running on http://localhost:${port}/graphql`
    );
  });
};
