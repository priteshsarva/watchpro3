
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Header: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const { cart, filterState, setFilterState } = useShop();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (val: string) => {
    setFilterState(prev => ({ ...prev, search: val }));
    if (location.pathname !== '/shop') {
      navigate('/shop');
    }
  };

  return (
    <header className="sticky top-0 z-40 glass border-b border-gray-200/30">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Desktop Nav */}
        <div className="flex items-center gap-8 flex-1">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-primary">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/shop" className="text-sm font-semibold text-primary/70 hover:text-primary transition-colors tracking-wide uppercase">New Arrivals</Link>
          </nav>
        </div>

        {/* Center: Brand Logo */}
        <Link to="/" className="flex flex-col items-center">
          <span className="text-2xl font-bold tracking-tighter text-primary">WATCH PRO</span>
          <span className="text-[8px] tracking-[0.3em] font-bold text-gray-400 -mt-1 uppercase">Timeless Legacy</span>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-3 flex-1">
          <div className="hidden xl:flex items-center bg-gray-100 rounded-full px-4 py-2 w-48 focus-within:w-64 transition-all duration-300">
            <Search size={16} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search (3+ chars)..."
              className="bg-transparent border-none focus:outline-none ml-2 text-xs font-medium w-full"
              value={filterState.search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          <button 
            onClick={onOpenCart}
            className="relative p-2 text-primary hover:text-accent transition-colors ml-2"
          >
            <ShoppingBag size={22} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cart.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden glass border-t border-gray-100 p-8 space-y-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-6">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-primary">Home</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-primary">New Arrivals</Link>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..."
              className="bg-transparent border-none focus:outline-none ml-2 text-sm w-full"
              value={filterState.search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>
      )}
    </header>
  );
};
