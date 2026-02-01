import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';

// Luxury Web App v1.0.2 - Clean build
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
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

import Login from './pages/Login';
import { useQuery } from '@tanstack/react-query';
import { mockClient as base44 } from '@/api/mockClient';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { data: isAuthenticated, isLoading } = useQuery({
        queryKey: ['authStatus'],
        queryFn: () => base44.auth.isAuthenticated(),
    });

    if (isLoading) return null; // Or a loading spinner

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

// Utility function to create page URLs
export function createPageUrl(pageName) {
    const pageRoutes = {
        'Home': '/',
        'About': '/about',
        'Blog': '/blog',
        'BlogPost': '/blog/:id',
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
        'Login': '/login',
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
                <Route path="/contact" element={<Layout currentPageName="Contact"><Contact /></Layout>} />
                <Route path="/programs" element={<Layout currentPageName="Programs"><Programs /></Layout>} />
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route path="/resources" element={<ProtectedRoute><Layout currentPageName="Resources"><Resources /></Layout></ProtectedRoute>} />
                <Route path="/resources/:id" element={<ProtectedRoute><Layout currentPageName="Resource"><Resource /></Layout></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Layout currentPageName="Dashboard"><Dashboard /></Layout></ProtectedRoute>} />
                <Route path="/progress" element={<ProtectedRoute><Layout currentPageName="UserProgress"><UserProgress /></Layout></ProtectedRoute>} />
                <Route path="/course/:id" element={<ProtectedRoute><Layout currentPageName="Course"><Course /></Layout></ProtectedRoute>} />
                <Route path="/course/demo" element={<ProtectedRoute><Layout currentPageName="CourseDemo"><CourseDemo /></Layout></ProtectedRoute>} />
                <Route path="/lesson/:id" element={<ProtectedRoute><Layout currentPageName="Lesson"><Lesson /></Layout></ProtectedRoute>} />
                <Route path="/module/:id" element={<ProtectedRoute><Layout currentPageName="Module"><Module /></Layout></ProtectedRoute>} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;

