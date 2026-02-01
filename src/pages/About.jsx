import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Lightbulb, Users, Award } from "lucide-react";

export default function About() {
  const sectors = [
    "Retail", "Jewelry", "Hospitality", "Watchmaking", "Beauty", "Fashion"
  ];

  const roles = [
    { title: "CEOs", desc: "Shaping bold strategies" },
    { title: "Managers", desc: "Translating vision into action" },
    { title: "Employees", desc: "Embodying the brand every day" }
  ];

  return (
    <div className="bg-[#FDFBF9]">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-[#5C3D2E] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-[#E8C4BC] text-sm font-medium tracking-wider uppercase">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Sustainable Luxury is Not Just a Name
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              It is a statement. We believe the luxury of tomorrow will be defined 
              not only by rarity, craftsmanship and excellence, but also by purpose, 
              responsibility and the ability to create lasting, meaningful value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#C4714A] text-sm font-medium tracking-wider uppercase">
                Our Promise
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#5C3D2E] mt-4 mb-6">
                Leading Beyond Excellence
              </h2>
              <p className="text-[#5C3D2E]/70 text-lg leading-relaxed mb-6">
                To make sustainability the new standard of luxury, elevating its 
                relevance and influence to drive the industry forward. Sustainable 
                Luxury embodies this new era, and leads the way.
              </p>
              <p className="text-[#5C3D2E]/70 text-lg leading-relaxed mb-8">
                We turn sustainability into a force that elevates luxury, making it 
                tangible, human, and inspiring for teams, so that every action 
                becomes a step beyond excellence.
              </p>
              <Link to={createPageUrl("Programs")}>
                <Button className="bg-[#C4714A] hover:bg-[#b36540] text-white">
                  Explore Our Programs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80"
                alt="Sustainable luxury"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-[#0F3D3E] text-white p-8 rounded-2xl max-w-xs">
                <p className="text-lg font-medium leading-relaxed">
                  "Sustainability is not an add-on. It is the next frontier of 
                  value creation in luxury."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Empower */}
      <section className="py-24 lg:py-32 bg-[#F5EBE6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#C4714A] text-sm font-medium tracking-wider uppercase"
            >
              Who We Empower
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-[#5C3D2E] mt-4 mb-6"
            >
              Visionary Companies in Luxury
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#5C3D2E]/70 text-lg"
            >
              We work with brands that are not only committed to excellence, but also 
              determined to embrace responsibility, lead change, and make sustainability 
              their competitive edge.
            </motion.p>
          </div>

          {/* Roles */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm border border-[#E8C4BC]/30"
              >
                <h3 className="text-2xl font-bold text-[#5C3D2E] mb-2">{role.title}</h3>
                <p className="text-[#5C3D2E]/70">{role.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Sectors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-[#5C3D2E]/70 mb-6">
              Our expertise resonates particularly in luxury sectors where client experience is paramount:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {sectors.map((sector) => (
                <span
                  key={sector}
                  className="px-6 py-2 bg-white rounded-full text-[#5C3D2E] font-medium border border-[#E8C4BC]/30"
                >
                  {sector}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Catherine Section */}
      <section className="py-24 lg:py-32 bg-[#0F3D3E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c26566beb85c95843b9b/bee44ccdb_image.png"
                  alt="Catherine Sonolet"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#C4714A] rounded-2xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#E8C4BC] text-sm font-medium tracking-wider uppercase">
                Your Guide
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                Catherine Sonolet
              </h2>
              <p className="text-[#E8C4BC] text-lg font-medium mb-6">
                Training Consultant
              </p>
              <p className="text-white/80 leading-relaxed mb-6">
                With extensive experience in both CSR and the luxury sector, Catherine 
                brings a unique perspective to sustainability training. Her approach 
                combines deep industry knowledge with innovative, human-centered 
                teaching methods.
              </p>
              <p className="text-white/80 leading-relaxed mb-8">
                Through immersive learning experiences, she empowers employees to embrace 
                their organisation's commitments and foster a shared culture of responsible 
                luxury.
              </p>
              <a 
                href="mailto:catherine.sonolet@sustainable-luxury.info"
                className="inline-flex items-center text-[#E8C4BC] font-medium hover:gap-3 transition-all"
              >
                catherine.sonolet@sustainable-luxury.info
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#C4714A] text-sm font-medium tracking-wider uppercase"
            >
              Why Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-[#5C3D2E] mt-4 mb-6"
            >
              Meaningful Transformation
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Tailored Programs",
                desc: "Programs crafted around your business challenges and pace."
              },
              {
                icon: Lightbulb,
                title: "Innovative Methods",
                desc: "Workshops, peer-to-peer exchanges, feedback loops, and post-training support."
              },
              {
                icon: Award,
                title: "Real Impact",
                desc: "One standard only: real change in practice, visible impact in the field."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8C4BC]/30 hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-[#C4714A] flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#5C3D2E] mb-3">{item.title}</h3>
                <p className="text-[#5C3D2E]/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
