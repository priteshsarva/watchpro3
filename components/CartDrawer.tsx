
import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop, formatCurrency } from '../context/ShopContext';
import { Button } from './UI/Button';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { cart, updateCartQuantity, removeFromCart } = useShop();
  const navigate = useNavigate();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className={`relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Your Bag <span className="text-gray-400 text-sm font-normal">({cart.length} items)</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center text-accent mb-4">
                <ShoppingBag size={40} />
              </div>
              <p className="text-xl font-semibold text-gray-500">Your bag is empty</p>
              <Button variant="outline" className="mt-6" onClick={() => { onClose(); navigate('/shop'); }}>
                Start Shopping
              </Button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-24 h-24 bg-offwhite rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={item.featuredImage} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h4>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-secondary font-bold uppercase mt-1">{item.brand}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 border rounded-full px-2 py-1">
                      <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-primary transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-bold text-primary">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-2xl font-bold text-primary">{formatCurrency(subtotal)}</span>
            </div>
            <Button 
              fullWidth 
              size="lg" 
              onClick={() => { onClose(); navigate('/checkout'); }}
            >
              Checkout Now
            </Button>
            <p className="text-center text-xs text-gray-400 mt-4">
              Free shipping on all premium orders
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
