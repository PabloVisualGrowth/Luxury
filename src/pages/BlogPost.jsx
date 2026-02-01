import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { mockClient as base44 } from "@/api/mockClient";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar, User, Share2, Linkedin, Twitter } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";

const categoryColors = {
  sustainability: "bg-[#0F3D3E] text-white",
  luxury: "bg-[#C4714A] text-white",
  training: "bg-[#5C3D2E] text-white",
  industry: "bg-[#E8C4BC] text-[#5C3D2E]",
  insights: "bg-[#F5EBE6] text-[#5C3D2E]"
};

export default function BlogPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("slug");

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => base44.entities.BlogPost.filter({ slug: slug }),
    enabled: !!slug
  });

  const post = posts[0];

  // Get related posts
  const { data: relatedPosts = [] } = useQuery({
    queryKey: ['relatedPosts', post?.category],
    queryFn: () => base44.entities.BlogPost.filter({ 
      is_published: true, 
      category: post?.category 
    }, '-published_at', 4),
    enabled: !!post?.category
  });

  const filteredRelated = relatedPosts.filter(p => p.id !== post?.id).slice(0, 3);

  if (isLoading) {
    return (
      <div className="bg-[#FDFBF9] min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-6 w-48 mb-8" />
          <Skeleton className="h-96 w-full rounded-3xl mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-[#FDFBF9] min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-6 py-32 text-center">
          <h1 className="text-3xl font-bold text-[#5C3D2E] mb-4">Post Not Found</h1>
          <p className="text-[#5C3D2E]/70 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to={createPageUrl("Blog")}>
            <Button className="bg-[#C4714A] hover:bg-[#b36540]">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF9] min-h-screen">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-[#5C3D2E] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src={post.featured_image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#5C3D2E] to-[#5C3D2E]/80" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <Link to={createPageUrl("Blog")} className="inline-flex items-center text-[#E8C4BC] hover:text-white mb-8 transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className={`mb-6 ${categoryColors[post.category] || categoryColors.insights}`}>
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-[#E8C4BC]/80">
              {post.author && (
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              )}
              {post.published_at && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.published_at), 'MMMM d, yyyy')}
                </span>
              )}
              {post.read_time && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.read_time} min read
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Featured Image */}
          {post.featured_image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 -mt-24 relative z-20"
            >
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full rounded-3xl shadow-2xl"
              />
            </motion.div>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-[#5C3D2E]/80 leading-relaxed mb-12 font-medium border-l-4 border-[#C4714A] pl-6">
              {post.excerpt}
            </p>
          )}

          {/* Main Content */}
          <article className="prose prose-lg max-w-none prose-headings:text-[#5C3D2E] prose-p:text-[#5C3D2E]/80 prose-a:text-[#C4714A] prose-strong:text-[#5C3D2E] prose-blockquote:border-[#C4714A] prose-blockquote:text-[#5C3D2E]/70">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#E8C4BC]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-[#5C3D2E]">Tags:</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-[#F5EBE6] rounded-full text-sm text-[#5C3D2E]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-8 pt-8 border-t border-[#E8C4BC]">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-[#5C3D2E]">Share:</span>
              <Button variant="outline" size="sm" className="border-[#E8C4BC]">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-[#E8C4BC]">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-[#E8C4BC]">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {filteredRelated.length > 0 && (
        <section className="py-16 bg-[#F5EBE6]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#5C3D2E] mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {filteredRelated.map((relatedPost) => (
                <Link key={relatedPost.id} to={`${createPageUrl("BlogPost")}?slug=${relatedPost.slug}`}>
                  <div className="group bg-white rounded-2xl overflow-hidden border border-[#E8C4BC]/30 hover:shadow-xl transition-all">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={relatedPost.featured_image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-[#5C3D2E] group-hover:text-[#C4714A] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
