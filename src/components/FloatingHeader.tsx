import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Mail, Github, Code, Terminal, FileCode, GitBranch, Zap, ChevronRight } from 'lucide-react';

const FloatingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only update the scrolled state for styling changes
      setIsScrolled(currentScrollY > 50);
      
      // Always keep the header visible
      setIsVisible(true);
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'home()', path: '/', icon: <Terminal size={14} /> },
    { name: 'features()', path: '/features', icon: <Zap size={14} /> },
    { name: 'pricing()', path: '/pricing', icon: <Code size={14} /> },
    { name: 'about()', path: '/about', icon: <GitBranch size={14} /> },
    { name: 'contact()', path: '/contact', icon: <Mail size={14} /> },
  ];

  // Social media links with dev-focused icons
  const socialLinks = [
    { icon: <Github size={16} />, url: '#', name: 'GitHub' },
    { icon: <Code size={16} />, url: '#', name: 'CodePen' },
    { icon: <FileCode size={16} />, url: '#', name: 'CodeSandbox' },
  ];

  // Contact info with dev theme
  const contactInfo = [
    { icon: <Mail size={14} />, text: 'contact@devcode.com' },
  ];

  return (
    <div className="relative">
      {/* Main Header with integrated mini header */}
      <motion.header
        initial={{ y: 0, backdropFilter: 'blur(0px)' }}
        animate={{ 
          y: isVisible ? 0 : -200,
          backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border/20' 
            : 'bg-background/90 backdrop-blur-sm'
        }`}
      >
        {/* Code Editor Top Bar */}
        <div className="bg-card text-muted-foreground/80 text-xs border-b border-border/30">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between py-1.5">
              {/* File Tabs */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center px-3 py-1 bg-primary/10 rounded-t border-t border-l border-r border-primary/20">
                  <Code size={12} className="mr-2 text-primary" />
                  <span>index.tsx</span>
                </div>
                <div className="text-muted-foreground/40 hover:text-primary cursor-pointer">
                  <Code size={12} />
                </div>
              </div>
              
              {/* Version Number */}
              <div className="flex items-center text-xs text-muted-foreground/60 font-mono">
                v0.0.0
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-6 py-3">
          <nav className="flex items-center justify-between">
            {/* Logo - Always visible */}
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="/Logo.svg" 
                alt="A3TechWorld Logo" 
                className="h-16 w-auto sm:h-20 md:h-24 lg:h-16"
              />
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                
              </motion.div>
            </Link>

            {/* Desktop Navigation - Hidden on mobile and tablet */}
            <div className="hidden lg:flex items-center space-x-1 bg-card/50 rounded-lg border border-border/20 p-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative group px-4 py-2 rounded-md transition-all duration-300 ${
                      isActive 
                        ? 'text-foreground bg-primary/10' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
                    }`}
                  >
                    <motion.span 
                      className="relative z-10 text-sm font-mono flex items-center gap-2"
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-primary/60 group-hover:text-primary">{link.icon}</span>
                      <span>{link.name}</span>
                      {isActive && (
                        <motion.span 
                          className="ml-1 text-primary/60"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ▋
                        </motion.span>
                      )}
                    </motion.span>
                    {!isActive && (
                      <span className="absolute left-0 right-0 bottom-0.5 h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center">
              <a 
                href="http://app.a3techworld.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative overflow-hidden group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-mono font-medium shadow-lg hover:shadow-primary/30 transition-all duration-300 px-6 py-2 h-auto inline-flex items-center justify-center rounded-md text-sm"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: '0 0 15px -3px hsla(92, 44%, 50%, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center text-sm">
                  <Terminal size={14} className="mr-2" />
                  <span>runApp()</span>
                  <ChevronRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            {/* Mobile Menu Button - Visible on mobile and tablet */}
            <motion.button
              className="lg:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors text-foreground"
              whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--primary) / 0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border/20 overflow-hidden"
              >
                <div className="container mx-auto px-4 py-2 space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        to={link.path}
                        className={`block px-4 py-3 rounded-lg transition-all duration-300 font-mono text-sm ${
                          location.pathname === link.path
                            ? 'text-foreground bg-primary/10 font-medium scale-[1.02] border-l-2 border-primary'
                            : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                    className="pt-2 pb-4"
                  >
                    <a
                      href="http://app.a3techworld.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold shadow-lg hover:shadow-primary/20 transition-all duration-300 inline-flex items-center justify-center rounded-md text-sm px-4 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Start Building
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </div>
  );
};

export default FloatingHeader;
