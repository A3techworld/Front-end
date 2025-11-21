import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Layout, Search, Palette, BarChart3, Rocket, Zap, Code as CodeIcon, Shield, Smartphone, Globe, Clock, Award, Terminal, Cpu, ChevronRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Custom hook for typing animation
const useTypingAnimation = (text: string, duration: number = 2) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, (duration * 1000) / text.length);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, duration]);

  return displayText;
};

// Keyframes for animations
const buttonKeyframes = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
  @keyframes shine {
    0% { transform: translateX(-100%) rotate(10deg); }
    100% { transform: translateX(200%) rotate(10deg); }
  }
  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
  }
`;
// Hover effect with cursor animation
const CodeHover = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative inline-block">
      <motion.span 
        className={`relative z-10 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {children}
      </motion.span>
      <motion.span 
        className="absolute -right-2 top-1/2 w-1 h-6 -mt-3 bg-cyan-500"
        animate={{ 
          opacity: isHovered ? [0.4, 0.9, 0.4] : 0,
          backgroundColor: ["#06b6d4", "#22d3ee", "#67e8f9", "#22d3ee", "#06b6d4"]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// Custom code display component with responsive design
const CodeDisplay = ({ code, currentLine }: { code: string; currentLine: number }) => {
  const lines = code.split('\n');
  return (
    <div className="bg-[#1e1e1e] text-gray-300 rounded-b-lg font-mono overflow-auto h-full">
      <div className="flex min-h-0 h-full">
        {/* Line numbers */}
        <div className="text-gray-500 pr-3 sm:pr-4 select-none text-xs sm:text-sm flex-shrink-0 border-r border-gray-800 py-2">
          {lines.map((_, i) => (
            <div key={i} className="text-right pr-2 h-5 flex items-center justify-end">
              {i + 1}
            </div>
          ))}
        </div>
        
        {/* Code content */}
        <div className="flex-1 overflow-x-auto py-2">
          <pre className="px-3 sm:px-4 text-xs sm:text-sm leading-5">
            {lines.map((line, i) => (
              <div 
                key={i} 
                className={`relative group ${i === currentLine ? 'bg-gray-800' : ''}`}
              >
                <code className={`block min-w-max ${i === currentLine ? 'pl-1 -ml-1' : ''}`}>
                  <span className={i === currentLine ? 'relative z-10' : ''}>
                    {line || ' '}
                  </span>
                  {i === currentLine && (
                    <span 
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary animate-pulse"
                      style={{ animationDuration: '1s' }}
                    />
                  )}
                </code>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Sample code for the coding animation
const sampleCode = `// AI-Powered Website Builder
function createWebsite(requirements) {
  const website = {
    responsive: true,
    optimized: true,
    features: ['AI Design', 'Fast Loading', 'SEO Ready']
  };
  
  // Generate beautiful UI components
  const components = requirements.map(req => 
    <Component {...req} key={req.id} />
  );
  
  return {
    ...website,
    components,
    launch: () => console.log('Website Launched! 🚀')
  };
}`;

// Animation variants for the feature cards
const featureItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  })
};


const FeaturesSection = () => {
  const [badgeText, setBadgeText] = useState('Why Choose Us');
  const [typingText, setTypingText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const badgeVariants = ['Why Choose Us', 'Top Features', 'Our Strengths'];
  
  
  const highlights = [
    { icon: <Zap className="w-5 h-5" />, text: 'Lightning Fast' },
    { icon: <Shield className="w-5 h-5" />, text: 'Secure & Reliable' },
    { icon: <CodeIcon className="w-5 h-5" />, text: 'Clean Code' },
    { icon: <Cpu className="w-5 h-5" />, text: 'Optimized Performance' },
    { icon: <Layout className="w-5 h-5" />, text: 'Responsive Design' },
    { icon: <Terminal className="w-5 h-5" />, text: 'Developer Friendly' }
  ];
  
  // Typewriter effect for the code animation
  useEffect(() => {
    const lines = sampleCode.split('\n');
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let currentText = '';
    
    const type = () => {
      if (currentLineIndex < lines.length) {
        const line = lines[currentLineIndex];
        if (currentCharIndex < line.length) {
          currentText += line[currentCharIndex];
          currentCharIndex++;
          setTypingText(prev => prev + line[currentCharIndex - 1]);
        } else {
          currentText += '\n';
          setTypingText(prev => prev + '\n');
          currentLineIndex++;
          currentCharIndex = 0;
          setCurrentLine(currentLineIndex);
        }
      } else {
        // Reset animation
        currentLineIndex = 0;
        currentCharIndex = 0;
        currentText = '';
        setTypingText('');
      }
    };
    
    const typeInterval = setInterval(type, 20);
    
    // Badge text rotation
    const badgeInterval = setInterval(() => {
      setBadgeText(prev => {
        const currentIndex = badgeVariants.indexOf(prev);
        return badgeVariants[(currentIndex + 1) % badgeVariants.length];
      });
    }, 3000);
    
    return () => {
      clearInterval(typeInterval);
      clearInterval(badgeInterval);
    };
  }, []);
  const features = [
    {
      icon: Terminal,
      title: 'Code Generation',
      description: 'AI-powered code generation for rapid development cycles.'
    },
    {
      icon: Cpu,
      title: 'Smart Components',
      description: 'Reusable, intelligent components that adapt to your needs.'
    },
    {
      icon: CodeIcon,
      title: 'Clean Code',
      description: 'Production-ready, well-documented code following best practices.'
    },
    {
      icon: Layout,
      title: 'Responsive Design',
      description: 'Fully responsive layouts that work on any device.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as any, // cubic-bezier for easeOut
        delay: i * 0.05
      }
    })
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header Section */}
        <div className="mb-16 lg:mb-20">
          <div className="lg:flex lg:items-center lg:justify-between">
            {/* Left side - Content */}
            <div className="text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
              <motion.div 
                className="inline-block mb-5"
                initial={{ opacity: 0, y: 5 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }}
                viewport={{ once: true, margin: "-20px" }}
              >
                <div className="px-4 py-2 bg-background/90 border border-border/30 rounded-lg">
                  <div className="flex items-center">
                    <span className="font-mono text-xs text-primary/80">//</span>
                    <span className="mx-2 font-mono text-sm font-medium text-foreground/90">
                      {badgeText}
                    </span>
                    <span className="font-mono text-xs text-primary/80">//</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Smart Web <span className="text-primary">Features</span>
              </motion.h2>
              
              <motion.p 
                className="text-lg text-muted-foreground mb-6 lg:mb-0"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Everything you need to build, launch, and grow your online presence
              </motion.p>
            </div>
            
            {/* Right side - Button (visible on lg screens and up) */}
            <motion.div 
              className="hidden lg:flex justify-end"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/features"
                className="relative group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                View All Features
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
          
          {/* Mobile/Tablet - Button (visible below lg screens) */}
          <motion.div 
            className="flex justify-center mt-8 lg:hidden w-full"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              View All Features
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Features List */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                  whileHover={{
                    y: -5,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  viewport={{ once: true, margin: "-20px" }}
                  className="group relative bg-card p-6 rounded-xl border border-border/20 hover:border-primary/50 transition-all duration-300 h-full flex flex-col overflow-hidden"
                >
                  {/* Animated background highlight on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { duration: 0.4 }
                    }}
                  />
                  
                  {/* Animated icon container */}
                  <motion.div 
                    className="relative z-10 w-12 h-12 rounded-lg mb-5 flex items-center justify-center bg-primary/10 text-primary"
                    whileHover={{
                      scale: 1.05,
                      rotate: [0, -5, 5, 0],
                      transition: { 
                        duration: 0.6,
                        rotate: { repeat: 1, duration: 0.6 }
                      }
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <feature.icon className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <motion.h3 
                      className="text-lg font-semibold mb-2.5 text-foreground"
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {feature.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-muted-foreground text-sm leading-relaxed mt-2"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ 
                        opacity: 1,
                        x: 2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Code Preview */}
          <div className="lg:col-span-5">
            <motion.div 
              className="bg-card rounded-xl border border-border/50 overflow-hidden shadow-lg h-full"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Editor Header */}
              <div className="flex items-center px-4 py-3 border-b border-border/50 bg-foreground/5">
                <div className="flex space-x-2 mr-4">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <div className="text-xs font-mono text-muted-foreground truncate max-w-[150px] sm:max-w-none">
                  website-builder.js
                </div>
              </div>
              
              {/* Code Display */}
              <div className="h-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] bg-[#1e1e1e] relative">
                <div className="absolute inset-0">
                  <CodeDisplay code={typingText} currentLine={currentLine} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
