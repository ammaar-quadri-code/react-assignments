import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, Star, ExternalLink, Loader2 } from 'lucide-react';
import Footer from '../components/Footer';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter, Search, Pagination States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // useEffect: Fetch products
  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/products?limit=100')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        const uniqueCategories = ['all', ...new Set(data.products.map((p) => p.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  // Filter & Search Logic
  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination Logic (10 per page)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-6 py-10 w-full space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neonCyan via-neonPurple to-neonPink">
            Product Explorer API
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Tajamul Ali Sir Assignment: Fetch all products, show 10 items per page, search, filter button, next/previous buttons, and single-product dynamic routing.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#0d0e24] p-4 rounded-2xl border border-neonCyan/30 shadow-cyanGlow">
          {/* Search */}
          <div className="flex items-center gap-2 bg-[#17193b] px-3 py-2 rounded-xl border border-gray-700 md:col-span-2">
            <Search size={18} className="text-neonCyan" />
            <input
              type="text"
              placeholder="Search product by title..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // reset to page 1 on filter
              }}
              className="bg-transparent w-full text-white placeholder-gray-500 text-sm focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#17193b] border border-neonGreen/40 text-neonGreen px-4 py-2 rounded-xl text-sm font-semibold focus:outline-none capitalize"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-neonCyan">
            <Loader2 size={40} className="animate-spin mb-2" />
            <p className="font-mono text-sm">Fetching products via useEffect()...</p>
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-mono">
            No products match your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {currentProducts.map((p) => (
              <div
                key={p.id}
                className="bg-[#0f1128] border border-gray-800 rounded-xl overflow-hidden hover:border-neonCyan transition-all duration-300 hover:shadow-cyanGlow flex flex-col justify-between"
              >
                <div className="h-44 bg-[#141634] relative overflow-hidden group">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[11px] font-mono text-neonGreen border border-neonGreen/30">
                    ${p.price}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neonPurple">
                      {p.category}
                    </span>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{p.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1">{p.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-800/80">
                    <span className="flex items-center gap-1 text-xs text-yellow-400 font-mono">
                      <Star size={13} fill="currentColor" /> {p.rating}
                    </span>

                    {/* Dynamic Link to Single Product */}
                    <Link
                      to={`/product/${p.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-neonCyan hover:text-neonPink transition-colors"
                    >
                      Details <ExternalLink size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-800">
          <p className="text-xs font-mono text-gray-400">
            Showing <span className="text-neonCyan">{filteredProducts.length > 0 ? startIndex + 1 : 0}</span> to{' '}
            <span className="text-neonCyan">{Math.min(startIndex + itemsPerPage, filteredProducts.length)}</span> of{' '}
            <span className="text-neonCyan">{filteredProducts.length}</span> items
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold border ${
                currentPage === 1
                  ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                  : 'border-neonCyan text-neonCyan hover:bg-neonCyan hover:text-black shadow-cyanGlow'
              } transition-all`}
            >
              <ChevronLeft size={16} /> Previous
            </button>

            <span className="text-xs font-mono text-neonGreen px-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold border ${
                currentPage === totalPages
                  ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                  : 'border-neonPink text-neonPink hover:bg-neonPink hover:text-black shadow-pinkGlow'
              } transition-all`}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}