import type { $Resolvers } from "./generated/types.js";

export const resolvers: $Resolvers = {
  Product: {
    price: async (parent, _args, _context) => {
      // Simulate "price calculation" delay
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 50 + 50)
      );
      switch (parent.upc) {
        case "upc-1":
          return 29.99;
        case "upc-2":
          return 49.99;
        default:
          throw new Error(`Error resolving price, unknown UPC: ${parent.upc}`);
      }
    },
  },
  Query: {
    // We could have returned everything in this resolver, but to demonstrate mappers and lazy resolution,
    // we are returning only the UPCs and names here and letting Product resolvers above handle the `price`.
    topProducts: async (_parent, _args, _context) => {
      // console.log("[PRODUCT] Resolving Query topProducts for Product", _parent);
      return [
        { upc: "upc-1", name: "Teapot" },
        { upc: "upc-2", name: "Kettle" },
      ];
    },
  },
};
