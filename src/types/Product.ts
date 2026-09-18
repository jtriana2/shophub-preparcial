export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  stock: number;
}

export interface ProductsResponse {
  products: Product[];
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  stock: number;
  description?: string;
  brand?: string;
}

export interface ProductsResponse {
  products: Product[];
}