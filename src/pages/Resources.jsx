import React, { useState, useEffect } from "react";
import { mockClient as base44 } from "@/api/mockClient";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Search, 
  Lock, 
  BookOpen,
  File,
  Video,
  Presentation
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const fileTypeIcons = {
  pdf: FileText,
  doc: File,
  ppt: Presentation,
  video: Video,
  other: File
};

const fileTypeColors = {
  pdf: "bg-red-100 text-red-700",
  doc: "bg-blue-100 text-blue-700",
  ppt: "bg-orange-100 text-orange-700",
  video: "bg-purple-100 text-purple-700",
  other: "bg-gray-100 text-gray-700"
};

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (isAuth) {
          const userData = await base44.auth.me();
          setUser(userData);
        }
      } catch (e) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: () => base44.entities.Resource.list(),
    initialData: []
  });

  // Filter resources based on user auth status
  const accessibleResources = resources.filter(r => r.is_public || user);

  const filteredResources = accessibleResources.filter(resource => {
    const matchesSearch = resource.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(resources.map(r => r.category).filter(Boolean))];

  return (
    <div className="bg-[#FDFBF9] min-h-screen">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-[#C4714A] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#0F3D3E] transform rotate-45" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-white/80 text-sm font-medium tracking-wider uppercase">
              Learning Resources
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Resource Library
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Access course materials, presentations, and supplementary documents 
              to support your sustainability learning journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b bg-white sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C3D2E]/50" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#E8C4BC] focus:border-[#C4714A] focus:ring-[#C4714A]"
              />
            </div>

            {/* Categories */}
            {categories.length > 1 && (
              <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="bg-[#F5EBE6] flex-wrap h-auto gap-1">
                  {categories.map((cat) => (
                    <TabsTrigger
                      key={cat}
                      value={cat}
                      className="data-[state=active]:bg-[#C4714A] data-[state=active]:text-white text-sm capitalize"
                    >
                      {cat === "all" ? "All" : cat}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {!user && (
            <div className="bg-[#F5EBE6] rounded-2xl p-6 mb-12 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C4714A] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#5C3D2E]">Sign in to access all resources</p>
                  <p className="text-sm text-[#5C3D2E]/60">Some materials are only available to registered users</p>
                </div>
              </div>
              <Button 
                onClick={() => base44.auth.redirectToLogin()}
                className="bg-[#C4714A] hover:bg-[#b36540] text-white"
              >
                Sign In
              </Button>
            </div>
          )}

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#F5EBE6] flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-[#5C3D2E]/50" />
              </div>
              <h3 className="text-xl font-semibold text-[#5C3D2E] mb-2">No Resources Found</h3>
              <p className="text-[#5C3D2E]/60">
                {resources.length === 0 
                  ? "Check back soon for learning materials."
                  : "No resources match your search criteria."}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => {
                const Icon = fileTypeIcons[resource.file_type] || fileTypeIcons.other;
                const colorClass = fileTypeColors[resource.file_type] || fileTypeColors.other;
                const isLocked = !resource.is_public && !user;

                return (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white rounded-2xl p-6 border border-[#E8C4BC]/30 hover:shadow-lg transition-all ${
                      isLocked ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      {isLocked ? (
                        <Lock className="w-5 h-5 text-[#5C3D2E]/40" />
                      ) : (
                        <Badge variant="outline" className="uppercase text-xs">
                          {resource.file_type}
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-semibold text-[#5C3D2E] mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    {resource.description && (
                      <p className="text-sm text-[#5C3D2E]/60 mb-4 line-clamp-2">
                        {resource.description}
                      </p>
                    )}
                    {resource.category && (
                      <Badge className="bg-[#F5EBE6] text-[#5C3D2E] mb-4">
                        {resource.category}
                      </Badge>
                    )}

                    <div className="pt-4 border-t border-[#E8C4BC]/30">
                      {isLocked ? (
                        <Button
                          variant="outline"
                          className="w-full border-[#E8C4BC] text-[#5C3D2E]/60"
                          onClick={() => base44.auth.redirectToLogin()}
                        >
                          <Lock className="mr-2 w-4 h-4" />
                          Sign in to Access
                        </Button>
                      ) : (
                        <a 
                          href={resource.file_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          <Button className="w-full bg-[#0F3D3E] hover:bg-[#0F3D3E]/90 text-white">
                            <Download className="mr-2 w-4 h-4" />
                            Download
                          </Button>
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
