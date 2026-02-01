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
    queryKey: ['userProgress', user?.email],
    queryFn: () => base44.entities.UserProgress.filter({ user_email: user.email }),
    enabled: !!user?.email,
    initialData: []
  });

  const { data: courses = [] } = useQuery({
    queryKey: ['courses'],
    queryFn: () => base44.entities.Course.filter({ is_published: true }),
    initialData: []
  });

  const { data: resources = [] } = useQuery({
    queryKey: ['userResources'],
    queryFn: () => base44.entities.Resource.list('-created_date', 5),
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
    progress.some(p => p.course_id === course.id)
  );

  const completedCount = progress.filter(p => p.is_completed).length;
  const inProgressCount = progress.filter(p => !p.is_completed && p.progress_percentage > 0).length;

  return (
    <div className="bg-[#FDFBF9] min-h-screen">
      {/* Header */}
      <section className="bg-[#0F3D3E] py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div>
              <p className="text-[#E8C4BC] text-sm mb-2">Welcome back</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {user?.full_name || 'Learner'}
              </h1>
            </div>
            <Link to={createPageUrl("Programs")}>
              <Button className="bg-[#C4714A] hover:bg-[#b36540] text-white">
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
              color: "bg-[#C4714A]"
            },
            { 
              icon: Clock, 
              label: "In Progress", 
              value: inProgressCount,
              color: "bg-[#5C3D2E]"
            },
            { 
              icon: Award, 
              label: "Completed", 
              value: completedCount,
              color: "bg-[#0F3D3E]"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-[#E8C4BC]/30"
            >
              <div className="flex items-center gap-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#5C3D2E]">{stat.value}</p>
                  <p className="text-sm text-[#5C3D2E]/60">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#5C3D2E] mb-6">My Learning</h2>
            
            {enrolledCourses.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#E8C4BC]/30">
                <div className="w-16 h-16 rounded-full bg-[#F5EBE6] flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-[#5C3D2E]/50" />
                </div>
                <h3 className="text-xl font-semibold text-[#5C3D2E] mb-2">
                  Start Your Learning Journey
                </h3>
                <p className="text-[#5C3D2E]/60 mb-6">
                  You haven't enrolled in any courses yet. Explore our programs and begin your 
                  sustainability training.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to={createPageUrl("Programs")}>
                    <Button className="bg-[#C4714A] hover:bg-[#b36540] text-white">
                      Explore Programs
                    </Button>
                  </Link>
                  <Link to={createPageUrl("CourseDemo")}>
                    <Button variant="outline" className="border-[#0F3D3E] text-[#0F3D3E]">
                      Try Demo Module
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {enrolledCourses.map((course) => {
                  const courseProgress = progress.find(p => p.course_id === course.id);
                  const progressPercent = courseProgress?.progress_percentage || 0;
                  
                  return (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl p-6 border border-[#E8C4BC]/30 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-6">
                        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                          <img 
                            src={course.image_url || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80"} 
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-[#5C3D2E] mb-1">{course.title}</h3>
                              <p className="text-sm text-[#5C3D2E]/60">{course.duration}</p>
                            </div>
                            {courseProgress?.is_completed ? (
                              <Badge className="bg-[#0F3D3E] text-white">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Completed
                              </Badge>
                            ) : (
                              <Badge className="bg-[#C4714A] text-white">
                                In Progress
                              </Badge>
                            )}
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-[#5C3D2E]/60">Progress</span>
                              <span className="font-medium text-[#5C3D2E]">{progressPercent}%</span>
                            </div>
                            <Progress value={progressPercent} className="h-2" />
                          </div>
                          <Link to={`${createPageUrl("CourseView")}?id=${course.id}`}>
                            <Button 
                              variant="ghost" 
                              className="mt-4 text-[#C4714A] hover:text-[#b36540] hover:bg-[#C4714A]/10 p-0"
                            >
                              <PlayCircle className="w-4 h-4 mr-2" />
                              {progressPercent > 0 ? 'Continue Learning' : 'Start Course'}
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
            <div className="bg-white rounded-2xl p-6 border border-[#E8C4BC]/30">
              <h3 className="font-semibold text-[#5C3D2E] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to={createPageUrl("CourseDemo")} className="block">
                  <Button variant="outline" className="w-full justify-start border-[#E8C4BC]">
                    <PlayCircle className="w-4 h-4 mr-3 text-[#C4714A]" />
                    Try Demo Module
                  </Button>
                </Link>
                <Link to={createPageUrl("Resources")} className="block">
                  <Button variant="outline" className="w-full justify-start border-[#E8C4BC]">
                    <FileText className="w-4 h-4 mr-3 text-[#0F3D3E]" />
                    Browse Resources
                  </Button>
                </Link>
                <Link to={createPageUrl("Contact")} className="block">
                  <Button variant="outline" className="w-full justify-start border-[#E8C4BC]">
                    <User className="w-4 h-4 mr-3 text-[#5C3D2E]" />
                    Contact Trainer
                  </Button>
                </Link>
              </div>
            </div>

            {/* Recent Resources */}
            {resources.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-[#E8C4BC]/30">
                <h3 className="font-semibold text-[#5C3D2E] mb-4">Recent Resources</h3>
                <div className="space-y-3">
                  {resources.slice(0, 4).map((resource) => (
                    <a 
                      key={resource.id}
                      href={resource.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F5EBE6] transition-colors"
                    >
                      <FileText className="w-4 h-4 text-[#C4714A]" />
                      <span className="text-sm text-[#5C3D2E] truncate">{resource.title}</span>
                    </a>
                  ))}
                </div>
                <Link to={createPageUrl("Resources")}>
                  <Button variant="link" className="w-full mt-4 text-[#C4714A]">
                    View All Resources
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
