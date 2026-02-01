export const mockBlogPosts = [
  {
    id: "1",
    title: "The Future of Sustainable Luxury",
    slug: "future-sustainable-luxury",
    excerpt: "Exploring how sustainability is reshaping the luxury industry.",
    content: "# The Future of Sustainable Luxury\n\nSustainability is no longer an optional add-on for luxury brands; it is the core of future value creation. In this article, we explore the shift from rarity to responsibility.\n\n### Key Pillars\n1. Ethical Craftsmanship\n2. Circular Business Models\n3. Transparent Supply Chains\n\nLuxury of tomorrow will be defined by its impact on the world.",
    featured_image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    author: "Catherine Sonolet",
    category: "sustainability",
    tags: ["luxury", "future"],
    is_published: true,
    published_at: "2024-01-15",
    read_time: 8
  }
];

export const mockCourses = [
  {
    id: "sustainability-essentials",
    title: "Sustainability Essentials for Luxury Teams",
    description: "Master the fundamentals of CSR and how to communicate it to luxury clients.",
    thumbnail: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80",
    modules: [
      {
        id: "m1",
        title: "Introduction to Luxury CSR",
        lessons: [
          { id: "l1", title: "Why Sustainability Matters", duration: "15m" },
          { id: "l2", title: "Global Luxury Trends", duration: "20m" }
        ]
      },
      {
        id: "m2",
        title: "Sustainable Materials",
        lessons: [
          { id: "l3", title: "Traceability in Raw Materials", duration: "25m" },
          { id: "l4", title: "Innovative Alternatives", duration: "30m" }
        ]
      }
    ]
  }
];

export const mockResources = [
  {
    id: "brand-guide",
    title: "Sustainable Branding Guide 2024",
    type: "PDF",
    description: "A comprehensive guide on how to integrate sustainability into your brand narrative.",
    fileUrl: "/assets/pdf/branding-guide.pdf",
    category: "Guides"
  },
  {
    id: "material-audit",
    title: "Material Audit Checklist",
    type: "Worksheet",
    description: "Use this checklist to audit your supply chain materials.",
    fileUrl: "/assets/pdf/audit-checklist.pdf",
    category: "Tools"
  }
];

export const mockUserProgress = [
  {
    courseId: "sustainability-essentials",
    completedLessons: ["l1", "l2"],
    lastAccessed: "2024-02-01T12:00:00Z"
  }
];

export const mockUsers = [
  {
    id: "u1",
    email: "pablo@visualgrowth.info",
    password: "password123",
    full_name: "Pablo Admin",
    role: "Admin"
  },
  {
    id: "u2",
    email: "catherine@sustainable-luxury.com",
    password: "luxury2024",
    full_name: "Catherine Sonolet",
    role: "Training Consultant"
  }
];
