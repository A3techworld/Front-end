import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Code, Terminal, Zap, GitBranch, Rocket, Copy, Check } from 'lucide-react';

interface CTAProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  className?: string;
  theme?: 'default' | 'code';
  codeSnippet?: string;
  features?: { icon: string; text: string }[];
}

const getIcon = (name: string) => {
  switch (name) {
    case 'terminal':
      return <Terminal className="w-4 h-4 text-primary" />;
    case 'git':
      return <GitBranch className="w-4 h-4 text-primary" />;
    case 'deploy':
      return <Rocket className="w-4 h-4 text-primary" />;
    case 'code':
      return <Code className="w-4 h-4 text-primary" />;
    default:
      return <Zap className="w-4 h-4 text-primary" />;
  }
};

export function CTA({ 
  title, 
  description, 
  buttonText, 
  buttonHref,
  className,
  theme = 'default',
  codeSnippet = `// Start coding now
const App = () => (\n  <div className="app">\n    <h1>Hello, World!</h1>\n  </div>\n);`,
  features = [
    { icon: 'terminal', text: 'Terminal' },
    { icon: 'git', text: 'Git' },
    { icon: 'deploy', text: 'Deploy' }
  ]
}: CTAProps) {
  const [copied, setCopied] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const lines = codeSnippet.split('\n');

  // Typewriter effect for code
  useEffect(() => {
    if (theme === 'code' && currentLine < lines.length) {
      const targetText = lines.slice(0, currentLine + 1).join('\n');
      let currentText = typedText;
      const targetChar = lines[currentLine][typedText.split('\n').pop()?.length || 0];
      
      const timer = setTimeout(() => {
        currentText += targetChar || '\n';
        setTypedText(currentText);
        
        if (!targetChar) {
          setCurrentLine(prev => prev + 1);
        }
      }, Math.random() * 50 + 20);
      
      return () => clearTimeout(timer);
    }
  }, [typedText, currentLine, theme]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (theme === 'code') {
    return (
      <section className={cn("relative py-12 sm:py-16 overflow-hidden bg-card/50 border-t border-border/20 rounded-2xl mx-4 sm:mx-6 lg:mx-8", className)}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <motion.div 
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary font-sans"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="w-3 h-3 mr-1.5" />
                Developer Ready
              </motion.div>
              
              <motion.h2 
                className="text-2xl sm:text-3xl font-bold text-foreground font-michroma"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {title}
              </motion.h2>
              
              <motion.p 
                className="text-muted-foreground text-sm mt-2 font-sans"
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {description}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-2 mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
              >
                {features.map((feature, index) => (
                  <motion.div 
                    key={feature.text}
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-background/80 text-foreground/90 border border-border/30 transition-colors font-sans"
                  >
                    {getIcon(feature.icon)}
                    <span className="ml-1.5">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="mt-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Button 
                  asChild
                  size="default"
                  className="h-10 px-6 text-sm font-medium group bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-200 font-sans"
                >
                  <a href={buttonHref} className="flex items-center">
                    <span className="relative z-10 flex items-center">
                      {buttonText}
                      <svg className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-md"></span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-background rounded-lg overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between px-3 py-2 bg-muted/30 border-b border-border">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-[11px] text-muted-foreground font-mono">
                    example.jsx
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Copy code"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="p-3 font-mono text-xs bg-background/80 h-48 overflow-auto">
                  <pre className="text-foreground/80">
                    <code>
                      {typedText}
                      <span className="inline-block w-1.5 h-4 bg-primary/50 ml-0.5 animate-pulse"></span>
                    </code>
                  </pre>
                </div>
                <div className="px-3 py-1.5 bg-muted/20 border-t border-border/50 text-[10px] text-muted-foreground flex justify-between items-center font-mono">
                  <div className="flex items-center space-x-2">
                    <span>main*</span>
                    <span className="text-primary flex items-center">
                      <GitBranch className="w-2.5 h-2.5 mr-0.5" />
                      feature/code-preview
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }
  
  // Default theme (fallback)
  return (
    <section className={cn("relative py-16 sm:py-24 overflow-hidden bg-background", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-michroma">
            {title}
          </h2>
          
          {description && (
            <p className="mt-4 text-lg text-muted-foreground">
              {description}
            </p>
          )}
          
          <div className="mt-8">
            <Button 
              asChild
              size="lg"
              className="h-12 px-8 text-base font-medium bg-primary hover:bg-primary/90"
            >
              <a href={buttonHref}>
                {buttonText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
