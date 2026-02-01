import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Circle,
  BookOpen,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Award,
  Lightbulb,
  Target,
  Leaf
} from "lucide-react";
import { cn } from "@/lib/utils";

// Demo Module Content
const demoModule = {
  title: "Sustainable Luxury: The Essence",
  subtitle: "Module 1: Foundations",
  description: "Discover why sustainability is not an add-on, but the very foundation of tomorrow's luxury.",
  duration: "45 minutes",
  lessons: [
    {
      id: 1,
      title: "Introduction: The New Luxury Paradigm",
      duration: "8 min",
      content: `
## Welcome to Sustainable Luxury

In today's world, the definition of luxury is evolving. **Sustainable Luxury** is not just a name—it is a statement about the future of the industry.

### What You'll Learn

In this introductory module, we'll explore:
- Why sustainability is becoming the new standard of luxury
- The intersection of excellence and responsibility
- How leading brands are transforming their approach

### The Shift in Luxury

> "We believe the luxury of tomorrow will be defined not only by rarity, craftsmanship and excellence, but also by purpose, responsibility and the ability to create lasting, meaningful value."

The luxury industry is at a pivotal moment. Consumers, especially younger generations, are increasingly demanding that brands align with their values. This isn't just about environmental concerns—it's about:

- **Authenticity** in brand storytelling
- **Transparency** in supply chains
- **Purpose** beyond profit
- **Legacy** that extends beyond products

### Key Takeaway

Sustainability is not an add-on or a compliance exercise: it is the next frontier of value creation in luxury.
      `
    },
    {
      id: 2,
      title: "Understanding Sustainable Luxury",
      duration: "12 min",
      content: `
## Defining Sustainable Luxury

Sustainable luxury goes beyond simply reducing environmental impact. It encompasses a holistic approach to creating value that respects people, planet, and prosperity.

### Three Pillars of Sustainable Luxury

#### 1. Environmental Stewardship
- Responsible sourcing of materials
- Circular economy principles
- Carbon footprint reduction
- Biodiversity protection

#### 2. Social Responsibility
- Fair labor practices throughout the supply chain
- Support for artisan communities
- Diversity and inclusion
- Employee wellbeing

#### 3. Governance & Transparency
- Ethical business practices
- Traceability and certification
- Stakeholder engagement
- Long-term value creation

### The Business Case

Research shows that sustainable luxury brands outperform their peers:

| Metric | Traditional | Sustainable |
|--------|-------------|-------------|
| Customer Loyalty | 67% | 84% |
| Employee Engagement | 71% | 89% |
| Brand Value Growth | 3.2% | 7.8% |

### Reflection Question

How does your organization currently address each of these three pillars? Where do you see the greatest opportunities for growth?
      `
    },
    {
      id: 3,
      title: "The Luxury Consumer Evolution",
      duration: "10 min",
      content: `
## How Luxury Consumers Are Changing

Today's luxury consumers are more informed, connected, and values-driven than ever before. Understanding their expectations is crucial for any brand seeking to lead in sustainable luxury.

### Consumer Expectations in 2024

**1. Authenticity Over Perfection**
Modern luxury consumers value genuine commitment over polished marketing. They can detect greenwashing and reward brands that show real progress, even when imperfect.

**2. Story and Meaning**
Every product should tell a story. Consumers want to know:
- Where materials come from
- Who made the product
- What impact their purchase creates

**3. Experience and Connection**
Luxury is increasingly about experiences and emotional connections, not just ownership.

### Generational Shifts

#### Millennials (1981-1996)
- 73% willing to pay more for sustainable products
- Value experiences over possessions
- Seek brands that align with personal values

#### Gen Z (1997-2012)
- 90% believe companies have a responsibility to address environmental issues
- Highly influenced by social media and peer recommendations
- Expect radical transparency

### The Opportunity

These shifts present an enormous opportunity for brands willing to embrace sustainability authentically. It's not about sacrifice—it's about elevation.
      `
    },
    {
      id: 4,
      title: "Challenges as Opportunities",
      duration: "15 min",
      content: `
## Transforming Challenges into Competitive Advantages

Every challenge in sustainable luxury can be reframed as an opportunity for innovation, differentiation, and deeper customer connection.

### Common Challenges

#### Supply Chain Complexity
**Challenge:** Luxury supply chains are global and complex, making traceability difficult.

**Opportunity:** Brands that achieve full traceability create powerful stories and build unmatched consumer trust.

#### Cost Considerations
**Challenge:** Sustainable materials and practices often have higher upfront costs.

**Opportunity:** Premium positioning, customer loyalty, and long-term cost savings from efficiency gains.

#### Communication Risks
**Challenge:** Fear of being accused of greenwashing if sustainability claims aren't perfect.

**Opportunity:** Honest, progress-focused communication builds authenticity and trust.

### Success Stories

**Stella McCartney**
Pioneer in sustainable luxury fashion, proving that style and sustainability are not mutually exclusive.

**Chopard**
Commitment to 100% ethical gold, transforming supply chain challenges into a powerful brand differentiator.

**Kering**
Comprehensive sustainability strategy that has become a model for the entire industry.

### Your Action Plan

1. **Assess** your current sustainability position
2. **Identify** your biggest challenges
3. **Reframe** each challenge as an opportunity
4. **Communicate** your journey authentically
5. **Measure** and celebrate progress

### Module Summary

In this foundational module, we've explored:
- ✓ The new paradigm of sustainable luxury
- ✓ The three pillars: Environmental, Social, Governance
- ✓ Evolving consumer expectations
- ✓ How to transform challenges into opportunities

**Next Steps:** In the following modules, we'll dive deeper into practical implementation strategies and real-world case studies.
      `
    }
  ]
};

