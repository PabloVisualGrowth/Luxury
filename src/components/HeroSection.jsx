import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0F3D3E]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-[#0F3D3E]/85" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#C4714A] transform rotate-45" />
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 overflow-hidden">
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#E8C4BC]/20 transform rotate-45" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Tagline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#deb8bc] mb-8 text-center">
            Leading Beyond Excellence
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl mx-auto text-white/80 text-lg md:text-xl leading-relaxed mb-12 text-center"
          >
            We transform sustainability into a force that elevates luxury, 
            making it tangible, human, and inspiring for teams across the industry.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to={createPageUrl("Programs")}>
              <Button
                size="lg"
                className="bg-[#c45d32] hover:bg-[#b35028] text-white px-8 py-6 text-base font-medium group"
              >
                Explore Programs
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={createPageUrl("About")}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#deb8bc] text-[#deb8bc] hover:bg-[#deb8bc]/10 px-8 py-6 text-base font-medium"
              >
                Our Story
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-[#E8C4BC]/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#E8C4BC] rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
