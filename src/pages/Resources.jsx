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
  pdf: "bg-brand-rose/20 text-brand-brick",
  doc: "bg-brand-rose/10 text-brand-brown",
  ppt: "bg-brand-rose/10 text-brand-chocolate",
  video: "bg-brand-rose/10 text-brand-pine",
  other: "bg-brand-rose/10 text-brand-chocolate/40"
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

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(resources.map(r => r.category).filter(Boolean))];

  return (
    <div className="bg-[#FDFBF9] min-h-screen">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-brand-pine overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-rose transform rotate-45 opacity-20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-brand-rose text-sm font-bold tracking-widest uppercase">
              Exclusive Learning
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mt-4 mb-6">
              Resources Library
            </h1>
            <p className="text-xl text-white/80 leading-relaxed font-light">
              Supplementary materials, official branding guides, and luxury
              excellence frameworks to elevate your learning experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b bg-white/80 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-chocolate/40" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-brand-rose/50 focus:border-brand-brick focus:ring-brand-brick rounded-xl"
              />
            </div>

            {/* Categories */}
            {categories.length > 1 && (
              <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="bg-brand-rose/10 flex-wrap h-auto gap-1 p-1 rounded-xl">
                  {categories.map((cat) => (
                    <TabsTrigger
                      key={cat}
                      value={cat}
                      className="data-[state=active]:bg-brand-brick data-[state=active]:text-white text-sm capitalize rounded-lg px-6"
                    >
                      {cat === "all" ? "All Resources" : cat}
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
            <div className="bg-brand-rose/10 rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center justify-between border border-brand-rose/20">
              <div className="flex items-center gap-4 mb-4 sm:mb-0 text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-brand-brick flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-brand-chocolate">Curated Access Required</p>
                  <p className="text-sm text-brand-chocolate/60">Members only can access specialized framework documents.</p>
                </div>
              </div>
              <Button
                onClick={() => base44.auth.redirectToLogin()}
                className="bg-brand-pine hover:bg-brand-pine/90 text-white px-8"
              >
                Sign In
              </Button>
            </div>
          )}

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-48 rounded-3xl" />
              ))}
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-brand-rose/10 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-brand-brown/30" />
              </div>
              <h3 className="text-2xl font-bold text-brand-chocolate mb-2">No Results Found</h3>
              <p className="text-brand-chocolate/60 max-w-md mx-auto">
                We couldn't find any resources matching your criteria. Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, index) => {
                const Icon = fileTypeIcons[resource.fileType] || fileTypeIcons.other;
                const colorClass = fileTypeColors[resource.fileType] || fileTypeColors.other;
                const isLocked = !user; // Resources are member-only in Sustainable Luxury

                return (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white rounded-3xl p-8 border border-brand-rose/10 hover:border-brand-brick/30 hover:shadow-2xl transition-all group ${isLocked ? 'grayscale' : ''
                      }`}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl ${colorClass} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      {isLocked ? (
                        <Badge className="bg-brand-rose/20 text-brand-chocolate/40 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Locked
                        </Badge>
                      ) : (
                        <Badge className="bg-brand-brown/5 text-brand-brown uppercase text-[10px] tracking-widest font-bold">
                          {resource.fileType}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-brand-chocolate mb-3 group-hover:text-brand-brick transition-colors line-clamp-2 leading-tight">
                      {resource.title}
                    </h3>
                    {resource.description && (
                      <p className="text-sm text-brand-chocolate/60 mb-6 line-clamp-3 leading-relaxed">
                        {resource.description}
                      </p>
                    )}

                    <div className="pt-6 border-t border-brand-rose/20 flex items-center justify-between">
                      {isLocked ? (
                        <Button
                          variant="ghost"
                          className="w-full text-brand-chocolate/60 hover:text-brand-brick hover:bg-brand-rose/10"
                          onClick={() => base44.auth.redirectToLogin()}
                        >
                          Unlock PDF
                        </Button>
                      ) : (
                        <a
                          href={resource.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          <Button className="w-full bg-brand-brick hover:bg-brand-brown text-white rounded-xl h-11">
                            <Download className="mr-2 w-4 h-4" />
                            Download Guide
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

