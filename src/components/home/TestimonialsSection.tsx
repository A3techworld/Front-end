import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Code, Terminal, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

// Terminal window component
const TerminalWindow = ({ children }: { children: React.ReactNode }) => (
  <div className="relative bg-[#0f0f0f] border border-foreground/10 rounded-lg overflow-hidden shadow-lg">
    {/* Terminal header */}
    <div className="flex items-center px-4 py-2 bg-foreground/5 border-b border-foreground/10">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="flex-1 text-center text-xs font-mono text-foreground/60">
        terminal: reviews.js
      </div>
    </div>
    
    {/* Terminal content */}
    <div className="p-4 font-mono text-sm">
      <div className="mb-4 text-foreground/60">
        <span className="text-green-400">$</span> cat customer-reviews.json
      </div>
      {children}
    </div>
  </div>
);

// Code line with line number
const CodeLine = ({ children, lineNumber }: { children: React.ReactNode; lineNumber: number }) => (
  <div className="flex group">
    <span className="text-foreground/30 mr-4 w-6 text-right select-none">{lineNumber}</span>
    <span className="flex-1">{children}</span>
  </div>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sofie Jorgensen',
      role: 'AI Product Designer',
      content: 'A3TechWorld transformed how we build websites. What used to take weeks now takes minutes!',
      rating: 5,
      image: '/Sofie Jorgensen.png'
    },
    {
      name: 'Luca Santoro',
      role: 'Full-Stack Engineer',
      content: 'The AI builder is incredibly intuitive. It understood exactly what I needed and delivered beyond expectations.',
      rating: 5,
      image: '/Mei Lin Zhang.png'
    },
    {
      name: 'Aya Nakamura',
      role: ' UX Researcher',
      content: 'Best investment for our agency. Our clients are amazed at the quality and speed of delivery.',
      rating: 5,
      image: '/Aya Nakamura.png'
    },
    {
      name: 'Dante Alvarez',
      role: 'Cloud Solutions Architect',
      content: 'Finally, a website builder that actually understands design. The templates are stunning!',
      rating: 5,
      image: '/Dante Alvarez.png'
    },
    {
      name: 'Mei Lin Zhang',
      role: ' Digital Strategy Lead',
      content: 'The level of customization is incredible. We were able to match our brand perfectly.',
      rating: 5,
      image: '/Luca Santoro.png'
    },
    {
      name: 'Kai Thompson',
      role: 'Technical Director',
      content: 'Saved us countless development hours. The AI suggestions are spot on!',
      rating: 5,
      image: '/Kai Thompson.png'
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentBadgeText, setCurrentBadgeText] = useState(0);
  
  const badgeTexts = [
    'Client Testimonials',
    'Trusted by Thousands',
    'Rated 5 Stars'
  ];
  
  // Rotate badge text every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBadgeText((prev) => (prev + 1) % badgeTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Update visible count based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1280) { // xl
        setVisibleCount(3);
      } else if (window.innerWidth >= 1024) { // lg
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) { // md
        setVisibleCount(2);
      } else { // sm and below
        setVisibleCount(1);
      }
    };

    // Set initial value
    updateVisibleCount();
    
    // Add event listener
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => 
      prev >= Math.ceil(testimonials.length / visibleCount) - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => 
      prev === 0 ? Math.ceil(testimonials.length / visibleCount) - 1 : prev - 1
    );
  };

  // Auto-advance carousel
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isHovered, visibleCount]);

  // Get current testimonials to display
  const getVisibleTestimonials = () => {
    const start = currentIndex * visibleCount;
    const end = start + visibleCount;
    const visible = testimonials.slice(start, end);
    
    // If we're at the end and don't have enough testimonials to fill the view,
    // take some from the beginning
    if (visible.length < visibleCount && testimonials.length > visibleCount) {
      return [...visible, ...testimonials.slice(0, visibleCount - visible.length)];
    }
    
    return visible;
  };
  
  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section className="py-12 sm:py-16 px-2 sm:px-3 md:px-4 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0,transparent_70%)] opacity-5"></div>
      
      <div className="container mx-auto px-0 sm:px-2 relative z-10 max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              <span className="font-mono text-xs text-primary/80">//</span>
              <span className="mx-2 font-mono text-sm font-medium text-foreground/90">
                {badgeTexts[currentBadgeText]}
              </span>
              <span className="font-mono text-xs text-primary/80">//</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-michroma font-bold mb-4">
            Creators Shaping <span className="text-primary">the Web with AI</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers building with AI
          </p>
        </motion.div>

        <div 
          className="relative max-w-full sm:max-w-5xl lg:max-w-6xl mx-auto px-2 sm:px-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <TerminalWindow>
            <div className="mb-4">
              <CodeLine lineNumber={1}>
                <span className="text-blue-400">const</span> <span className="text-yellow-300">reviews</span> = [
              </CodeLine>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                {visibleTestimonials.map((testimonial, idx) => (
                  <div key={idx} className="bg-foreground/5 rounded-lg p-3 border border-foreground/10">
                    <div className="flex items-center mb-3">
                      <div className="relative w-12 h-12 mr-3 group">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full rounded-full object-cover border-2 border-foreground/10 group-hover:border-primary/50 transition-all duration-300 transform group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">"{testimonial.content}"</p>
                  </div>
                ))}
              </div>
              
              <CodeLine lineNumber={8}>
                <span className="text-blue-400">]</span>;
              </CodeLine>
            </div>

            {/* Navigation */}
            <div className="mt-6 pt-4 border-t border-foreground/10 flex items-center justify-between">
              <div className="flex items-center text-foreground/60 text-sm">
                <span className="text-green-400">$</span>
                <span className="ml-2">Showing {Math.min(currentIndex * visibleCount + 1, testimonials.length)}-{Math.min((currentIndex + 1) * visibleCount, testimonials.length)} of {testimonials.length} reviews</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={prevSlide}
                  className="p-1.5 rounded hover:bg-foreground/5 text-foreground/50 hover:text-foreground transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: Math.ceil(testimonials.length / visibleCount) }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > currentIndex ? 1 : -1);
                        setCurrentIndex(i);
                      }}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full transition-all",
                        i === currentIndex 
                          ? "bg-primary w-6" 
                          : "bg-foreground/20 hover:bg-foreground/40"
                      )}
                      aria-label={`Go to page ${i + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={nextSlide}
                  className="p-1.5 rounded hover:bg-foreground/5 text-foreground/50 hover:text-foreground transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="text-xs text-foreground/40 font-mono hidden md:block">
                {isHovered ? '// Use arrows or dots to navigate' : '// Hover to pause auto-scroll'}
              </div>
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
