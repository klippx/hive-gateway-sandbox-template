import { $Review } from "../generated/types.js";

// Remove body field from Review type to be able to resolve it lazily
export type Review = Omit<$Review, "body">;
