import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Code, Palette, Globe, Terminal, Cpu } from 'lucide-react';
import { CTA } from '@/components/shared/CTA';
import { CTASection } from '@/components/shared/CTASection';

const Features = () => {

  const features = [
    {
      icon: Terminal,
      title: 'AI Terminal',
      description: 'Interactive command-line interface for AI-powered website generation and management.',
      image: '/images/features/terminal.png',
      commands: [
        'ai generate website --modern --responsive',
        'ai add feature authentication',
        'ai deploy --production'
      ]
    },
    {
      icon: Cpu,
      title: 'Performance',
      description: 'Lightning fast builds and optimized output with our advanced compilation pipeline.',
      image: '/images/features/performance.png',
      stats: {
        label: 'Build Time',
        value: '1.2s',
        progress: 80
      }
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Enterprise-grade security with automatic updates and vulnerability scanning.',
      image: '/images/features/security.png',
      badges: ['SSL', '2FA', 'GDPR', 'SOC2']
    },
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Semantic, accessible, and maintainable code output with best practices.',
      image: '/images/features/code.png',
      codeSnippet: '.btn {\n  @apply px-4 py-2 rounded-lg;\n}'
    },
    {
      icon: Palette,
      title: 'Theming',
      description: 'Customizable design system with built-in dark mode support.',
      image: '/images/features/theme.png',
      colors: ['primary', 'secondary', 'accent', 'success']
    },
    {
      icon: Globe,
      title: 'Global CDN',
      description: 'Edge network for instant content delivery worldwide.',
      image: '/images/features/cdn.png',
      stats: {
        label: 'Global Coverage',
        value: '99.99%',
        progress: 100
      }
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10"></div>

        <div className="container mx-auto px-4 pt-32 pb-4 md:pt-40 md:pb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge removed as requested */}
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center">
                <span className="text-foreground">Features That Power</span>{' '}
                <span className="text-primary">Your Websites</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mt-4 rounded-full" />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Everything you need to build your dream website in minutes, not days.
            </motion.p>
          </motion.div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 left-1/4 w-40 h-40 bg-primary/10 rounded-full mix-blend-multiply blur-3xl opacity-20"></div>
          <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-secondary/10 rounded-full mix-blend-multiply blur-3xl opacity-20"></div>
        </div>
      </div>
      
      {/* Bento Grid Features */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-7xl mx-auto mb-16 px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:flex-1"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                <span className="text-foreground">Our Platform</span>{' '}
                <span className="text-primary">Capabilities</span>
              </h2>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:flex-1 flex items-center"
            >
              <p className="text-muted-foreground text-lg md:text-xl lg:ml-auto lg:max-w-md">
                Experience the future of web development with our AI-driven terminal interface
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-card rounded-xl border border-border/50 overflow-hidden group ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : 'h-64'
              }`}
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 p-3 border-b border-border/30 bg-card/80">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-primary/80"></div>
                </div>
                <div className="text-xs ml-2 text-muted-foreground font-mono truncate">
                  terminal: ~/features/{feature.title.toLowerCase().replace(/\s+/g, '-')}
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-4 h-full flex flex-col">
                {index === 0 ? (
                  // Main terminal with image preview
                  <div className="flex-1 flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <feature.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{feature.title}</h3>
                          <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </div>
                      </div>
                      <div className="bg-background/50 rounded-lg border border-border/30 p-4 font-mono text-sm h-64 overflow-auto">
                        {feature.commands?.map((cmd, i) => (
                          <div key={i} className="mb-2">
                            <div className="text-green-400">$ <span className="text-foreground">{cmd}</span></div>
                            <div className="text-cyan-400 ml-4">{'>'} Processing command...</div>
                          </div>
                        ))}
                        <div className="mt-4 flex items-center">
                          <span className="text-green-400">$</span>
                          <span className="ml-2 text-foreground/80">_</span>
                          <span className="ml-0.5 animate-pulse text-green-400">|</span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/2 relative rounded-lg overflow-hidden">
                      <img 
                        src="/Ai terminal.png" 
                        alt="AI Terminal Preview" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                ) : (
                  // Small terminal cards
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </div>
                    </div>
                    
                    <div className="bg-background/50 rounded-lg border border-border/30 p-3 font-mono text-xs flex-1 overflow-auto">
                      {feature.stats && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{feature.stats.label}</span>
                            <span className="text-foreground/70">{feature.stats.value}</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                              style={{ width: `${feature.stats.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {feature.badges && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {feature.badges.map((badge, i) => (
                            <span key={i} className="px-2 py-0.5 bg-muted text-xs rounded">
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {feature.codeSnippet && (
                        <div className="mt-2 bg-muted/30 p-2 rounded text-xs">
                          <pre className="whitespace-pre-wrap">{feature.codeSnippet}</pre>
                        </div>
                      )}
                      
                      {feature.colors && (
                        <div className="flex gap-2 mt-3">
                          {feature.colors.map((color, i) => (
                            <div 
                              key={i} 
                              className={`w-6 h-6 rounded-full bg-${color} border border-border`}
                              title={color}
                            ></div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* New CTASection */}
        <CTASection
          title="Ready to transform your development workflow?"
          description="Join thousands of developers already building with our platform. Start building today with our intuitive tools and comprehensive documentation."
          primaryButtonText="Get Started for Free"
          primaryButtonHref="/contact"
          secondaryButtonText={null}
          statsText="Developers trust our platform"
          statsCount="25K+"
          className="mt-0"
          hasImage={true}
          imageSrc="/Featurepage cta section.png"
          imageAlt="AI Development Platform"
        />
      </div>
    </div>
  );
};

export default Features;
