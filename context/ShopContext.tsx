
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, CartItem, FilterState, NormalizationRules } from '../types';
import { API_ENDPOINT, BRAND_RULES, CATEGORY_RULES, MOCK_PRODUCTS } from '../data/mockData';
import { getCookie, setCookie } from '../utils/storage';

interface ShopContextType {
  products: Product[];
  filteredProducts: Product[];
  cart: CartItem[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  loading: boolean;
  sortBy: string;
  setSortBy: (val: string) => void;
  isInfiniteScroll: boolean;
  setIsInfiniteScroll: (val: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount); // Direct price usage as requested
};

export const normalizeData = (input: string, rules: NormalizationRules): string => {
  let cleanInput = input || '';
  try {
    cleanInput = decodeURIComponent(cleanInput.replace(/\+/g, ' ')).toLowerCase().trim();
  } catch (e) {
    cleanInput = cleanInput.replace(/\+/g, ' ').toLowerCase().trim();
  }

  for (const [canonical, variants] of Object.entries(rules)) {
    if (variants.some(v => cleanInput === v.toLowerCase().trim())) {
      return canonical;
    }
  }
  return input;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(false);
  
  const initialFilterState: FilterState = {
    search: '',
    categories: [],
    brands: [],
    priceRange: [0, 5000],
  };

  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);

  const resetFilters = () => setFilterState(initialFilterState);

  const mapApiDataToProduct = (data: any): Product => {
    let images: string[] = [];
    try {
      images = JSON.parse(data.imageUrl);
    } catch {
      images = [data.featuredimg];
    }

    return {
      id: data.productId,
      name: data.productName,
      price: data.productOriginalPrice || 0,
      originalPrice: data.productOriginalPrice || 0,
      imageUrl: images,
      featuredImage: data.featuredimg,
      brand: normalizeData(data.productBrand, BRAND_RULES),
      category: normalizeData(data.catName, CATEGORY_RULES),
      description: data.productDescription || "No description available.",
      availability: data.availability === 1,
      creationDate: data.productDateCreation,
    };
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        setProducts(data.map(mapApiDataToProduct));
      } catch (error) {
        console.error("API Fetch failed, using mock data", error);
        setProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    const savedCart = getCookie('cart');
    if (savedCart) setCart(savedCart);
  }, []);

  useEffect(() => {
    setCookie('cart', cart);
  }, [cart]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const searchTerm = filterState.search.trim().toLowerCase();
      // Live search kicks in at 3 chars, otherwise shows all
      const matchesSearch = searchTerm.length < 3 || 
                          p.name.toLowerCase().includes(searchTerm) ||
                          p.brand.toLowerCase().includes(searchTerm) ||
                          p.category.toLowerCase().includes(searchTerm);
      
      const matchesCategory = filterState.categories.length === 0 || filterState.categories.includes(p.category);
      const matchesBrand = filterState.brands.length === 0 || filterState.brands.includes(p.brand);
      const matchesPrice = p.price >= filterState.priceRange[0] && p.price <= filterState.priceRange[1];

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') result.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());

    return result;
  }, [products, filterState, sortBy]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return removeFromCart(productId);
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  return (
    <ShopContext.Provider value={{
      products, filteredProducts, cart, filterState, setFilterState, resetFilters,
      addToCart, removeFromCart, updateCartQuantity, clearCart, loading,
      sortBy, setSortBy, isInfiniteScroll, setIsInfiniteScroll
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within ShopProvider");
  return context;
};
