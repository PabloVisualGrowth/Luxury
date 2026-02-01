import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { mockClient as base44 } from "@/api/mockClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    ArrowLeft,
    ChevronRight,
    ChevronDown,
    PlayCircle,
    CheckCircle2,
    Lock,
    FileText,
    Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function Course() {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [expandedModules, setExpandedModules] = useState({});

    const { data: course, isLoading: courseLoading } = useQuery({
        queryKey: ['course', id],
        queryFn: () => base44.entities.Course.get(id),
        enabled: !!id
    });

    const { data: progress = [], isLoading: progressLoading } = useQuery({
        queryKey: ['userProgress'],
        queryFn: () => base44.entities.UserProgress.filter(),
        initialData: []
    });

    const completeLessonMutation = useMutation({
        mutationFn: (lessonId) => base44.entities.UserProgress.update(id, lessonId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userProgress'] });
        }
    });

    useEffect(() => {
        if (course && !selectedLesson) {
            setSelectedLesson(course.modules[0].lessons[0]);
            setExpandedModules({ [course.modules[0].id]: true });
        }
    }, [course, selectedLesson]);

    if (courseLoading || progressLoading) {
        return (
            <div className="bg-[#FDFBF9] min-h-screen pt-20">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <Skeleton className="h-64 w-full rounded-2xl mb-8" />
                    <div className="grid lg:grid-cols-3 gap-8">
                        <Skeleton className="lg:col-span-2 h-96 rounded-2xl" />
                        <Skeleton className="h-96 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="bg-[#FDFBF9] min-h-screen pt-40 text-center">
                <h2 className="text-2xl font-bold text-brand-chocolate mb-4">Course Not Found</h2>
                <Link to={createPageUrl("Dashboard")}>
                    <Button className="bg-brand-brick text-white">Back to Dashboard</Button>
                </Link>
            </div>
        );
    }

    const courseProgress = progress.find(p => p.courseId === course.id);
    const completedLessons = courseProgress?.completedLessons || [];
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const progressPercent = Math.round((completedLessons.length / totalLessons) * 100);

    const toggleModule = (moduleId) => {
        setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
    };

    const handleCompleteLesson = () => {
        if (selectedLesson && !completedLessons.includes(selectedLesson.id)) {
            completeLessonMutation.mutate(selectedLesson.id);
        }
    };

    return (
        <div className="bg-[#FDFBF9] min-h-screen">
            {/* Course Header */}
            <section className="bg-brand-pine pt-28 pb-12 text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <Link
                        to={createPageUrl("Dashboard")}
                        className="inline-flex items-center text-brand-rose hover:text-white transition-colors mb-6 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-3xl">
                            <Badge className="bg-brand-brick text-white mb-4">Luxury Mastery</Badge>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">{course.title}</h1>
                            <p className="text-white/70 text-lg leading-relaxed">{course.description}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 min-w-[240px]">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-brand-rose text-sm font-medium">Your Progress</span>
                                <span className="font-bold">{progressPercent}%</span>
                            </div>
                            <Progress value={progressPercent} className="h-2 bg-white/20" />
                            <p className="text-white/50 text-xs mt-3 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {completedLessons.length} of {totalLessons} lessons completed
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Content Area */}
                    <div className="lg:col-span-2">
                        {selectedLesson ? (
                            <motion.div
                                key={selectedLesson.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-brand-rose/10"
                            >
                                <div className="aspect-video bg-brand-chocolate/5 rounded-2xl mb-8 flex items-center justify-center border-2 border-dashed border-brand-chocolate/10 relative group bg-cover bg-center" style={{ backgroundImage: `url(${course.thumbnail})` }}>
                                    <div className="absolute inset-0 bg-brand-chocolate/40 rounded-2xl transition-opacity group-hover:opacity-60" />
                                    <PlayCircle className="w-20 h-20 text-white relative z-10 transition-transform group-hover:scale-110 cursor-pointer" />
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-brand-chocolate mb-4">{selectedLesson.title}</h2>
                                    <div className="flex items-center gap-6 text-brand-chocolate/60 text-sm">
                                        <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {selectedLesson.duration}</span>
                                        <span className="flex items-center"><FileText className="w-4 h-4 mr-2" /> 2 Resources</span>
                                    </div>
                                </div>

                                <div className="prose prose-brand max-w-none mb-12">
                                    <p className="text-brand-chocolate/80 text-lg leading-relaxed">
                                        In this lesson, we dive deep into the core concepts of {selectedLesson.title}.
                                        Sustainability in luxury is not just about the materials we use, but the legacy
                                        we build for future generations.
                                    </p>
                                    <p className="text-brand-chocolate/80 text-lg leading-relaxed mt-4">
                                        Learn how to communicate these values to ultra-high-net-worth individuals
                                        who seek authenticity above all else. This module covers the history and
                                        transformation of the luxury landscape.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-brand-rose/20">
                                    <Button
                                        onClick={handleCompleteLesson}
                                        disabled={completedLessons.includes(selectedLesson.id) || completeLessonMutation.isPending}
                                        className={`${completedLessons.includes(selectedLesson.id) ? 'bg-brand-pine text-white' : 'bg-brand-brick hover:bg-brand-brick/90 text-white'} px-8 h-12 min-w-[200px]`}
                                    >
                                        {completedLessons.includes(selectedLesson.id) ? (
                                            <><CheckCircle2 className="w-5 h-5 mr-2" /> Lesson Completed</>
                                        ) : (
                                            <>{completeLessonMutation.isPending ? 'Saving...' : 'Mark as Completed'}</>
                                        )}
                                    </Button>

                                    <div className="flex items-center gap-4">
                                        <Link to={createPageUrl("Resources")} className="text-brand-rose hover:text-brand-brick transition-colors font-medium flex items-center">
                                            <FileText className="w-4 h-4 mr-2" />
                                            Download Notes
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex items-center justify-center h-96 bg-white rounded-3xl border border-dashed border-brand-rose/30">
                                <p className="text-brand-chocolate/40 italic">Select a lesson to begin</p>
                            </div>
                        )}
                    </div>

                    {/* Curriculum Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-6 shadow-xl border border-brand-rose/10 sticky top-32">
                            <h3 className="text-xl font-bold text-brand-chocolate mb-6 flex items-center">
                                <BookOpen className="w-5 h-5 mr-3 text-brand-brick" />
                                Course Curriculum
                            </h3>

                            <div className="space-y-4">
                                {course.modules.map((module) => (
                                    <div key={module.id} className="border-b border-brand-rose/10 last:border-0 pb-4">
                                        <button
                                            onClick={() => toggleModule(module.id)}
                                            className="w-full flex items-center justify-between text-left group"
                                        >
                                            <span className="font-semibold text-brand-chocolate group-hover:text-brand-brick transition-colors">
                                                {module.title}
                                            </span>
                                            {expandedModules[module.id] ? (
                                                <ChevronDown className="w-4 h-4 text-brand-rose" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-brand-rose" />
                                            )}
                                        </button>

                                        <AnimatePresence>
                                            {expandedModules[module.id] && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="mt-4 space-y-2 pl-2">
                                                        {module.lessons.map((lesson) => (
                                                            <button
                                                                key={lesson.id}
                                                                onClick={() => setSelectedLesson(lesson)}
                                                                className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 ${selectedLesson?.id === lesson.id
                                                                        ? 'bg-brand-rose/10 text-brand-brick shadow-sm'
                                                                        : 'text-brand-chocolate/70 hover:bg-brand-rose/5'
                                                                    }`}
                                                            >
                                                                {completedLessons.includes(lesson.id) ? (
                                                                    <CheckCircle2 className="w-4 h-4 text-brand-pine flex-shrink-0" />
                                                                ) : (
                                                                    <PlayCircle className={`w-4 h-4 flex-shrink-0 ${selectedLesson?.id === lesson.id ? 'text-brand-brick' : 'text-brand-chocolate/30'}`} />
                                                                )}
                                                                <span className="text-sm font-medium truncate">{lesson.title}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-brand-rose/20 text-center">
                                <p className="text-xs text-brand-chocolate/40 mb-4 uppercase tracking-widest font-bold">Certification Path</p>
                                <div className="bg-brand-brown/5 rounded-2xl p-4 border border-brand-brown/10">
                                    <Award className="w-8 h-8 text-brand-brick mx-auto mb-2 opacity-50" />
                                    <p className="text-xs text-brand-chocolate/60">Complete all modules to unlock your certificate of excellence.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
