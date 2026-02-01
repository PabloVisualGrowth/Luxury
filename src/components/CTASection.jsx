import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-[#0F3D3E] relative overflow-hidden">
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-64 h-64 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#E8C4BC] transform rotate-45" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#E8C4BC] mb-6"
        >
          Do You Want to Start the Journey?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <p className="text-white font-medium text-xl mb-4">
            Sustainability is not the end of luxury. It is what allows luxury to 
            thrive, to matter and to lead beyond excellence.
          </p>
          <p className="text-white/70">
            Let's start the journey of leading beyond excellence, by empowering 
            your teams with the knowledge and learning experiences that turn 
            commitments into action.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to={createPageUrl("Contact")}>
            <Button
              size="lg"
              className="bg-[#C4714A] hover:bg-[#b36540] text-white px-8 py-6 text-base font-medium group"
            >
              <Mail className="mr-2 w-5 h-5" />
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to={createPageUrl("Programs")}>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#E8C4BC] text-[#E8C4BC] hover:bg-[#E8C4BC]/10 px-8 py-6 text-base font-medium"
            >
              Explore Programs
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
