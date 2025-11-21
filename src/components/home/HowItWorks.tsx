import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Code2, Rocket, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const steps = [
  {
    id: 1,
    title: 'Define Your Project',
    command: 'a3 init my-project --template=nextjs',
    image: '/Step1.png',
    details: [
      'Describe your project goals',
      'Specify technologies',
      'Define look and feel',
      'Set functionality requirements'
    ]
  },
  {
    id: 2,
    title: 'Generate with AI',
    command: 'a3 generate component Button --props=variant,size,disabled',
    image: '/Step2.png',
    details: [
      'AI analyzes your requirements',
      'Generates clean, maintainable code',
      'Sets up project structure',
      'Configures build tools'
    ]
  },
  {
    id: 3,
    title: 'Preview & Customize',
    command: 'a3 dev --port=3000 --hot-reload',
    image: '/Step3.png',
    details: [
      'Interactive preview',
      'Real-time code updates',
      'Test functionality',
      'Make adjustments'
    ]
  },
  {
    id: 4,
    title: 'Deploy Instantly',
    command: 'a3 deploy --env=production --minify',
    image: '/Step4.png',
    details: [
      'One-click deployment',
      'Automatic SSL setup',
      'Global CDN distribution',
      'Performance optimization'
    ]
  }
];

const TerminalCard = ({ step }: { step: typeof steps[0] }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(step.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 min-w-[280px] bg-background border border-border rounded-lg overflow-hidden flex flex-col h-full">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-accent/5 border-b border-border">
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          Step {step.id}
        </div>
        <button 
          onClick={copyToClipboard}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      {/* Terminal Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
        
        {/* Image */}
        <div className="mb-4 rounded overflow-hidden border border-border flex-shrink-0">
          <img 
            src={step.image} 
            alt={step.title}
            className="w-full h-32 md:h-40 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://placehold.co/800x450/1a1a2e/ffffff?text=Step${step.id}`;
            }}
          />
        </div>
        
        {/* Command */}
        <div className="bg-background border border-border rounded p-3 mb-3 flex-1">
          <div className="flex items-start">
            <span className="text-green-500 mr-2 mt-0.5">$</span>
            <code className="font-mono text-xs text-foreground/90 break-all">{step.command}</code>
          </div>
        </div>
        
        {/* Details */}
        <div className="space-y-1.5 mt-2">
          {step.details.map((detail, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span className="text-primary mt-0.5">→</span>
              <span className="text-foreground/90">{detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const [badgeText, setBadgeText] = useState('How It Works');
  const badgeVariants = ['How It Works', 'Simple Steps', 'Get Started'];
  
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
    <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative z-10"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              <span className="font-mono text-xs text-primary/80">//</span>
              <span className="mx-2 font-mono text-sm font-medium text-foreground/90">
                {badgeText}
              </span>
              <span className="font-mono text-xs text-primary/80">//</span>
            </div>
          </div>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Build <span className="text-primary">Smarter</span> with AI
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
           Transform your ideas into reality in four simple steps with our intuitive AI-powered development workflow
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }
          }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut"
                  }
                }
              }}
            >
              <TerminalCard step={step} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
