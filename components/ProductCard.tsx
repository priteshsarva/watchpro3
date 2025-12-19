
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useShop, formatCurrency } from '../context/ShopContext';
import { ShoppingBag, MoreHorizontal } from 'lucide-react';

export const ProductCard: React.FC<{ product: Product; viewMode?: 'grid' | 'list' }> = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useShop();
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on "Add to Cart" button specifically
    if ((e.target as HTMLElement).closest('.add-to-cart-btn')) return;
    navigate(`/product/${product.id}`);
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={handleCardClick}
        className="group flex gap-6 p-6 bg-white rounded-[2rem] border border-gray-100 hover:border-primary transition-all cursor-pointer shadow-sm hover:shadow-md"
      >
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
           <img src={product.featuredImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-accent">{product.brand}</p>
          <h3 className="text-xl font-bold text-primary">{product.name}</h3>
          <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-2xl font-black text-primary">{formatCurrency(product.price)}</span>
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              className="add-to-cart-btn p-3 bg-primary text-white rounded-full hover:bg-accent transition-colors"
            >
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleCardClick}
      className="group flex flex-col gap-3 md:gap-4 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-gray-50 border border-gray-100">
        <img 
          src={product.featuredImage} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Actions Overlay */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button 
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="add-to-cart-btn p-3 bg-white text-primary rounded-full shadow-xl hover:bg-primary hover:text-white transition-all scale-90 hover:scale-100"
          >
            <ShoppingBag size={18} />
          </button>
        </div>

        {/* Brand Badge */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest text-primary border border-white/40">
          {product.brand}
        </div>
      </div>

      {/* Info Section */}
      <div className="px-1 md:px-2 space-y-0.5 md:space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="text-sm md:text-lg font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors truncate">
            {product.name}
          </h3>
          <button className="hidden md:block p-1 text-gray-300 hover:text-gray-600">
            <MoreHorizontal size={16} />
          </button>
        </div>
        <p className="hidden md:block text-xs text-gray-400 font-medium line-clamp-1">Premium materials with hand-crafted finishes.</p>
        <div className="flex items-center gap-2 md:gap-3 pt-1">
          <span className="text-base md:text-xl font-black text-primary">{formatCurrency(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-[10px] md:text-sm text-gray-300 line-through font-medium">{formatCurrency(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
};
