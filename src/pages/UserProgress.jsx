import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, BookOpen, Clock, Target } from "lucide-react";
import { motion } from "framer-motion";

import { useQuery } from "@tanstack/react-query";
import { mockClient as base44 } from "@/api/mockClient";

export default function UserProgress() {
  const { data: progress = [] } = useQuery({
    queryKey: ['userProgress'],
    queryFn: () => base44.entities.UserProgress.filter(),
    initialData: []
  });

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me()
  });

  const completedLessonsTotal = progress.reduce((acc, p) => acc + p.completedLessons.length, 0);
  const coursesCompleted = progress.filter(p => p.is_completed).length;

  const stats = [
    { label: "Completed Courses", value: coursesCompleted, icon: Award, color: "text-brand-brick" },
    { label: "Lessons Mastered", value: completedLessonsTotal, icon: BookOpen, color: "text-brand-brown" },
    { label: "Learning Hours", value: (completedLessonsTotal * 0.5).toFixed(1), icon: Clock, color: "text-brand-pine" },
    { label: "Success Rate", value: "98%", icon: Target, color: "text-brand-chocolate" },
  ];

  return (
    <div className="bg-[#FDFBF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="mb-12">
          <Link to={createPageUrl("Dashboard")} className="inline-flex items-center text-brand-brown hover:text-brand-brick mb-8 transition-colors font-medium">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-chocolate mb-4">Your Excellence Journey</h1>
              <p className="text-brand-chocolate/60 text-lg font-light">Documenting your path to becoming a visionary in sustainable luxury.</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 rounded-full bg-brand-rose/20 flex items-center justify-center border-2 border-brand-rose/40">
                <Award className="w-10 h-10 text-brand-brick" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-brand-rose/10 hover:border-brand-brick/30 transition-all group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-brand-rose/10 flex items-center justify-center mb-6 group-hover:bg-brand-brick group-hover:text-white transition-colors`}>
                <stat.icon className={`w-6 h-6 ${stat.color} group-hover:text-white transition-colors`} />
              </div>
              <div className="text-4xl font-bold text-brand-chocolate mb-2 tracking-tight">{stat.value}</div>
              <div className="text-xs font-bold text-brand-chocolate/40 uppercase tracking-[0.2em]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Milestone Card */}
        <div className="bg-brand-pine rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-brick/10 rounded-full blur-3xl -mr-48 -mt-48 transition-transform group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-rose/10 rounded-full blur-3xl -ml-32 -mb-32 transition-transform group-hover:scale-110" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-brand-rose flex items-center justify-center mx-auto mb-10 shadow-lg">
              <Award className="w-10 h-10 text-brand-brown" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Next Milestone: <span className="text-brand-rose">Sustainability Visionary</span>
            </h2>
            <p className="text-white/80 text-xl font-light mb-12 italic">
              "Excellence is not an act, but a habit." Keep going, {user?.full_name?.split(' ')[0] || 'Catherine'}!
              You're only a few lessons away from your next official certification.
            </p>
            <Link to={createPageUrl("Programs")}>
              <Button className="bg-brand-brick hover:bg-brand-rose hover:text-brand-brown text-white px-12 h-16 rounded-2xl text-lg font-bold transition-all active:scale-95 shadow-2xl shadow-black/20">
                Continue the Quest
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
}
