import type { $Resolvers } from "./generated/types.js";

export const resolvers: $Resolvers = {
  Product: {
    images: () => {
      return [{ id: 1, url: "http://example.com/image1.jpg" }, { id: 2, url: "http://example.com/image2.jpg" }];
    },
  },
  // Image: {
  //   url: async (_parent, _args, _context) => {
  //     return "http://example.com/image1.jpg";
  //   },
  // },
};
