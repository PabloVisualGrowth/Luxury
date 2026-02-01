import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, BookOpen, Clock, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function UserProgress() {
  const stats = [
    { label: "Completed Courses", value: "3", icon: Award, color: "text-amber-500" },
    { label: "Hours Learned", value: "12.5", icon: Clock, color: "text-blue-500" },
    { label: "Current Progress", value: "65%", icon: Target, color: "text-green-500" },
    { label: "Upcoming Lessons", value: "8", icon: BookOpen, color: "text-pine-green" },
  ];

  return (
    <div className="bg-[#FDFBF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="mb-12">
          <Link to={createPageUrl("Dashboard")} className="inline-flex items-center text-[#73331a] hover:text-[#c45d32] mb-8 transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-[#3f2212] mb-4">Your Learning Progress</h1>
          <p className="text-[#3f2212]/70 text-lg">Track your journey through sustainable luxury excellence.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-[#deb8bc]/20"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
              <div className="text-3xl font-bold text-[#3f2212] mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-[#73331a]/60 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Placeholder for detailed progress */}
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-[#deb8bc]/20 text-center">
          <Award className="w-16 h-16 text-[#c45d32] mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-[#3f2212] mb-4">Keep going, Catherine!</h2>
          <p className="text-[#3f2212]/70 mb-8 max-w-xl mx-auto">
            You're doing great. Complete 2 more modules to unlock your "Sustainability Visionary" certificate.
          </p>
          <Link to={createPageUrl("Programs")}>
            <Button className="bg-[#c45d32] hover:bg-[#b35028] text-white px-8 py-6 rounded-2xl text-lg h-auto transition-transform active:scale-95 shadow-lg shadow-brick/20">
              Continue Learning
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
