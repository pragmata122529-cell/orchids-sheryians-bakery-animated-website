"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Plus, Star, Eye } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useCart } from "@/lib/store";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

const ProductCard3D = ({ product, index, onAddToCart }: { product: Product; index: number; onAddToCart: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useMotionValue(0), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useMotionValue(0), { damping: 20, stiffness: 200 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    rotateY.set((e.clientX - centerX) / 10);
    rotateX.set(-(e.clientY - centerY) / 10);
  };
  
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className="group bg-card rounded-3xl overflow-hidden border border-primary/10 hover:border-primary/40 transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-72 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute top-4 right-4 flex flex-col gap-2"
        >
          <motion.button 
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 bg-card/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg border border-primary/20"
          >
            <Heart size={18} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 bg-card/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg border border-primary/20"
          >
            <Eye size={18} />
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-4 left-4"
        >
          <span className="px-4 py-2 bg-gradient-to-r from-primary to-caramel rounded-full text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-lg">
            {product.category}
          </span>
        </motion.div>
      </div>
      
      <div className="p-6 space-y-4" style={{ transform: "translateZ(20px)" }}>
        <div className="flex justify-between items-start gap-3">
          <div className="space-y-1">
            <h3 className="text-xl font-[family-name:var(--font-cormorant)] font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          </div>
          <motion.p 
            className="text-2xl font-bold gradient-text whitespace-nowrap"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ${product.price}
          </motion.p>
        </div>
        
        <div className="flex items-center gap-1 py-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <Star size={14} className="fill-primary text-primary" />
            </motion.div>
          ))}
          <span className="text-xs text-muted-foreground ml-2">(4.9)</span>
        </div>
        
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          className="h-px bg-gradient-to-r from-primary/50 to-caramel/50 origin-left"
          transition={{ duration: 0.3 }}
        />
        
        <div className="pt-2 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddToCart}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-caramel rounded-full text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
          >
            <Plus size={18} />
            Add to Cart
          </motion.button>
          <motion.div 
            className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center"
            whileHover={{ rotate: 15, scale: 1.1 }}
          >
            <ShoppingCart size={20} className="text-primary" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { addItem } = useCart();

  const categories = ["All", "Cakes", "Cupcakes", "Donuts", "Muffins", "Pastries", "Cookies"];

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const addToCart = (product: Product) => {
    addItem(product);
    toast.success(`${product.name} added to cart!`, {
      icon: <span className="text-lg">🛒</span>
    });
  };

  return (
    <div ref={ref} className="space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {categories.map((category, i) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-7 py-3 rounded-full text-sm font-semibold transition-all duration-500 overflow-hidden ${
              activeCategory === category
                ? "text-primary-foreground shadow-lg shadow-primary/30"
                : "bg-card text-muted-foreground hover:text-foreground border border-primary/10 hover:border-primary/30"
            }`}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-gradient-to-r from-primary to-caramel"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </motion.button>
        ))}
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div 
              key={i} 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Skeleton className="h-72 w-full rounded-3xl bg-card" />
              <Skeleton className="h-4 w-2/3 bg-card" />
              <Skeleton className="h-4 w-1/2 bg-card" />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <ProductCard3D 
                key={product.id} 
                product={product} 
                index={i}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {filteredProducts.length === 0 && !loading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            🍰
          </motion.div>
          <p className="text-muted-foreground text-lg">No treats found in this category yet.</p>
          <p className="text-primary text-sm mt-2">Check back soon for delicious additions!</p>
        </motion.div>
      )}
    </div>
  );
}
