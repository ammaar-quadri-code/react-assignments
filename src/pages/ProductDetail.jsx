import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShieldCheck, Truck, ShoppingCart, Loader2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import Footer from '../components/Footer';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-neonCyan">
        <Loader2 size={40} className="animate-spin mb-2" />
        <p className="font-mono text-sm">Loading dynamic product #{id}...</p>
      </div>
    );
  }

  if (!product || product.message) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-xl text-neonPink mb-4">Product Not Found!</p>
        <Link to="/products" className="text-neonCyan underline">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="max-w-5xl mx-auto px-6 py-10 w-full space-y-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-1 text-sm font-mono text-neonCyan hover:underline"
        >
          <ArrowLeft size={16} /> Back to Products List
        </Link>

        <div className="bg-[#0f1128] border border-neonCyan/40 rounded-3xl p-6 md:p-8 shadow-cyanGlow grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="bg-[#151736] rounded-2xl p-4 flex items-center justify-center border border-gray-800">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-80 object-contain drop-shadow-[0_0_15px_rgba(0,243,255,0.3)]"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs uppercase font-mono tracking-wider text-neonPurple">
                {product.category} / {product.brand || 'Generic'}
              </span>
              <h1 className="text-3xl font-extrabold text-white">{product.title}</h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-black text-neonGreen font-mono">
                ${product.price}
              </span>
              <span className="flex items-center gap-1 text-yellow-400 font-mono text-sm">
                <Star size={16} fill="currentColor" /> {product.rating} / 5.0
              </span>
              <span className="text-xs font-mono text-gray-400 bg-[#171a3c] px-2.5 py-1 rounded-full border border-gray-700">
                Stock: {product.stock}
              </span>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">{product.description}</p>

            <div className="space-y-2 py-3 border-y border-gray-800 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-neonCyan" /> 2-Year Cyber Warranty & Replacement
              </div>
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-neonGreen" /> Fast Delivery to All Grid Sectors
              </div>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-neonCyan to-neonPink text-black font-extrabold text-sm hover:opacity-90 transition-all shadow-pinkGlow"
            >
              <ShoppingCart size={18} /> Add To Zustand Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}