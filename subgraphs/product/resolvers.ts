import type { $Resolvers } from "./generated/types.js";

export const resolvers: $Resolvers = {
   Image: {
    count: async (_parent, _args, _context) => {
      return 42;
    },
  },
  Product: {
    upc: async (parent, _args, _context) => {
      return `upc-${parent.id}`;
    },
    name: async (parent, _args, _context) => {
      return `name-${parent.id}`;
    },

  },
  Query: {
    topProducts: async (_parent, _args, _context) => {
      return [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    },
  },
};
