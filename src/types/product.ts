export type ProductOption = {
  name: string;
  values: string[];
};

/* export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string; // Main/thumbnail image (for backward compatibility)
  images?: string[]; // Array of additional images
  category: string;
  slug: string;
  colors?: string[]; // Available colors
  sizes?: string[]; // Available sizes
  options?: ProductOption[]; // Additional custom options
  stock?: number; // Available stock quantity
}; */


// types/product.ts
export interface Product {
  id: string;
  nameKey: string;
  descriptionKey: string;
  price: number;
  currency: string;
  image: string;
  images: string[];
  categoryKey: string;
  slug: string;
  colors: string[];
  sizes?: string[];
  stock: number;
}

export type Category = {
  name: string;
  slug: string;
};

