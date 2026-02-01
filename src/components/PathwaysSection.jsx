import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const pathways = [
  {
    number: "01",
    title: "Sustainable Luxury: The Essence",
    description: "Discover why sustainability is not an add-on, but the very foundation of tomorrow's luxury. Learning to see challenges as opportunities and commitments as competitive edge.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "essence"
  },
  {
    number: "02",
    title: "Luxury & Responsibility: Industry Challenges",
    description: "From raw materials to transparency, from traceability to credibility, understand what's at stake, what's changing, and how to lead authentically.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "challenges"
  },
  {
    number: "03",
    title: "Customer Experience: The Luxury of Positive Impact",
    description: "Transform every client interaction into a memorable story of excellence with purpose. Equip teams to connect with clients emotionally through the brand's commitments.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    category: "experience"
  }
];

export default function PathwaysSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#C4714A] text-sm font-medium tracking-wider uppercase"
            >
              Our Pathways
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-[#5C3D2E] mt-4"
            >
              Learning Journeys
            </motion.h2>
          </div>
          <Link to={createPageUrl("Programs")}>
            <Button
              variant="outline"
              className="border-[#C4714A] text-[#C4714A] hover:bg-[#C4714A] hover:text-white"
            >
              View All Programs
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Pathways Grid */}
        <div className="space-y-8">
          {pathways.map((pathway, index) => (
            <motion.div
              key={pathway.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Link 
                to={`${createPageUrl("Programs")}?category=${pathway.category}`}
                className="group block"
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center bg-[#FDFBF9] rounded-3xl overflow-hidden border border-[#E8C4BC]/30 hover:border-[#C4714A]/50 transition-all duration-500 hover:shadow-xl">
                  {/* Image */}
                  <div className={`relative h-64 lg:h-80 overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img
                      src={pathway.image}
                      alt={pathway.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D3E]/60 to-transparent" />
                    <span className="absolute bottom-6 left-6 text-6xl font-bold text-white/30">
                      {pathway.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#5C3D2E] mb-4 group-hover:text-[#C4714A] transition-colors">
                      {pathway.title}
                    </h3>
                    <p className="text-[#5C3D2E]/70 leading-relaxed mb-6">
                      {pathway.description}
                    </p>
                    <span className="inline-flex items-center text-[#C4714A] font-medium group-hover:gap-3 transition-all">
                      Explore Pathway
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
