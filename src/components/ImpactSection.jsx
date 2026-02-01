import React from "react";
import { motion } from "framer-motion";
import { Trophy, Heart, Users } from "lucide-react";

const impacts = [
  {
    icon: Trophy,
    title: "Teams not only trained, but proud and empowered",
    description: "Build confidence and ownership in sustainability initiatives"
  },
  {
    icon: Heart,
    title: "Client experiences that translate commitments into emotions",
    description: "Create meaningful connections through purposeful interactions"
  },
  {
    icon: Users,
    title: "A people-driven lever to attract, retain, and inspire top talent",
    description: "Position your brand as a leader in responsible luxury"
  }
];

export default function ImpactSection() {
  return (
    <section className="py-24 lg:py-32 bg-brand-brick relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pine/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-rose/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-brand-rose text-sm font-medium tracking-wider uppercase"
            >
              Our Impact
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6"
            >
              Your Outcome
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg leading-relaxed"
            >
              Sustainable Luxury embodies this new era, and leads the way.
              We turn sustainability into a force that elevates luxury, making it
              tangible, human, and inspiring for teams, so that every action
              becomes a step beyond excellence.
            </motion.p>
          </div>

          {/* Right - Impact Cards */}
          <div className="space-y-6">
            {impacts.map((impact, index) => (
              <motion.div
                key={impact.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-pine flex items-center justify-center flex-shrink-0">
                    <impact.icon className="w-6 h-6 text-brand-rose" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {impact.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {impact.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
