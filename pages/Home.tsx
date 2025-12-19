
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useShop, formatCurrency } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORY_RULES } from '../data/mockData';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const { products, loading } = useShop();
  const mainRef = useRef<HTMLDivElement>(null);

  const latestProduct = products.length > 0 
    ? [...products].sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())[0]
    : null;

  useEffect(() => {
    if (!mainRef.current || loading) return;

    const ctx = gsap.context((self) => {
      const revealElements = self.selector?.(".reveal-text");
      const heroVisual = self.selector?.(".hero-visual");
      const brandTicker = self.selector?.(".brand-ticker");

      if (revealElements && revealElements.length > 0) {
        gsap.from(revealElements, {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "expo.out"
        });
      }

      if (heroVisual && heroVisual.length > 0) {
        gsap.from(heroVisual, {
          scale: 0.9,
          opacity: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "power2.out"
        });
      }

      if (brandTicker && brandTicker.length > 0) {
        gsap.to(brandTicker, {
          xPercent: -50,
          repeat: -1,
          duration: 15,
          ease: "none"
        });
      }
    }, mainRef);

    return () => ctx.revert();
  }, [loading]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-offwhite">
      <div className="w-16 h-1 bg-gray-200 overflow-hidden rounded-full">
        <div className="h-full bg-primary w-1/3 animate-pulse" />
      </div>
    </div>
  );

  const categoryImages = [
    "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000", // Luxury
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000", // Casual
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000", // Sport (Updated: Clearer tech/sport watch aesthetic)
    "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000"  // Ladies
  ];

  return (
    <div ref={mainRef} className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-32 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 z-10 space-y-8">
              <div className="flex items-center gap-4 reveal-text">
                <div className="h-px w-12 bg-primary" />
                <span className="text-xs font-black tracking-[0.4em] uppercase text-primary/60">Delivering Excellence Since 2024</span>
              </div>
              <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.85] uppercase reveal-text">
                Watch <br />
                <span className="flex items-center gap-4">
                  Pro <span className="text-outline italic">3.0</span>
                </span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-6 items-start reveal-text">
                <Link to="/shop">
                  <button className="px-10 py-5 bg-primary text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-black transition-all flex items-center gap-3 group">
                    Explore Catalogue <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <div className="max-w-xs text-sm font-medium text-gray-500 leading-relaxed">
                   Bring your analogue embrace the premium Watch Pro series. Every timepiece is a testament to precision and legacy.
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 relative hero-visual">
               <div className="absolute -top-20 -right-20 w-[140%] h-[140%] bg-accent/10 rounded-full blur-[120px] -z-10" />
               <div className="relative group">
                 <div className="absolute inset-0 bg-primary/5 rounded-[5rem] translate-x-4 translate-y-4 -z-10" />
                 <img 
                    src={latestProduct?.featuredImage || categoryImages[0]} 
                    className="w-full h-auto object-cover rounded-[5rem] shadow-2xl animate-float"
                    alt="Latest Watch"
                 />
                 {latestProduct && (
                   <div className="absolute -bottom-10 -right-10 glass p-8 rounded-4xl shadow-lg max-w-[240px] animate-bounce-slow border border-white/40">
                      <p className="text-[10px] font-black uppercase text-accent tracking-widest mb-1">New Arrival</p>
                      <p className="text-lg font-bold leading-tight line-clamp-1">{latestProduct.name}</p>
                      <div className="mt-4 flex justify-between items-center">
                         <span className="font-black text-xl">{formatCurrency(latestProduct.price)}</span>
                         <Link to={`/product/${latestProduct.id}`} className="p-2 bg-primary text-white rounded-full hover:bg-accent transition-colors shadow-sm"><ArrowUpRight size={16} /></Link>
                      </div>
                   </div>
                 )}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Ticker */}
      <section className="py-20 border-y border-gray-100 overflow-hidden bg-gray-50/50">
        <div className="brand-ticker flex whitespace-nowrap items-center gap-24 px-12">
          {['Rolex', 'Omega', 'Casio', 'Dior', 'Casio', 'AP', 'Converse', 'Nike', 'LV', 'Piguet'].map((brand, i) => (
            <div key={i} className="flex items-center gap-12 text-5xl font-black text-gray-200 uppercase tracking-tighter italic select-none">
              <span className="hover:text-primary transition-colors cursor-default">{brand}</span>
              <div className="w-4 h-4 rounded-full bg-accent/30" />
            </div>
          ))}
          {['Rolex', 'Omega', 'Casio', 'Dior', 'Casio', 'AP', 'Converse', 'Nike', 'LV', 'Piguet'].map((brand, i) => (
            <div key={i + 10} className="flex items-center gap-12 text-5xl font-black text-gray-200 uppercase tracking-tighter italic select-none">
              <span className="hover:text-primary transition-colors cursor-default">{brand}</span>
              <div className="w-4 h-4 rounded-full bg-accent/30" />
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid - 2 columns on mobile */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Browse by Category</h2>
            <p className="text-gray-400 font-medium">Find the perfect match for your lifestyle.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {Object.keys(CATEGORY_RULES).map((cat, idx) => (
              <Link to="/shop" key={idx} className="group relative h-64 md:h-96 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-500">
                <img src={categoryImages[idx % categoryImages.length]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={cat} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                  <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter">{cat}</h3>
                  <p className="text-white/60 text-[10px] md:text-sm font-medium mt-1 uppercase tracking-widest">Explore</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section className="py-32 px-6 bg-offwhite">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-20">
            <span className="text-xs font-black tracking-[0.4em] uppercase text-accent">Only the best timepieces</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Our Collection</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {products.slice(0, 6).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-20 text-center">
             <Link to="/shop">
               <button className="inline-flex items-center gap-4 text-lg font-bold hover:text-accent transition-colors group">
                 Show All Products <ArrowRight className="group-hover:translate-x-2 transition-transform" />
               </button>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
