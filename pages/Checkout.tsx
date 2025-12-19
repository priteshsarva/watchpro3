
import React, { useState } from 'react';
import { useShop, formatCurrency } from '../context/ShopContext';
import { Button } from '../components/UI/Button';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { ChevronLeft, CreditCard, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, clearCart } = useShop();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: ''
  });
  const [error, setError] = useState<string | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal; // Simplified

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    const link = generateWhatsAppLink(cart, formData);
    window.open(link, '_blank');
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold uppercase tracking-tighter">Your bag is empty</h2>
        <Link to="/shop"><Button size="lg">Go Shopping</Button></Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-offwhite py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link to="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 font-medium">
          <ChevronLeft size={20} /> Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-4xl p-8 md:p-12 shadow-sm space-y-10">
              <h2 className="text-3xl font-bold flex items-center gap-3 uppercase">
                Order Details
              </h2>
              
              {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-2xl flex items-center gap-2 font-bold text-sm">
                  <AlertCircle size={18} /> {error}
                </div>
              )}

              <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                  <input required type="text" placeholder="Your Name" className="w-full bg-offwhite rounded-2xl px-6 py-4 border-2 border-transparent focus:border-primary outline-none transition-all" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                  <input required type="tel" placeholder="+91 XXXX XXXX" className="w-full bg-offwhite rounded-2xl px-6 py-4 border-2 border-transparent focus:border-primary outline-none transition-all" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Shipping Address</label>
                  <textarea required rows={3} placeholder="House no, Street, City..." className="w-full bg-offwhite rounded-2xl px-6 py-4 border-2 border-transparent focus:border-primary outline-none transition-all resize-none" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
              </form>
            </div>

            <div className="bg-white rounded-4xl p-8 md:p-12 shadow-sm">
              <h2 className="text-3xl font-bold flex items-center gap-3 mb-10 uppercase">Payment</h2>
              <div className="p-6 bg-accent/5 rounded-3xl border-2 border-accent/20 flex items-center gap-4">
                <CreditCard className="text-primary" />
                <p className="text-sm font-bold text-gray-500">Order confirmation will be sent via WhatsApp immediately.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-4xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-8 uppercase tracking-tighter">Summary</h3>
              <div className="space-y-6 mb-8 max-h-80 overflow-y-auto no-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.featuredImage} className="w-16 h-16 bg-offwhite rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate">{item.name}</h4>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-primary">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t flex justify-between items-center">
                <span className="text-gray-500 font-bold uppercase text-xs">Final Total</span>
                <span className="text-2xl font-black text-primary">{formatCurrency(total)}</span>
              </div>
              <Button form="checkout-form" type="submit" fullWidth size="lg" className="mt-8 bg-black text-white hover:bg-gray-800">
                Confirm via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
