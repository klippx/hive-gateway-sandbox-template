import type { $Resolvers } from "./generated/types.js";

export const resolvers: $Resolvers = {
  Product: {
    reviews: () => {
      return [{ body: "lovely product" }, { body: "great quality" }];
    },
  },
  Review: {
    body: async (_parent, _args, _context) => {
      return "lovely product";
    },
    product: async (_parent, _args, _context) => {
      return { id: 1, upc: "upc-1" };
    },
  },
};
