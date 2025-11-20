# Sandbox `hive-gateway` project template

You can use this repo in order to quickly create a template for reproducing issues related to `hive-gateway`.

Create a fork from this template, and then in your sandbox terminal, use `yarn start` to fire up the gateway and subgraphs.

## Local development

Install deps:

```shell
$ corepack enable

$ yarn install
```

Start local dev server, this will automatically re-generate the `./supergraph.graphql` schema:

```shell
$ yarn start
info: Using supergraph schema defined in ./supergraph.graphql
Starting subgraphs...
Starting Product subgraph....
Starting Review subgraph....
Generating file: supergraph.graphql
info: Ensuring DGSs are up...
Product subgraph is running on http://localhost:4000/graphql
Review subgraph is running on http://localhost:4001/graphql
info:  ✔ product
info:  ✔ review
info: Composing supergraph.graphql...
info:  ✔ Composition successful.
info:  ✔ Supergraph schema formatted.
Starting gateway
Starting Hive Gateway...
Hive Gateway is running on http://localhost:3000/
```

## Codesandbox

Use the following link: https://codesandbox.io/s/github/klippx/hive-gateway-sandbox-template

## StackBlitz

Use the following link: https://stackblitz.com/github/klippx/hive-gateway-sandbox-template
