import type { $Resolvers, $User } from "./generated/types.js";
import { Review } from "./mappers/review.js";

export const resolvers = {
  Product: {
    // Here we are adding a new resolver for the Product type in the Review subgraph,
    // this determines how to fetch reviews for a given product.
    reviews: (parent) => {
      // console.log("[REVIEW] Resolving reviews for Product", parent);
      switch (parent.upc) {
        case "upc-1":
          return [
            {
              id: "review-1",
              // body: "lovely product",
              user: {
                id: "user-1",
                organization: { id: "org-1" },
              } satisfies $User,
            } satisfies Review,
            {
              id: "review-2",
              // body: "great quality",
              user: {
                id: "user-2",
                organization: { id: "org-2" },
              } satisfies $User,
            } satisfies Review,
          ];
        case "upc-2":
          return [
            {
              id: "review-3",
              // body: "hefty weight, but rusts quickly; ultimately not worth the price",
              user: {
                id: "user-3",
                organization: { id: "org-3" },
              } satisfies $User,
            } satisfies Review,
          ];
        default:
          return [];
      }
    },
  },
  // Lazy resolution of the body field in Review type, we have omitted `body` in mappers.
  // Perhaps this is a field that is expensive to resolve, e.g. it fetches raw data but needs
  // to do post processing (convert to html/markdown) so we only want to do it for requested review instances.
  Review: {
    body: async (parent, _args, _context) => {
      // console.log("[REVIEW] Resolving body for Review", parent);
      // Simulate "markdown rendering" delay
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 50 + 50)
      );
      switch (parent.id) {
        case "review-1":
          return "lovely product";
        case "review-2":
          return "great quality";
        case "review-3":
          return "hefty weight, but rusts quickly; ultimately not worth the price";
        default:
          return "unknown review";
      }
    },
  },
} satisfies $Resolvers;
