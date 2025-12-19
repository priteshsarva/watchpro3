
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop, formatCurrency } from '../context/ShopContext';
import { Button } from '../components/UI/Button';
import { ProductCard } from '../components/ProductCard';
import { generateQuickBuyLink } from '../utils/whatsapp';
import { Truck, Clock, RefreshCw, Star, ChevronRight, ChevronLeft, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const { products, addToCart } = useShop();
  const [selectedImage, setSelectedImage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const product = products.find(p => p.id.toString() === id);

  useEffect(() => {
    if (product) setSelectedImage(product.imageUrl[0]);
    window.scrollTo(0, 0);
  }, [product, id]);

  const recommendations = products
    .filter(p => p.id !== (product?.id || -1))
    .slice(0, 10);

  // Continuous auto-scroll for Recommendations
  useEffect(() => {
    if (!scrollRef.current || recommendations.length === 0) return;

    const scrollContainer = scrollRef.current;
    const totalWidth = scrollContainer.scrollWidth - scrollContainer.offsetWidth;

    tweenRef.current = gsap.to(scrollContainer, {
      scrollLeft: totalWidth,
      duration: 25,
      ease: "none",
      repeat: -1,
      yoyo: true,
      pause: true
    });

    tweenRef.current.play();

    return () => {
      tweenRef.current?.kill();
    };
  }, [recommendations.length]);

  const handleMouseEnter = () => tweenRef.current?.pause();
  const handleMouseLeave = () => tweenRef.current?.play();

  if (!product) return <div className="min-h-screen flex items-center justify-center">Loading timepiece...</div>;

  const reviews = [
    { name: "Alex Mathio", text: "WATCH PRO's dedication to excellence resonates strongly. The craftsmanship on this model is absolute perfection.", rating: 5, date: "13 Oct 2024", avatar: "1" },
    { name: "Sarah J.", text: "A truly timeless piece. I get compliments every single day. The weight of the dial feels premium.", rating: 5, date: "05 Nov 2024", avatar: "2" },
    { name: "Michael Reed", text: "The delivery was surprisingly fast, and the packaging itself is a work of art. 10/10.", rating: 4, date: "20 Nov 2024", avatar: "3" }
  ];

  const handleQuickBuy = () => {
    window.open(generateQuickBuyLink(product), '_blank');
  };

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="container mx-auto">
        <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-300 mb-12">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-primary transition-colors">Details</Link>
          <ChevronRight size={12} />
          <span className="text-primary">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          {/* Gallery - Removed all black borders from thumbnails */}
          <div className="space-y-8">
            <div className="aspect-[4/5] bg-gray-50 rounded-[2rem] md:rounded-[4rem] overflow-hidden group relative border border-gray-100/50 shadow-sm">
              <img src={selectedImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 no-scrollbar">
              {product.imageUrl.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl md:rounded-[2rem] overflow-hidden transition-all flex-shrink-0 border-none outline-none ${selectedImage === img ? 'opacity-100 scale-105 shadow-sm' : 'opacity-30 hover:opacity-70'}`}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-4">
               <span className="px-5 py-2 bg-gray-100 text-[10px] font-black uppercase tracking-[0.3em] rounded-full text-gray-500">{product.brand}</span>
               <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-primary">{product.name}</h1>
               <div className="flex items-center gap-6 pt-2">
                 <span className="text-3xl md:text-4xl font-black text-primary">{formatCurrency(product.price)}</span>
               </div>
               <div className="flex items-center gap-2 p-3 bg-accent/5 rounded-2xl inline-flex">
                 <Clock size={16} className="text-accent" />
                 <span className="text-xs font-bold text-accent">Exclusive timepiece for New Arrivals</span>
               </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                   <Button size="lg" className="flex-1 h-20 rounded-full text-sm font-black uppercase tracking-widest bg-black shadow-none hover:shadow-md" onClick={() => addToCart(product, 1)}>Add to Bag</Button>
                   <Button 
                      size="lg" 
                      variant="outline"
                      className="flex-1 h-20 rounded-full text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 border-primary/20 bg-gray-50 text-primary hover:bg-gray-100 shadow-none hover:shadow-sm" 
                      onClick={handleQuickBuy}
                   >
                     <MessageCircle size={20} className="text-green-500 fill-green-500/20" /> Quick Buy
                   </Button>
                </div>
              </div>
            </div>

            <div className="space-y-8 pt-12 border-t">
               <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-widest">Specifications</h4>
                  <p className="text-gray-500 font-medium leading-relaxed">{product.description}</p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-gray-50 rounded-[2rem] flex items-center gap-4 border border-gray-100/30">
                    <Truck size={20} className="text-gray-400" />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase">Delivery</p>
                      <p className="text-xs font-bold">Pan India</p>
                    </div>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-[2rem] flex items-center gap-4 border border-gray-100/30">
                    <RefreshCw size={20} className="text-gray-400" />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase">Guarantee</p>
                      <p className="text-xs font-bold">1 Year Official</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mb-32">
           <h3 className="text-3xl font-black uppercase tracking-tight mb-12 text-primary">Verified Reviews</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((rev, i) => (
                 <div key={i} className="p-8 bg-gray-50 rounded-[2.5rem] space-y-4 border border-gray-100/30 shadow-none">
                    <div className="flex justify-between items-start">
                       <div className="flex items-center gap-3">
                          <img src={`https://i.pravatar.cc/150?u=${rev.avatar}`} className="w-10 h-10 rounded-full object-cover grayscale" />
                          <div>
                             <h4 className="font-bold text-sm text-primary">{rev.name}</h4>
                             <div className="flex text-highlight">
                                {[...Array(rev.rating)].map((_, j) => <Star key={j} size={10} fill="currentColor" />)}
                             </div>
                          </div>
                       </div>
                       <span className="text-[10px] font-black text-gray-300 uppercase">{rev.date}</span>
                    </div>
                    <p className="text-gray-500 text-sm italic font-medium leading-relaxed">"{rev.text}"</p>
                 </div>
              ))}
           </div>
        </section>

        {/* Smooth Recommendations Carousel */}
        <section className="relative overflow-hidden mb-20">
          <div className="flex items-center justify-between mb-16 px-2">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight italic text-primary">Recommended For You</h2>
            <div className="flex gap-4">
               <button onClick={() => {
                 if (scrollRef.current) scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
               }} className="p-4 bg-gray-50 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm"><ChevronLeft size={20}/></button>
               <button onClick={() => {
                 if (scrollRef.current) scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
               }} className="p-4 bg-gray-50 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm"><ChevronRight size={20}/></button>
            </div>
          </div>
          
          <div 
            ref={scrollRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="flex gap-6 overflow-x-auto pb-12 scroll-smooth no-scrollbar"
          >
            {recommendations.map(p => (
              <div key={p.id} className="w-[calc(60%-12px)] md:w-[calc(33.33%-18px)] lg:w-[calc(25%-18px)] flex-shrink-0">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
