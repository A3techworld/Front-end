import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LightRays from './LightRays';
import AnimatedButton from '@/components/ui/animated-button';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const titles = [
    'With Innovation',
    'With AI ',
    'With Vision'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const titleParts = [
    { text: 'Create a', delay: 0.1 },
    { text: 'New era', delay: 0.2 },
    { text: 'of', delay: 0.3 },
    { text: 'Websites', delay: 0.4 },
    { text: 'Reality', delay: 0.5, isAnimated: true },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-24 bg-background">
      <LightRays
        raysOrigin="top-center"
        raysColor="hsl(var(--primary))"
        raysSpeed={1.2}
        lightSpread={0.8}
        rayLength={1.5}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="z-0"
      />
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Split Title with Animation */}
          <div className="mb-10 md:mb-16">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 md:mb-10 text-center">
              <div className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2 gap-y-1">
                {titleParts.map((part, index) => (
                  <div key={index} className="overflow-hidden">
                    <motion.span
                      className={`inline-block ${part.isAnimated ? 'min-w-[140px] sm:min-w-[240px] md:min-w-[280px]' : 'mr-1 sm:mr-2'}`}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: part.delay,
                        duration: 0.5,
                        ease: 'easeOut'
                      }}
                    >
                      {part.isAnimated ? (
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={currentIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="inline-block w-full text-primary text-center whitespace-nowrap"
                            transition={{
                              duration: 0.5,
                              ease: "easeInOut"
                            }}
                          >
                            {titles[currentIndex]}
                          </motion.span>
                        </AnimatePresence>
                      ) : (
                        <span className="text-foreground whitespace-nowrap">{part.text}</span>
                      )}
                    </motion.span>
                  </div>
                ))}
              </div>
            </h1>
            
            <motion.div className="w-full flex justify-center">
              <motion.p 
                className="text-base sm:text-md md:text-md text-muted-foreground mt-6 md:mt-8 max-w-2xl text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Create, customize, and deploy beautiful websites through an advanced AI platform designed to make web development faster, smarter, and more human-centered.
              </motion.p>
            </motion.div>
          </div>

          {/* Button */}
          <motion.div
            className="flex justify-center mt-10 md:mt-12 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link to="/contact">
              <AnimatedButton>
                Get Started
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
