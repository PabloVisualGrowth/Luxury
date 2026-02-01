<<<<<<< HEAD
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
        'Lesson': '/lesson/:id',
        'Module': '/module/:id',
    };
    return pageRoutes[pageName] || '/';
=======
export function createPageUrl(pageName) {
  const routes = {
    Home: '/',
    About: '/about',
    Programs: '/programs',
    Contact: '/contact',
    Blog: '/blog',
    BlogPost: '/blog',
    Resources: '/resources',
    Dashboard: '/dashboard',
    CourseDemo: '/demo',
  };
  return routes[pageName] || '/';
>>>>>>> 985b8ccea093af3b58a38ffbd96b7662541c1ecb
}
