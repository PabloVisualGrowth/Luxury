import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { mockClient as base44 } from "@/api/mockClient";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  Award,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  FileText,
  User
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (isAuth) {
          const userData = await base44.auth.me();
          setUser(userData);
        } else {
          base44.auth.redirectToLogin();
        }
      } catch (e) {
        base44.auth.redirectToLogin();
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const { data: progress = [] } = useQuery({
    queryKey: ['userProgress'],
    queryFn: () => base44.entities.UserProgress.filter(),
    initialData: []
  });

  const { data: courses = [] } = useQuery({
    queryKey: ['courses'],
    queryFn: () => base44.entities.Course.filter(),
    initialData: []
  });

  const { data: resources = [] } = useQuery({
    queryKey: ['userResources'],
    queryFn: () => base44.entities.Resource.list(),
    initialData: []
  });

  if (loading) {
    return (
      <div className="bg-[#FDFBF9] min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const enrolledCourses = courses.filter(course =>
    progress.some(p => p.courseId === course.id)
  );

  const completedLessonsTotal = progress.reduce((acc, p) => acc + p.completedLessons.length, 0);

  return (
    <div className="bg-[#FDFBF9] min-h-screen">
      {/* Header */}
      <section className="bg-brand-pine py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div>
              <p className="text-brand-rose text-sm mb-2 uppercase tracking-wider font-medium">Welcome back</p>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                {user?.full_name || 'Learner'}
              </h1>
            </div>
            <Link to={createPageUrl("Programs")}>
              <Button className="bg-brand-brick hover:bg-brand-brick/90 text-white px-8 h-12">
                Browse Programs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 -mt-16 relative z-10">
          {[
            {
              icon: BookOpen,
              label: "Enrolled Courses",
              value: enrolledCourses.length,
              color: "bg-brand-brick"
            },
            {
              icon: Clock,
              label: "Lessons Completed",
              value: completedLessonsTotal,
              color: "bg-brand-brown"
            },
            {
              icon: Award,
              label: "Personalized Training",
              value: "Lvl 1",
              color: "bg-brand-pine"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-brand-rose/20"
            >
              <div className="flex items-center gap-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-inner`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-chocolate">{stat.value}</p>
                  <p className="text-sm text-brand-chocolate/60 font-medium">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-brand-chocolate mb-6">My Learning Journey</h2>

            {enrolledCourses.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-brand-rose/30">
                <div className="w-16 h-16 rounded-full bg-brand-rose/10 flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-brand-brown/50" />
                </div>
                <h3 className="text-xl font-semibold text-brand-chocolate mb-2">
                  Ready to Lead Beyond Excellence?
                </h3>
                <p className="text-brand-chocolate/60 mb-6 max-w-md mx-auto">
                  Enrol in our specialized programs to transform sustainability into a
                  competitive advantage for your luxury brand.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to={createPageUrl("Programs")}>
                    <Button className="bg-brand-brick hover:bg-brand-brick/90 text-white">
                      Explore Programs
                    </Button>
                  </Link>
                  <Link to={createPageUrl("Contact")}>
                    <Button variant="outline" className="border-brand-pine text-brand-pine">
                      Request Access
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {enrolledCourses.map((course) => {
                  const courseProgress = progress.find(p => p.courseId === course.id);
                  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
                  const completedCount = courseProgress?.completedLessons.length || 0;
                  const progressPercent = Math.round((completedCount / totalLessons) * 100);

                  return (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl p-6 border border-brand-rose/20 hover:border-brand-brick/50 hover:shadow-lg transition-all"
                    >
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={course.thumbnail || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 w-full">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-brand-chocolate text-lg mb-1">{course.title}</h3>
                              <p className="text-sm text-brand-chocolate/60">{totalLessons} Lessons • {course.duration || "Self-paced"}</p>
                            </div>
                            {progressPercent === 100 ? (
                              <Badge className="bg-brand-pine text-white">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Completed
                              </Badge>
                            ) : (
                              <Badge className="bg-brand-brick text-white">
                                {progressPercent > 0 ? "In Progress" : "New"}
                              </Badge>
                            )}
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-brand-chocolate/60">Completion Status</span>
                              <span className="font-bold text-brand-chocolate">{progressPercent}%</span>
                            </div>
                            <Progress value={progressPercent} className="h-2 bg-brand-rose/20" />
                          </div>
                          <Link to={createPageUrl("Course").replace(":id", course.id)}>
                            <Button
                              variant="ghost"
                              className="mt-4 text-brand-brick hover:text-brand-brick hover:bg-brand-rose/20 p-0"
                            >
                              <PlayCircle className="w-4 h-4 mr-2" />
                              {progressPercent > 0 ? 'Continue Journey' : 'Begin Journey'}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-brand-rose/20 shadow-sm">
              <h3 className="font-semibold text-brand-chocolate mb-4">Quick Insights</h3>
              <div className="space-y-3">
                <Link to={createPageUrl("Resources")} className="block">
                  <Button variant="outline" className="w-full justify-start border-brand-rose text-brand-chocolate hover:bg-brand-rose/10">
                    <FileText className="w-4 h-4 mr-3 text-brand-brick" />
                    Download Materials
                  </Button>
                </Link>
                <Link to={createPageUrl("Contact")} className="block">
                  <Button variant="outline" className="w-full justify-start border-brand-rose text-brand-chocolate hover:bg-brand-rose/10">
                    <User className="w-4 h-4 mr-3 text-brand-brown" />
                    Specialized Support
                  </Button>
                </Link>
              </div>
            </div>

            {/* Recent Resources */}
            {resources.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-brand-rose/20 shadow-sm">
                <h3 className="font-semibold text-brand-chocolate mb-4">Newest Resources</h3>
                <div className="space-y-3">
                  {resources.slice(0, 4).map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-brand-rose/10 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded bg-brand-rose/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-brick group-hover:text-white transition-colors">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-brand-chocolate truncate font-medium">{resource.title}</span>
                    </a>
                  ))}
                </div>
                <Link to={createPageUrl("Resources")}>
                  <Button variant="link" className="w-full mt-4 text-brand-brick">
                    Access Library
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}
