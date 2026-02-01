import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BlogPost1 from './pages/BlogPost1';
import Contact from './pages/Contact';
import Programs from './pages/Programs';
import Resources from './pages/Resources';
import Resource from './pages/Resource';
import Dashboard from './pages/Dashboard';
import UserProgress from './pages/UserProgress';
import Course from './pages/Course';
import CourseDemo from './pages/CourseDemo';
import Lesson from './pages/Lesson';
import Module from './pages/Module';

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
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout currentPageName="Home"><Home /></Layout>} />
                <Route path="/about" element={<Layout currentPageName="About"><About /></Layout>} />
                <Route path="/blog" element={<Layout currentPageName="Blog"><Blog /></Layout>} />
                <Route path="/blog/:id" element={<Layout currentPageName="BlogPost"><BlogPost /></Layout>} />
                <Route path="/blog/1" element={<Layout currentPageName="BlogPost1"><BlogPost1 /></Layout>} />
                <Route path="/contact" element={<Layout currentPageName="Contact"><Contact /></Layout>} />
                <Route path="/programs" element={<Layout currentPageName="Programs"><Programs /></Layout>} />
                <Route path="/resources" element={<Layout currentPageName="Resources"><Resources /></Layout>} />
                <Route path="/resources/:id" element={<Layout currentPageName="Resource"><Resource /></Layout>} />
                <Route path="/dashboard" element={<Layout currentPageName="Dashboard"><Dashboard /></Layout>} />
                <Route path="/progress" element={<Layout currentPageName="UserProgress"><UserProgress /></Layout>} />
                <Route path="/course/:id" element={<Layout currentPageName="Course"><Course /></Layout>} />
                <Route path="/course/demo" element={<Layout currentPageName="CourseDemo"><CourseDemo /></Layout>} />
                <Route path="/lesson/:id" element={<Layout currentPageName="Lesson"><Lesson /></Layout>} />
                <Route path="/module/:id" element={<Layout currentPageName="Module"><Module /></Layout>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;

