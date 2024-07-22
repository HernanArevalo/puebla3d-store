// product.interface.ts

export interface ProductColor {
  id: string;
  name: string;
  stock: number;
  inStockId: string;
}

export interface InStock {
  id: string;
  size: ValidSizes;
  price: number;
  oldPrice?: number | null;
  productId: string;
  colors: ProductColor[];
}

export interface ProductImage {
  url: string;
}

export interface Category {
  id: string;
  name: string;
}

export type ValidSizes = 'small' | 'medium' | 'large' | 'extralarge' | 'unique';

export interface Product {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  enabled: boolean;
  useStock: boolean;
  images: string[];
  categoryId: string;
  sizes: ValidSizes[];
  ProductImage: ProductImage[];
  inStock: InStock[];
  category: Category;
  colors: string[];
  price: number;
}
