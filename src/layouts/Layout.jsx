import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
import { mockClient as base44 } from "@/api/mockClient";
import { Menu, X, ChevronDown, User, LogOut, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleLogout = () => {
    base44.auth.logout();
  };

  const navItems = [
    { label: "Home", page: "Home" },
    { label: "About", page: "About" },
    { label: "Programs", page: "Programs" },
    { label: "Resources", page: "Resources" },
    { label: "Blog", page: "Blog" },
    { label: "Contact", page: "Contact" },
  ];

  const isTransparent = currentPageName === "Home" && !isScrolled;

  return (
    <div className="min-h-screen bg-[#FDFBF9]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

        :root {
          --pine-green: #00432d;
          --brick: #c45d32;
          --rose: #deb8bc;
          --brown: #73331a;
          --chocolate: #3f2212;
          --light-cream: #FDFBF9;
        }

        body {
          font-family: 'Work Sans', sans-serif;
        }

        .brand-gradient {
          background: linear-gradient(135deg, var(--pine-green) 0%, #005c3e 100%);
        }

        .brick-gradient {
          background: linear-gradient(135deg, var(--brick) 0%, #d87050 100%);
        }
      `}</style>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isTransparent
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md shadow-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6978c1f28c4af5c4f78b6d5e/4d214ad37_download3.png"
                alt="Sustainable Luxury"
                className="h-10 md:h-12"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 ${isTransparent
                      ? "text-white hover:text-[#deb8bc]"
                      : "text-[#73331a] hover:text-[#c45d32]"
                    } ${currentPageName === item.page ? (isTransparent ? "text-[#deb8bc]" : "text-[#c45d32]") : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`flex items-center gap-2 ${isTransparent ? "text-white hover:bg-white/10" : "text-[#73331a] hover:bg-[#deb8bc]/30"
                        }`}
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">{user.full_name || "Account"}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("Dashboard")} className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        My Learning
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("Resources")} className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Resources
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => base44.auth.redirectToLogin()}
                    className={`text-sm ${isTransparent ? "text-white hover:bg-white/10" : "text-[#73331a] hover:bg-[#deb8bc]/30"
                      }`}
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => base44.auth.redirectToLogin()}
                    className="bg-[#c45d32] hover:bg-[#b35028] text-white text-sm px-6"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${isTransparent ? "text-white" : "text-[#5C3D2E]"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isTransparent ? "text-white" : "text-[#5C3D2E]"}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-sm font-medium py-2 ${currentPageName === item.page ? "text-[#c45d32]" : "text-[#73331a]"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t space-y-3">
                {user ? (
                  <>
                    <Link
                      to={createPageUrl("Dashboard")}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm font-medium text-[#73331a] py-2"
                    >
                      My Learning
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-sm font-medium text-[#c45d32] py-2"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => base44.auth.redirectToLogin()}
                      className="w-full border-[#c45d32] text-[#c45d32]"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => base44.auth.redirectToLogin()}
                      className="w-full bg-[#c45d32] hover:bg-[#b35028] text-white"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className={currentPageName === "Home" ? "" : "pt-20"}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#00432d] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6978c1f28c4af5c4f78b6d5e/4d214ad37_download3.png"
                alt="Sustainable Luxury"
                className="h-10 mb-6 brightness-0 invert"
              />
              <p className="text-[#deb8bc]/80 text-sm leading-relaxed max-w-md">
                We believe the luxury of tomorrow will be defined not only by rarity,
                craftsmanship and excellence, but also by purpose, responsibility
                and the ability to create lasting, meaningful value.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[#deb8bc] font-semibold mb-6 text-sm tracking-wider uppercase">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.page}>
                    <Link
                      to={createPageUrl(item.page)}
                      className="text-white/70 hover:text-[#deb8bc] text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[#deb8bc] font-semibold mb-6 text-sm tracking-wider uppercase">
                Contact
              </h4>
              <div className="space-y-3 text-sm text-white/70">
                <p>Catherine Sonolet</p>
                <p>Training Consultant</p>
                <a
                  href="mailto:catherine.sonolet@sustainable-luxury.info"
                  className="block hover:text-[#deb8bc] transition-colors"
                >
                  catherine.sonolet@sustainable-luxury.info
                </a>
                <a
                  href="https://www.sustainable-luxury.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-[#deb8bc] transition-colors"
                >
                  www.sustainable-luxury.info
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-xs">
              © {new Date().getFullYear()} Sustainable Luxury. All rights reserved.
            </p>
            <p className="text-[#deb8bc] text-xs tracking-wider">
              LEADING BEYOND EXCELLENCE
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
