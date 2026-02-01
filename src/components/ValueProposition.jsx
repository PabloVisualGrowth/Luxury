import React from "react";
import { motion } from "framer-motion";
import { Target, Sparkles, Award } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Tailor-made",
    description: "We start with your reality, your CSR strategy and your brand DNA.",
    color: "bg-brand-pine"
  },
  {
    icon: Sparkles,
    title: "Engaging",
    description: "Interactive, creative formats that inspire action, not just awareness.",
    color: "bg-brand-brick"
  },
  {
    icon: Award,
    title: "Expert",
    description: "A unique blend of CSR knowledge and luxury sector expertise.",
    color: "bg-brand-brown"
  }
];

export default function ValueProposition() {
  return (
    <section className="py-24 lg:py-32 bg-[#FDFBF9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-brick text-sm font-medium tracking-wider uppercase"
          >
            Our Way of Doing Things
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-brand-brown mt-4 mb-6"
          >
            Built on Three Pillars
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-brown/70 text-lg leading-relaxed"
          >
            We partner with brands, organisations, and professionals across the luxury
            sector to transform sustainability into tangible value, credible actions,
            a trusted reputation, and a competitive advantage.
          </motion.p>
        </div>


        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-xl transition-all duration-500 border border-[#E8C4BC]/30">
                <div className={`${value.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#5C3D2E] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#5C3D2E]/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
