import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { mockClient as base44 } from "@/api/mockClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Clock, Search, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  { value: "all", label: "All" },
  { value: "sustainability", label: "Sustainability" },
  { value: "luxury", label: "Luxury" },
  { value: "training", label: "Training" },
  { value: "industry", label: "Industry" },
  { value: "insights", label: "Insights" }
];

const categoryColors = {
  sustainability: "bg-[#0F3D3E] text-white",
  luxury: "bg-[#C4714A] text-white",
  training: "bg-[#5C3D2E] text-white",
  industry: "bg-[#E8C4BC] text-[#5C3D2E]",
  insights: "bg-[#F5EBE6] text-[#5C3D2E]"
};

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: () => base44.entities.BlogPost.filter({ is_published: true }, '-published_at'),
    initialData: []
  });

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <div className="bg-[#FDFBF9]">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-[#5C3D2E] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#E8C4BC] transform rotate-45" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-[#E8C4BC] text-sm font-medium tracking-wider uppercase">
              Insights & Perspectives
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              The Sustainable Luxury Blog
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Explore the latest insights on sustainability in the luxury industry, 
              training methodologies, and the future of responsible luxury.
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
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#E8C4BC] focus:border-[#C4714A] focus:ring-[#C4714A]"
              />
            </div>

            {/* Categories */}
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-[#F5EBE6] flex-wrap h-auto gap-1">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.value}
                    value={cat.value}
                    className="data-[state=active]:bg-[#C4714A] data-[state=active]:text-white text-sm"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-8">
              <Skeleton className="h-96 w-full rounded-3xl" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-80 rounded-2xl" />
                ))}
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#5C3D2E]/60 text-lg">
                {posts.length === 0 
                  ? "No blog posts yet. Check back soon for insights on sustainable luxury."
                  : "No posts match your search criteria."}
              </p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-16"
                >
                  <Link to={`${createPageUrl("BlogPost")}?slug=${featuredPost.slug}`}>
                    <div className="group grid lg:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden border border-[#E8C4BC]/30 hover:shadow-xl transition-all">
                      <div className="relative h-64 lg:h-auto overflow-hidden">
                        <img
                          src={featuredPost.featured_image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <Badge className={`absolute top-4 left-4 ${categoryColors[featuredPost.category] || categoryColors.insights}`}>
                          {featuredPost.category}
                        </Badge>
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-sm text-[#5C3D2E]/60 mb-4">
                          {featuredPost.published_at && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(featuredPost.published_at), 'MMM d, yyyy')}
                            </span>
                          )}
                          {featuredPost.read_time && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {featuredPost.read_time} min read
                            </span>
                          )}
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#5C3D2E] mb-4 group-hover:text-[#C4714A] transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-[#5C3D2E]/70 text-lg mb-6 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          {featuredPost.author && (
                            <span className="flex items-center gap-2 text-sm text-[#5C3D2E]/60">
                              <User className="w-4 h-4" />
                              {featuredPost.author}
                            </span>
                          )}
                          <span className="inline-flex items-center text-[#C4714A] font-medium group-hover:gap-3 transition-all">
                            Read More
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Other Posts Grid */}
              {otherPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link to={`${createPageUrl("BlogPost")}?slug=${post.slug}`}>
                        <div className="group bg-white rounded-2xl overflow-hidden border border-[#E8C4BC]/30 hover:shadow-xl transition-all h-full flex flex-col">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={post.featured_image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <Badge className={`absolute top-4 left-4 ${categoryColors[post.category] || categoryColors.insights}`}>
                              {post.category}
                            </Badge>
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 text-xs text-[#5C3D2E]/60 mb-3">
                              {post.published_at && (
                                <span>{format(new Date(post.published_at), 'MMM d, yyyy')}</span>
                              )}
                              {post.read_time && (
                                <span>• {post.read_time} min</span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold text-[#5C3D2E] mb-3 group-hover:text-[#C4714A] transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-[#5C3D2E]/70 text-sm mb-4 line-clamp-3 flex-1">
                              {post.excerpt}
                            </p>
                            <span className="inline-flex items-center text-[#C4714A] text-sm font-medium">
                              Read More
                              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-[#0F3D3E]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-white/70 mb-8">
            Subscribe to receive the latest insights on sustainable luxury directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button className="bg-[#C4714A] hover:bg-[#b36540] text-white whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
