"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Clock, Leaf, Award, Heart } from "lucide-react";

const features = [
  { icon: Clock, title: "Fresh Daily", desc: "Baked every morning at 5 AM" },
  { icon: Leaf, title: "100% Natural", desc: "No artificial preservatives" },
  { icon: Award, title: "Award Winning", desc: "Best bakery 2023 & 2024" },
  { icon: Heart, title: "Made with Love", desc: "Family recipes since 1980" },
];

export function AboutSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section id="about" ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 -right-40 w-96 h-96 rounded-full bg-caramel/5 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div 
              style={{ rotate }}
              className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0"
            >
              <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 rounded-[3rem] overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1556217477-d325251ece38?q=80&w=800&auto=format&fit=crop"
                  alt="Baker at work"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -bottom-8 -right-8 bg-card/95 backdrop-blur-xl p-6 rounded-2xl border border-primary/20 shadow-2xl"
              >
                <div className="text-center space-y-1">
                  <motion.p 
                    className="text-5xl font-bold gradient-text font-[family-name:var(--font-cormorant)]"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    44+
                  </motion.p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Years of Tradition</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-primary to-caramel rounded-full flex items-center justify-center shadow-2xl"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="text-4xl"
                >
                  🥧
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm uppercase tracking-widest text-primary font-semibold"
              >
                Our Story
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-cormorant)] font-bold leading-tight"
              >
                Baking <span className="gradient-text italic">Happiness</span> Since 1980
              </motion.h2>
              
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="h-1 w-24 bg-gradient-to-r from-primary to-caramel origin-left"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              What started as a small family kitchen has grown into a beloved bakery, 
              but our heart remains the same. Every morning at 5 AM, we begin our ritual 
              of creating handcrafted treats using recipes passed down through three generations.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              We believe that the best ingredients, combined with passion and patience, 
              create moments of pure joy. No shortcuts, no compromises—just honest, 
              delicious baking that brings people together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 gap-4 pt-4"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-5 bg-card/50 backdrop-blur-sm rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-caramel/20 flex items-center justify-center mb-3"
                  >
                    <feature.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
