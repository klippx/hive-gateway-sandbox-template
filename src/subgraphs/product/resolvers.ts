export const resolvers: Resolvers<Context> = {
  Product: {
    upc: async (parent, _args, _context) => {
      return `upc-${parent.id}`;
    },
    name: async (parent, _args, _context) => {
      return `name-${parent.id}`;
    },
    price: async (parent, _args, _context) => {
      return parent.id * 3.1415;
    },
  },
  Query: {
    topProducts: async (_parent, _args, context) => {
      return [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    },
  },
};
