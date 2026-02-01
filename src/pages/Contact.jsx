import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MapPin, Phone, Send, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    interest: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Thank you for your inquiry! We'll be in touch soon.");
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-[#FDFBF9] min-h-screen">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-[#0F3D3E] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#C4714A] transform rotate-45" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-[#E8C4BC] text-sm font-medium tracking-wider uppercase">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Let's Start the Journey Together
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Ready to transform sustainability into your competitive advantage? 
              We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-[#5C3D2E] mb-8">
                Contact Information
              </h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C4714A] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#5C3D2E] mb-1">Email</h3>
                    <a 
                      href="mailto:catherine.sonolet@sustainable-luxury.info"
                      className="text-[#5C3D2E]/70 hover:text-[#C4714A] transition-colors"
                    >
                      catherine.sonolet@sustainable-luxury.info
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0F3D3E] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#5C3D2E] mb-1">Website</h3>
                    <a 
                      href="https://www.sustainable-luxury.info"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5C3D2E]/70 hover:text-[#C4714A] transition-colors"
                    >
                      www.sustainable-luxury.info
                    </a>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="bg-[#F5EBE6] rounded-3xl p-8">
                <blockquote className="text-lg text-[#5C3D2E] italic mb-4">
                  "Sustainability is not the end of luxury. It is what allows luxury to 
                  thrive, to matter and to lead beyond excellence."
                </blockquote>
                <p className="text-[#C4714A] font-medium">— Catherine Sonolet</p>
              </div>

              {/* Training Info */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-[#5C3D2E] mb-4">
                  Training Consultant
                </h3>
                <p className="text-[#5C3D2E]/70 leading-relaxed">
                  Catherine Sonolet brings extensive experience in CSR and luxury sector 
                  training. All programs are delivered in-person at your company premises, 
                  tailored to your specific needs and brand DNA.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {isSubmitted ? (
                <div className="bg-white rounded-3xl p-12 shadow-lg border border-[#E8C4BC]/30 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#0F3D3E] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#5C3D2E] mb-4">
                    Thank You!
                  </h3>
                  <p className="text-[#5C3D2E]/70 mb-8">
                    Your message has been received. We'll get back to you within 24-48 hours.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        role: "",
                        interest: "",
                        message: ""
                      });
                    }}
                    variant="outline"
                    className="border-[#C4714A] text-[#C4714A]"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-[#E8C4BC]/30"
                >
                  <h2 className="text-2xl font-bold text-[#5C3D2E] mb-8">
                    Request Information
                  </h2>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#5C3D2E]">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          required
                          className="border-[#E8C4BC] focus:border-[#C4714A] focus:ring-[#C4714A]"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#5C3D2E]">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                          className="border-[#E8C4BC] focus:border-[#C4714A] focus:ring-[#C4714A]"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-[#5C3D2E]">Company</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleChange("company", e.target.value)}
                          className="border-[#E8C4BC] focus:border-[#C4714A] focus:ring-[#C4714A]"
                          placeholder="Company name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role" className="text-[#5C3D2E]">Your Role</Label>
                        <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
                          <SelectTrigger className="border-[#E8C4BC] focus:border-[#C4714A] focus:ring-[#C4714A]">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ceo">CEO / Executive</SelectItem>
                            <SelectItem value="hr">HR / People</SelectItem>
                            <SelectItem value="csr">CSR / Sustainability</SelectItem>
                            <SelectItem value="sales">Sales / Retail</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interest" className="text-[#5C3D2E]">Area of Interest</Label>
                      <Select value={formData.interest} onValueChange={(value) => handleChange("interest", value)}>
                        <SelectTrigger className="border-[#E8C4BC] focus:border-[#C4714A] focus:ring-[#C4714A]">
                          <SelectValue placeholder="What are you interested in?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="team-training">Team Training</SelectItem>
                          <SelectItem value="sales-training">Sales Training</SelectItem>
                          <SelectItem value="executive-workshop">Executive Workshop</SelectItem>
                          <SelectItem value="consultation">General Consultation</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[#5C3D2E]">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        required
                        rows={5}
                        className="border-[#E8C4BC] focus:border-[#C4714A] focus:ring-[#C4714A] resize-none"
                        placeholder="Tell us about your needs and how we can help..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#C4714A] hover:bg-[#b36540] text-white py-6"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
