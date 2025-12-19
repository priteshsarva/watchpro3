
import React, { useState, useEffect } from 'react';
import { useShop, formatCurrency } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { sidebarDataBrand, CATEGORY_RULES } from '../data/mockData';
import { Search, Filter, ChevronDown, LayoutGrid, LayoutList, X, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Shop: React.FC = () => {
  const { 
    filteredProducts, filterState, setFilterState, resetFilters, loading, 
    sortBy, setSortBy, isInfiniteScroll, setIsInfiniteScroll 
  } = useShop();
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [bannerProduct, setBannerProduct] = useState<any>(null);

  const categories = Object.keys(CATEGORY_RULES);

  useEffect(() => {
    resetFilters();
  }, []);

  useEffect(() => {
    if (filteredProducts.length > 0 && !bannerProduct) {
      const randomProduct = filteredProducts[Math.floor(Math.random() * filteredProducts.length)];
      setBannerProduct(randomProduct);
    }
  }, [loading, filteredProducts]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 6);
      setIsLoadingMore(false);
    }, 1000);
  };

  useEffect(() => {
    if (!isInfiniteScroll) return;
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500 && !isLoadingMore && visibleCount < filteredProducts.length) {
        handleLoadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInfiniteScroll, isLoadingMore, visibleCount, filteredProducts.length]);

  const toggleCategory = (cat: string) => {
    setFilterState(prev => ({
      ...prev,
      categories: prev.categories.includes(cat) 
        ? prev.categories.filter(c => c !== cat) 
        : [...prev.categories, cat]
    }));
  };

  const toggleBrand = (brand: string) => {
    setFilterState(prev => ({
      ...prev,
      brands: prev.brands.includes(brand) 
        ? prev.brands.filter(b => b !== brand) 
        : [...prev.brands, brand]
    }));
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-offwhite">
      <div className="w-16 h-1 bg-gray-200 overflow-hidden rounded-full">
        <div className="h-full bg-primary w-1/3 animate-pulse" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="container mx-auto">
        {bannerProduct && (
          <div className="relative flex flex-col md:flex-row bg-gray-100 rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-16 group min-h-[400px] md:h-80">
             <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 to-transparent hidden md:block" />
             
             {/* Text Content */}
             <div className="relative z-10 flex-1 p-8 md:p-12 flex flex-col justify-center space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">- Collection Highlight</span>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">Meet the <br className="hidden md:block" /> <span className="text-accent">{bannerProduct.name}</span></h2>
                <p className="text-sm font-medium text-gray-500 max-w-sm">Discover hand-crafted elegance starting at {formatCurrency(bannerProduct.price)}</p>
                <Link to={`/product/${bannerProduct.id}`} className="md:hidden inline-block bg-primary text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full w-fit">
                   View Product
                </Link>
             </div>

             {/* Banner Image */}
             <Link to={`/product/${bannerProduct.id}`} className="relative h-64 md:h-full w-full md:w-1/2 block group-hover:opacity-100 transition-all duration-700">
                <img src={bannerProduct.featuredImage} className="w-full h-full object-cover grayscale md:group-hover:grayscale-0 transition-all" alt="Featured Watch" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="hidden md:block bg-white text-primary px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl">View Masterpiece</span>
                </div>
             </Link>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-16">
          <aside className="hidden lg:block w-72 space-y-12">
            <div>
               <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Search</h3>
               <div className="relative">
                 <input 
                    type="text" 
                    placeholder="Search keywords..." 
                    className="w-full bg-gray-50 rounded-2xl px-5 py-4 text-sm font-medium border-2 border-transparent focus:border-primary outline-none transition-all"
                    value={filterState.search}
                    onChange={(e) => setFilterState(prev => ({ ...prev, search: e.target.value }))}
                 />
                 <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
               </div>
            </div>

            <div className="h-px bg-gray-100" />

            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Price Range</h3>
              <input 
                type="range" 
                min="0" 
                max="5000" 
                step="100"
                className="w-full accent-primary h-1 bg-gray-200 rounded-full appearance-none cursor-pointer"
                value={filterState.priceRange[1]}
                onChange={(e) => setFilterState(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }))}
              />
              <div className="flex justify-between mt-4 text-[11px] font-black text-gray-400 uppercase">
                <span>$0</span>
                <span>${filterState.priceRange[1]}</span>
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">Category</h3>
                <button onClick={() => setFilterState(prev => ({ ...prev, categories: [] }))} className="text-[10px] font-bold text-gray-400 uppercase hover:text-primary">Reset</button>
              </div>
              <div className="space-y-4">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${filterState.categories.includes(cat) ? 'bg-primary border-primary' : 'border-gray-200 group-hover:border-primary'}`}>
                        {filterState.categories.includes(cat) && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={filterState.categories.includes(cat)} onChange={() => toggleCategory(cat)} />
                      <span className={`text-sm font-bold ${filterState.categories.includes(cat) ? 'text-primary' : 'text-gray-400'} group-hover:text-primary transition-colors`}>{cat}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">Brands</h3>
                <button onClick={() => setFilterState(prev => ({ ...prev, brands: [] }))} className="text-[10px] font-bold text-gray-400 uppercase hover:text-primary">Reset</button>
              </div>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2 no-scrollbar">
                {sidebarDataBrand.map(b => (
                  <label key={b.id} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${filterState.brands.includes(b.title) ? 'bg-primary border-primary' : 'border-gray-200 group-hover:border-primary'}`}>
                        {filterState.brands.includes(b.title) && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={filterState.brands.includes(b.title)} onChange={() => toggleBrand(b.title)} />
                      <span className={`text-sm font-bold ${filterState.brands.includes(b.title) ? 'text-primary' : 'text-gray-400'} group-hover:text-primary transition-colors`}>{b.title}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100" />
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
               <div className="flex items-center gap-2">
                 <Settings size={14} className="text-gray-400" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Infinite Scroll</span>
               </div>
               <button 
                  onClick={() => setIsInfiniteScroll(!isInfiniteScroll)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${isInfiniteScroll ? 'bg-accent' : 'bg-gray-200'}`}
               >
                 <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isInfiniteScroll ? 'left-6' : 'left-1'}`} />
               </button>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tight">The Catalogue</h1>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Showing {Math.min(visibleCount, filteredProducts.length)} Results</p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center bg-gray-100 p-1 rounded-full">
                   <button onClick={() => setViewMode('grid')} className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-primary'}`}><LayoutGrid size={18} /></button>
                   <button onClick={() => setViewMode('list')} className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-primary'}`}><LayoutList size={18} /></button>
                </div>
                <div className="relative flex-1 sm:flex-none">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none bg-white border-2 border-gray-100 rounded-full px-8 py-3 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-primary pr-12 w-full">
                    <option value="newest">Sort By: Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <button className="lg:hidden p-4 bg-primary text-white rounded-full shadow-xl" onClick={() => setIsMobileFilterOpen(true)}><Filter size={20} /></button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-gray-50 rounded-[4rem] py-32 text-center">
                 <Search size={48} className="mx-auto text-gray-200 mb-6" />
                 <h2 className="text-2xl font-black uppercase">No results found</h2>
                 <p className="text-sm font-medium text-gray-400 mt-2">Try searching for brands or categories (min 3 characters).</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? "grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12" : "flex flex-col gap-8"}>
                {filteredProducts.slice(0, visibleCount).map(p => (
                  <ProductCard key={p.id} product={p} viewMode={viewMode} />
                ))}
              </div>
            )}

            {!isInfiniteScroll && visibleCount < filteredProducts.length && (
              <div className="mt-16 text-center">
                <button disabled={isLoadingMore} onClick={handleLoadMore} className="px-12 py-5 bg-gray-100 text-primary rounded-full font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all disabled:opacity-50 flex items-center gap-3 mx-auto">
                  {isLoadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white p-8">
           <div className="flex justify-between items-center mb-12">
             <h2 className="text-3xl font-black uppercase">Filters</h2>
             <button onClick={() => setIsMobileFilterOpen(false)} className="p-4 bg-gray-100 rounded-full"><X size={24} /></button>
           </div>
           <div className="flex-1 overflow-y-auto space-y-12 no-scrollbar pb-12">
             <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Keywords</h3>
                <input type="text" className="w-full bg-gray-100 rounded-2xl p-4 text-sm font-bold outline-none" value={filterState.search} onChange={(e) => setFilterState(prev => ({ ...prev, search: e.target.value }))} />
             </div>
           </div>
           <button className="w-full py-6 bg-primary text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm" onClick={() => setIsMobileFilterOpen(false)}>Show Results</button>
        </div>
      )}
    </div>
  );
};

export default Shop;
