
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  imageUrl: string[];
  featuredImage: string;
  brand: string;
  category: string;
  description: string;
  availability: boolean;
  creationDate: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  search: string;
  categories: string[];
  brands: string[];
  priceRange: [number, number];
}

export interface NormalizationRules {
  [key: string]: string[];
}
