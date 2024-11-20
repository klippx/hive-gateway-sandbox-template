const { gatewayConfig } = await import("./gateway.config.js");
const { createGatewayRuntime } = await import("@graphql-hive/gateway");
const gatewayRuntime = createGatewayRuntime(gatewayConfig as any);

export const startGateway = async () => {
  const port = 3000;
  console.log("Starting Hive Gateway...");
  const { createServer } = await import("http");
  const server = createServer(gatewayRuntime as any);
  return server.listen(port, () => {
    console.log(
      `Hive Gateway is running on ${new URL(
        gatewayConfig.graphqlEndpoint ?? "/graphql",
        `http://localhost:${port}`
      )}`
    );
  });
}