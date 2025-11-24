import type { $Resolvers } from "./generated/types.js";

export const resolvers = {
  User: {
    // User subgraph only defines how to resolve User entities, therefore we need to implement __resolveReference as the only
    // way to arrive at User entities is through references from other subgraphs.
    __resolveReference(representation) {
      // console.log(
      //   "[USER] Resolving User reference in User subgraph:",
      //   representation
      // );
      let name = "Unknown User";
      if (representation.id === "user-1") {
        name = "John Doe";
      } else if (representation.id === "user-2") {
        name = "Jane Smith";
      } else if (representation.id === "user-3") {
        name = "Jim Brown";
      }
      return {
        ...representation,
        name,
      };
    },
  },
  Organization: {
    name: (parent) => {
      // console.log(
      //   "[USER] This is the Organization name resolver, parent:",
      //   parent
      // );
      let name = "Unknown Organization";
      if (parent.id === "org-1") {
        name = "Organization One";
      } else if (parent.id === "org-2") {
        name = "Organization Two";
      } else if (parent.id === "org-3") {
        name = "Organization Three";
      }
      return name;
    },
  },
} satisfies $Resolvers;
