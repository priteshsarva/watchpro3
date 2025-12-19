
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">W</div>
              <span className="text-xl font-bold text-primary">WATCH PRO</span>
            </Link>
            <p className="text-gray-500 leading-relaxed max-w-sm">
              Curating the finest timepieces for the next generation of horologists. Quality, elegance, and legacy in every tick.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-primary hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-primary hover:text-white transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-primary hover:text-white transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-gray-500 hover:text-primary transition-colors font-medium">New Arrivals</Link></li>
              <li><Link to="/shop" className="text-gray-500 hover:text-primary transition-colors font-medium">Best Sellers</Link></li>
              <li><Link to="/warranty" className="text-gray-500 hover:text-primary transition-colors font-medium">Warranty Info</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/terms" className="text-gray-500 hover:text-primary transition-colors font-medium">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-500 hover:text-primary transition-colors font-medium">Privacy Policy</Link></li>
              <li><a href="mailto:support@watchpro.com" className="text-gray-500 hover:text-primary transition-colors font-medium">Contact Concierge</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">© 2024 WATCH PRO Store. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-gray-400 hover:text-gray-600 text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-gray-600 text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
