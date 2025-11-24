import { createSupergraphSchema } from "./gateway/create-supergraph-schema.js";
import { startProductServer } from "./subgraphs/product/index.js";
import { startReviewServer } from "./subgraphs/review/index.js";
import { startUserServer } from "./subgraphs/user/index.js";
import { startGateway } from "./gateway/gateway.js";

console.info("Starting subgraphs...");
await Promise.all([
  startProductServer(),
  startReviewServer(),
  startUserServer(),
]);

console.info("Generating file: supergraph.graphql");
await createSupergraphSchema();

console.info("Starting gateway");
await startGateway();
