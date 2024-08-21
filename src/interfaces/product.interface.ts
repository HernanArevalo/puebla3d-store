// product.interface.ts

export interface ProductColor {
  id: string;
  name: string;
  stock: number;
  inStockId: string;
}


export interface ProductInStock {
  id: string;
  size: string;
  price: number;
  oldPrice?: number | null;
  productId: string;
  colors: ProductColor[];
}

export interface ProductImage {
  url: string;
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
  category: string;
  images: any;
  inStock: ProductInStock[]
}

export interface CartProduct {
  id: string;
  price: number;
  size: string;
  color: string,
  slug: string;
  title: string;
  quantity: number;
  stock: number;
  image: string;
}