import { $Product } from "../generated/types.js";

// Remove price field from Product type to be able to resolve it lazily when requested only.
export type Product = Omit<$Product, "price">;
