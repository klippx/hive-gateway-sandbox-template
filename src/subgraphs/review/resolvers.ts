export const resolvers: Resolvers<Context> = {
  Product: {
    reviews: () => {
      return [{ upc: 'upc-1' }, { upc: 'upc-1' }];
    },
  },
  Review: {
    body: async (_parent, _args, context) => {
      return "lovely product"
    },
    product: async (_parent, _args, context) => {
      return { upc: 'upc-1' }
    },
  },
};