export default function CourseDemo() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const lesson = demoModule.lessons[currentLesson];
  const progress = (completedLessons.length / demoModule.lessons.length) * 100;

  const handleNext = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson]);
    }
    if (currentLesson < demoModule.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handlePrevious = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const handleLessonClick = (index) => {
    setCurrentLesson(index);
  };

  const isCompleted = completedLessons.includes(currentLesson);
  const allCompleted = completedLessons.length === demoModule.lessons.length;

  return (
    <div className="bg-[#FDFBF9] min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-[#E8C4BC]/30 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={createPageUrl("Programs")}>
                <Button variant="ghost" size="sm" className="text-[#5C3D2E]">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Programs
                </Button>
              </Link>
              <div className="hidden md:block h-6 w-px bg-[#E8C4BC]" />
              <div className="hidden md:block">
                <Badge className="bg-[#0F3D3E] text-white">Demo Module</Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-[#5C3D2E]/60">Progress</span>
                <Progress value={progress} className="w-24 h-2" />
                <span className="text-sm font-medium text-[#5C3D2E]">{Math.round(progress)}%</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden lg:block w-80 bg-white border-r border-[#E8C4BC]/30 flex-shrink-0 sticky top-36 h-[calc(100vh-144px)] overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-lg font-bold text-[#5C3D2E] mb-2">{demoModule.title}</h2>
                <p className="text-sm text-[#5C3D2E]/60 mb-6">{demoModule.subtitle}</p>

                <div className="flex items-center gap-4 text-sm text-[#5C3D2E]/60 mb-6">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {demoModule.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {demoModule.lessons.length} lessons
                  </span>
                </div>

                <div className="space-y-2">
                  {demoModule.lessons.map((l, index) => (
                    <button
                      key={l.id}
                      onClick={() => handleLessonClick(index)}
                      className={cn(
                        "w-full text-left p-3 rounded-xl transition-all",
                        currentLesson === index
                          ? "bg-[#C4714A] text-white"
                          : "hover:bg-[#F5EBE6]"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {completedLessons.includes(index) ? (
                          <CheckCircle2 className={cn(
                            "w-5 h-5 flex-shrink-0 mt-0.5",
                            currentLesson === index ? "text-white" : "text-[#0F3D3E]"
                          )} />
                        ) : (
                          <Circle className={cn(
                            "w-5 h-5 flex-shrink-0 mt-0.5",
                            currentLesson === index ? "text-white/60" : "text-[#5C3D2E]/30"
                          )} />
                        )}
                        <div>
                          <p className={cn(
                            "text-sm font-medium",
                            currentLesson === index ? "text-white" : "text-[#5C3D2E]"
                          )}>
                            {l.title}
                          </p>
                          <p className={cn(
                            "text-xs mt-1",
                            currentLesson === index ? "text-white/70" : "text-[#5C3D2E]/50"
                          )}>
                            {l.duration}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-6 py-12">
            {allCompleted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-[#0F3D3E] flex items-center justify-center mx-auto mb-8">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#5C3D2E] mb-4">
                  Congratulations!
                </h2>
                <p className="text-[#5C3D2E]/70 text-lg mb-8 max-w-xl mx-auto">
                  You've completed the demo module. Ready to unlock the full training experience 
                  and transform your team's approach to sustainable luxury?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to={createPageUrl("Contact")}>
                    <Button className="bg-[#C4714A] hover:bg-[#b36540] text-white px-8">
                      Request Full Program
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-[#0F3D3E] text-[#0F3D3E]"
                    onClick={() => {
                      setCurrentLesson(0);
                      setCompletedLessons([]);
                    }}
                  >
                    Restart Demo
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Lesson Header */}
                <motion.div
                  key={currentLesson}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="text-[#C4714A] border-[#C4714A]">
                      Lesson {currentLesson + 1} of {demoModule.lessons.length}
                    </Badge>
                    <span className="text-sm text-[#5C3D2E]/60 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {lesson.duration}
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold text-[#5C3D2E] mb-8">
                    {lesson.title}
                  </h1>

                  {/* Content */}
                  <article className="prose prose-lg max-w-none prose-headings:text-[#5C3D2E] prose-p:text-[#5C3D2E]/80 prose-a:text-[#C4714A] prose-strong:text-[#5C3D2E] prose-blockquote:border-l-4 prose-blockquote:border-[#C4714A] prose-blockquote:bg-[#F5EBE6] prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-li:text-[#5C3D2E]/80 prose-table:border prose-th:bg-[#F5EBE6] prose-th:p-3 prose-td:p-3 prose-td:border">
                    <div dangerouslySetInnerHTML={{ 
                      __html: lesson.content
                        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
                        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
                        .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-medium mt-4 mb-2">$1</h4>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
                        .replace(/^- (.*$)/gim, '<li>$1</li>')
                        .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-6 space-y-2 my-4">$1</ul>')
                        .replace(/\n\n/g, '</p><p class="mb-4">')
                        .replace(/\|(.+)\|/g, (match) => {
                          const cells = match.split('|').filter(c => c.trim());
                          return `<tr>${cells.map(c => `<td>${c.trim()}</td>`).join('')}</tr>`;
                        })
                    }} />
                  </article>
                </motion.div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#E8C4BC]">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentLesson === 0}
                    className="border-[#E8C4BC] text-[#5C3D2E]"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <Button
                    onClick={handleNext}
                    className="bg-[#C4714A] hover:bg-[#b36540] text-white"
                  >
                    {currentLesson === demoModule.lessons.length - 1 ? (
                      <>
                        Complete Module
                        <CheckCircle2 className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Next Lesson
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
