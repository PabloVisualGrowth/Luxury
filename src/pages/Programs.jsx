import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Clock, BookOpen, Users, Star } from "lucide-react";

const programs = [
  {
    id: 1,
    category: "essence",
    title: "Sustainable Luxury: The Essence",
    subtitle: "Foundation Program",
    description: "Discover why sustainability is not an add-on, but the very foundation of tomorrow's luxury. Learn to see challenges as opportunities and commitments as competitive edge.",
    duration: "2 Days",
    format: "In-Person Workshop",
    audience: "All Teams",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    highlights: [
      "Understanding the intersection of luxury and sustainability",
      "Business case for responsible luxury",
      "Identifying opportunities within challenges",
      "Building a sustainability mindset"
    ],
    hasDemo: true
  },
  {
    id: 2,
    category: "challenges",
    title: "Luxury & Responsibility: Industry Challenges",
    subtitle: "Advanced Program",
    description: "From raw materials to transparency, from traceability to credibility, understand what's at stake, what's changing, and how to lead authentically.",
    duration: "3 Days",
    format: "In-Person Workshop",
    audience: "Managers & Executives",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    highlights: [
      "Supply chain transparency and traceability",
      "Environmental and social responsibility",
      "Regulatory landscape and compliance",
      "Authentic communication strategies"
    ],
    hasDemo: false
  },
  {
    id: 3,
    category: "experience",
    title: "Customer Experience: The Luxury of Positive Impact",
    subtitle: "Sales Excellence Program",
    description: "Transform every client interaction into a memorable story of excellence with purpose. Equip teams to connect with clients emotionally through the brand's vision.",
    duration: "1 Day",
    format: "In-Person Workshop",
    audience: "Sales & Retail Teams",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    highlights: [
      "Storytelling with purpose",
      "Building emotional connections",
      "Answering client questions confidently",
      "Elevating the client experience"
    ],
    hasDemo: false
  }
];

const teamPrograms = [
  {
    title: "Sustainability Training for Teams & Managers",
    description: "Immersive learning experiences designed to make sustainability and CSR clear, inspiring, and actionable.",
    benefits: [
      "Make sustainability and CSR clear, inspiring, and actionable",
      "Connect your strategy with real-world business practices",
      "Strengthen culture and pride through purpose"
    ],
    icon: Users
  },
  {
    title: "Tailor-made Training for Sales Teams",
    description: "Because in luxury, selling is storytelling. Prepare and inspire teams to build emotional connections with clients.",
    benefits: [
      "Build emotional connections through brand vision",
      "Provide confident, credible answers to client questions",
      "Elevate the client experience with meaning and emotional resonance"
    ],
    icon: Star
  }
];

export default function Programs() {
  const [activeCategory, setActiveCategory] = useState("all");
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromUrl = urlParams.get("category");

  React.useEffect(() => {
    if (categoryFromUrl && ["essence", "challenges", "experience"].includes(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const filteredPrograms = activeCategory === "all" 
    ? programs 
    : programs.filter(p => p.category === activeCategory);

  return (
    <div className="bg-[#FDFBF9]">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-[#0F3D3E] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#C4714A] transform rotate-45" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-[#E8C4BC] text-sm font-medium tracking-wider uppercase">
              Our Programs
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Bespoke Learning Experiences
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Transform sustainability into tangible value through our immersive training 
              programs designed specifically for the luxury industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program Types */}
      <section className="py-24 lg:py-32 bg-[#F5EBE6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C4714A] text-sm font-medium tracking-wider uppercase">
              Training Formats
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#5C3D2E] mt-4">
              How We Create Impact
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {teamPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-[#E8C4BC]/30"
              >
                <div className="w-14 h-14 rounded-xl bg-[#C4714A] flex items-center justify-center mb-6">
                  <program.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#5C3D2E] mb-4">{program.title}</h3>
                <p className="text-[#5C3D2E]/70 mb-6">{program.description}</p>
                <ul className="space-y-3">
                  {program.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C4714A] mt-2" />
                      <span className="text-[#5C3D2E]/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <span className="text-[#C4714A] text-sm font-medium tracking-wider uppercase">
                Our Pathways
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#5C3D2E] mt-4">
                Learning Journeys
              </h2>
            </div>

            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-[#F5EBE6]">
                <TabsTrigger value="all" className="data-[state=active]:bg-[#C4714A] data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="essence" className="data-[state=active]:bg-[#C4714A] data-[state=active]:text-white">
                  Essence
                </TabsTrigger>
                <TabsTrigger value="challenges" className="data-[state=active]:bg-[#C4714A] data-[state=active]:text-white">
                  Challenges
                </TabsTrigger>
                <TabsTrigger value="experience" className="data-[state=active]:bg-[#C4714A] data-[state=active]:text-white">
                  Experience
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-8">
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8C4BC]/30 hover:shadow-xl transition-shadow"
              >
                <div className="grid lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-64 lg:h-auto">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                    {program.hasDemo && (
                      <div className="absolute top-4 left-4 bg-[#0F3D3E] text-white px-3 py-1 rounded-full text-sm font-medium">
                        Demo Available
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-10">
                    <span className="text-[#C4714A] text-sm font-medium">{program.subtitle}</span>
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#5C3D2E] mt-2 mb-4">
                      {program.title}
                    </h3>
                    <p className="text-[#5C3D2E]/70 mb-6">{program.description}</p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 mb-6 text-sm">
                      <span className="flex items-center gap-2 text-[#5C3D2E]/60">
                        <Clock className="w-4 h-4" />
                        {program.duration}
                      </span>
                      <span className="flex items-center gap-2 text-[#5C3D2E]/60">
                        <BookOpen className="w-4 h-4" />
                        {program.format}
                      </span>
                      <span className="flex items-center gap-2 text-[#5C3D2E]/60">
                        <Users className="w-4 h-4" />
                        {program.audience}
                      </span>
                    </div>

                    {/* Highlights */}
                    <div className="mb-8">
                      <p className="text-sm font-medium text-[#5C3D2E] mb-3">Key Topics:</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {program.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#5C3D2E]/70">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#C4714A] mt-1.5" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4">
                      <Link to={createPageUrl("Contact")}>
                        <Button className="bg-[#C4714A] hover:bg-[#b36540] text-white">
                          Request Information
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                      {program.hasDemo && (
                        <Link to={createPageUrl("CourseDemo")}>
                          <Button variant="outline" className="border-[#0F3D3E] text-[#0F3D3E]">
                            Try Demo Module
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-[#C4714A]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Team?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Every program is tailored to your brand's DNA, CSR strategy, and specific challenges. 
            Let's discuss how we can create impact together.
          </p>
          <Link to={createPageUrl("Contact")}>
            <Button size="lg" className="bg-white text-[#C4714A] hover:bg-[#F5EBE6]">
              Schedule a Consultation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
