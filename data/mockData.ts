
import { NormalizationRules } from '../types';

export const API_ENDPOINT = 'https://timekeepersserver.onrender.com/product/all?result=99999';

export const BRAND_RULES: NormalizationRules = {
  "Rolex": ["rol", "rolex", "oyster"],
  "Omega": ["omega", "speedmaster"],
  "Audemars Piguet": ["ap", "audemars"],
  "G-shock": ["gshock", "g-shock", "casio g"],
  "Casio": ["casio", "edifice"],
  "Dior": ["dior", "gem"],
  "Swarovski": ["swarovski", "octagon"],
  "Nike": ["nik", "nke", "force"],
  "Louis Vuitton": ["vuitton", "lv"],
  "Converse": ["conver", "chuck"]
};

export const CATEGORY_RULES: NormalizationRules = {
  "Luxury": ["luxury", "classic", "premium"],
  "Casual": ["casual", "daily"],
  "Sport": ["sport", "fitness", "active"],
  "Girls Watch": ["girls", "women", "ladies"]
};

export const sidebarDataBrand = [
  { id: "brandRolex", title: "Rolex" },
  { id: "brandOmega", title: "Omega" },
  { id: "brandAudemarsPiguet", title: "Audemars Piguet" },
  { id: "brandGshock", title: "G-shock" },
  { id: "brandCasio", title: "Casio" },
  { id: "brandDior", title: "Dior" },
  { id: "brandSwarovski", title: "Swarovski" },
  { id: "brandNike", title: "Nike" }
];

export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Classic Chronograph",
    price: 1200,
    originalPrice: 1500,
    imageUrl: ["https://picsum.photos/800/800?random=1"],
    featuredImage: "https://picsum.photos/800/800?random=1",
    brand: "Rolex",
    category: "Luxury",
    description: "A timeless classic for the modern gentleman.",
    availability: true,
    creationDate: "2024-01-01"
  },
  {
    id: 2,
    name: "Sport Diver",
    price: 850,
    originalPrice: 1000,
    imageUrl: ["https://picsum.photos/800/800?random=2"],
    featuredImage: "https://picsum.photos/800/800?random=2",
    brand: "Omega",
    category: "Sport",
    description: "Built for the deep, designed for the desk.",
    availability: true,
    creationDate: "2024-01-02"
  }
];
