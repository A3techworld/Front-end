import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AboutSection = () => {
  const [badgeText, setBadgeText] = useState('About Us');
  const badgeVariants = ['About Us', 'Our Story', 'Who We Are'];
  
  useEffect(() => {
    const badgeInterval = setInterval(() => {
      setBadgeText(prev => {
        const currentIndex = badgeVariants.indexOf(prev);
        return badgeVariants[(currentIndex + 1) % badgeVariants.length];
      });
    }, 3000);
    
    return () => clearInterval(badgeInterval);
  }, []);

  return (
    <section id="about" className="w-full overflow-hidden py-20 md:py-28 bg-background border-t border-border">
      <div className="w-full max-w-[100vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="flex items-center">
              <span className="font-mono text-xs text-primary/80">//</span>
              <span className="mx-2 font-mono text-sm font-medium text-foreground/90">
                {badgeText}
              </span>
              <span className="font-mono text-xs text-primary/80">//</span>
            </div>

            {/* Title */}
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Pioneering Web Creation <span className="text-primary">with Innovation</span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We're a passionate team of developers and designers dedicated to creating beautiful, 
              functional, and user-friendly web applications that drive results.
            </motion.p>

            {/* Features */}
            <motion.div 
              className="space-y-4 pt-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[
                'Modern & responsive design',
                'Cutting-edge technology stack',
                'User-focused development',
                'Performance optimization'
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center group"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                  </div>
                  <span className="text-foreground group-hover:text-primary transition-colors">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Clean Image Grid */}
          <motion.div 
            className="w-full h-full"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Top Left Image */}
              <motion.div 
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <img 
                  src="/About1.png" 
                  alt="Our Team"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </motion.div>

              {/* Top Right Image */}
              <motion.div 
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <img 
                  src="/About2.png" 
                  alt="Our Workspace"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </motion.div>

              {/* Bottom Left Image */}
              <motion.div 
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <img 
                  src="/About3.png" 
                  alt="Our Projects"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </motion.div>

              {/* Bottom Right - Enhanced Text Box */}
              <motion.div 
                className="relative aspect-square rounded-xl overflow-hidden group bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-4 sm:p-6 flex flex-col justify-center items-center text-center border border-border/30 hover:border-primary/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 text-primary mb-3 sm:mb-4 group-hover:bg-primary/20 transition-all duration-300">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="28" 
                      height="28" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="group-hover:scale-110 transition-transform duration-300"
                    >
                      <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <circle cx="12" cy="10" r="2"></circle>
                      <line x1="8" x2="8" y1="2" y2="4"></line>
                      <line x1="16" x2="16" y1="2" y2="4"></line>
                    </svg>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                    Our Journey
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-5 max-w-xs mx-auto leading-relaxed">
                    Creating innovative solutions with passion and dedication since 2021
                  </p>
                  
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20"
                  >
                    Learn More
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-primary/5 dark:bg-primary/10 group-hover:scale-125 transition-transform duration-500"></div>
                <div className="absolute -left-5 -top-5 w-16 h-16 rounded-full bg-secondary/10 dark:bg-secondary/20 group-hover:scale-125 transition-transform duration-700"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
