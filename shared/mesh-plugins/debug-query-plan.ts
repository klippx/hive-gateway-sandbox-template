import type { GatewayConfigSupergraph } from "@graphql-hive/gateway";
import {
  print,
  Kind,
  SelectionNode,
  ASTNode,
  OperationTypeNode,
} from "graphql";

type PluginsConfig = GatewayConfigSupergraph["plugins"];
type Plugin = ReturnType<NonNullable<PluginsConfig>>[number];

export const useDebugQueryPlan: Plugin = {
  // onDelegationStageExecute({ object, selectionSet }) {
  //   console.log(`🚀 Executing delegation stage...`, {
  //     query: printSelections(selectionSet.selections),
  //     variables: object,
  //   });
  //   return ({ result }) => {
  //     console.log(`✅ Delegation stage executed.`, result);
  //     // No-op for now
  //   };
  // },
  onDelegationPlan(payload) {
    const { typeName, fieldNodes, subgraph } = payload;

    console.log(`✨ Planning ${typeName}...`);
    console.log(
      `  🎯 ${subgraph}, selections:\n  ${printSelections(fieldNodes)}`
    );

    return (donePayload) => {
      const { delegationPlan } = donePayload;
      console.log(
        `=> Federated ${typeName} fields will be fetched in one extra sequence containing ${delegationPlan.length} step(s):`
      );

      delegationPlan.forEach((step) => {
        for (const [{ name }, { selections }] of step.entries()) {
          console.log(
            `  🎯 ${name} subgraph, selections:\n  ${printSelections(selections)}`
          );
        }
      });
    };
  },
};

function printSelections(selectionNode: readonly SelectionNode[]) {
  const doc: ASTNode = {
    kind: Kind.DOCUMENT,
    definitions: [
      {
        kind: Kind.OPERATION_DEFINITION,
        operation: OperationTypeNode.QUERY,
        name: { kind: Kind.NAME, value: "TempQuery" },
        variableDefinitions: [],
        directives: [],
        selectionSet: {
          kind: Kind.SELECTION_SET,
          selections: selectionNode,
        },
      },
    ],
  };

  const queryString = print(doc);
  const withoutOperation = queryString
    .replace(/^query TempQuery\s*{/, "")
    .trim()
    .replace(/}$/, "")
    .trim();
  return withoutOperation;
}
