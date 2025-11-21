import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    // Set up countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10"></div>
      <div className="absolute top-20 left-1/4 w-40 h-40 bg-primary/10 rounded-full mix-blend-multiply blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-secondary/10 rounded-full mix-blend-multiply blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <motion.div 
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number with Animation */}
          <motion.div 
            className="mb-8 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          >
            <div className="flex items-center justify-center relative">
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold font-michroma text-primary relative">
                404
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  404
                </motion.div>
              </h1>
            </div>
          </motion.div>
          
          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Page Not</span>{' '}
              <span className="text-primary">Found</span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-2">
              Oops! The page you're looking for doesn't exist.
            </p>
            
            
            <p className="text-xs sm:text-sm text-muted-foreground font-mono bg-background/50 border border-border/30 rounded-lg p-2 sm:p-3 inline-block">
              <span className="text-primary">const</span> missingPage ={" "}
              <span className="text-amber-400">'{location.pathname}'</span>;
            </p>
          </motion.div>
          
          {/* Countdown Timer */}
          <motion.div
            className="flex items-center justify-center gap-2 text-base font-medium text-foreground mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Clock className="w-5 h-5 text-primary" />
            <span>Redirecting to homepage in <span className="font-bold text-primary">{countdown}</span> seconds...</span>
          </motion.div>
          
          {/* Floating Elements */}
          <motion.div
            className="absolute top-10 right-10 w-4 h-4 bg-primary rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-3 h-3 bg-secondary rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-40 left-20 w-2 h-2 bg-primary/50 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
