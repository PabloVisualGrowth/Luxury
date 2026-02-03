// Utility function to create page URLs
export function createPageUrl(pageName) {
  const pageRoutes = {
    'Home': '/',
    'About': '/about',
    'Blog': '/blog',
    'BlogPost': '/blog/:id',
    'BlogPost1': '/blog/1',
    'Contact': '/contact',
    'Programs': '/programs',
    'Resources': '/resources',
    'Resource': '/resources/:id',
    'Dashboard': '/dashboard',
    'UserProgress': '/progress',
    'Course': '/course/:id',
    'CourseDemo': '/course/demo',
    'Demo': '/demo',
    'Lesson': '/lesson/:id',
    'Module': '/module/:id',
    'Login': '/login',
  };
  return pageRoutes[pageName] || '/';
}
