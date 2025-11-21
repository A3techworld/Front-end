import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/shared/PageHero';
import { CTA } from '@/components/shared/CTA';
import { CTASection } from '@/components/shared/CTASection';

// Typewriter Effect Component (Type only, no delete)
const TypewriterEffect = ({ options, className, cursorClassName }) => {
  const [text, setText] = useState('');
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const type = () => {
      const currentString = options.strings[currentStringIndex];
      
      if (text.length < currentString.length) {
        setText(currentString.substring(0, text.length + 1));
      } else if (options.loop) {
        // Move to next string if looping is enabled
        const nextIndex = (currentStringIndex + 1) % options.strings.length;
        if (nextIndex === 0) {
          // If we're back to the first string, reset completely
          setText('');
          setCurrentStringIndex(0);
        } else {
          // Otherwise, move to next string
          setText('');
          setCurrentStringIndex(nextIndex);
        }
      }
    };

    timer.current = setTimeout(type, options.delay || 30);
    return () => clearTimeout(timer.current);
  }, [text, currentStringIndex, options]);

  return (
    <div className={className}>
      {text}
      <span className={cursorClassName}>█</span>
    </div>
  );
};

const Counter = ({ target }: { target: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, target, { duration: 2 });
    return controls.stop;
  }, [count, target]);

  useEffect(() => {
    return rounded.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toLocaleString();
      }
    });
  }, [rounded]);

  return <span ref={ref}>0</span>;
};

const About = () => {
  const achievements = [
    { 
      label: 'Projects', 
      value: 1200,
      suffix: '+',
      icon: '📦',
      color: 'text-blue-400',
      comment: '// Successful projects delivered'
    },
    { 
      label: 'Code Commits', 
      value: 45000,
      suffix: '+',
      icon: '💻',
      color: 'text-green-400',
      comment: '// Lines of code committed'
    },
    { 
      label: 'Deployments', 
      value: 98,
      suffix: 'K+',
      icon: '🚀',
      color: 'text-purple-400',
      comment: '// Successful deployments'
    },
    { 
      label: 'Uptime', 
      value: 99.9, 
      suffix: '%',
      icon: '⚡',
      color: 'text-amber-400',
      comment: '// System reliability'
    },
  ];

  const team = [
    { 
      name: 'Orin Vale', 
      role: 'Innovation Director', 
      bio: 'Visionary leader with 15 years in AI',
      image: '/Orin Vale.png'
    },
    { 
      name: 'Sora Lin', 
      role: 'Chief Technology Officer', 
      bio: 'Expert in machine learning and web technologies',
      image: '/Sora Lin.png'
    },
    { 
      name: 'Tavian Cross', 
      role: 'VP Engineering', 
      bio: 'Scaling teams and building products',
      image: '/Tavian Cross.png'
    },
    { 
      name: 'Isla Verma', 
      role: 'Lead Developer', 
      bio: 'Full-stack engineer passionate about clean code',
      image: '/Isla Verma.png'
    },
  ];

  return (
    <div>
      <div className="pb-0 md:pb-1 mb-0 md:mb-1">
        <PageHero
          title="Revolutionizing"
          highlightText="Website Creation"
          description="Our mission is to democratize web development, making professional website creation accessible to everyone through the power of AI."
          showDecoration={false}
        />
      </div>
      <div className="container mx-auto px-4 pt-2 pb-0 sm:pb-2 md:pb-6 lg:pb-10">
        <div className="mb-4 sm:mb-8 md:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Mission Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md"></div>
              <div className="relative bg-gradient-to-br from-card to-card/95 rounded-xl border border-border/30 overflow-hidden flex flex-col md:flex-row h-full min-h-[400px] md:min-h-0">
                <div className="md:w-2/5 relative overflow-hidden h-48 md:h-auto">
                  <img 
                    src="/Mission.png" 
                    alt="Our Mission" 
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                </div>
                <div className="md:w-3/5 flex flex-col h-full">
                  <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-muted/50 border-b border-border/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <span className="text-sm font-mono font-semibold text-primary tracking-wider">mission.js</span>
                    </div>
                    <div className="flex space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-foreground text-sm leading-relaxed space-y-4">
                      <TypewriterEffect
                        options={{
                          strings: [
"We make web dev accessible through AI automation, empowering creators with intuitive tools."
                          ],
                          autoStart: true,
                          loop: false,
                          delay: 20,
                        }}
                        className="[&_span]:text-foreground"
                        cursorClassName="animate-pulse text-primary"
                      />
                      <div className="pt-4 space-y-2">
                        <p className="text-primary font-medium">Core:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Accessibility</li>
                          <li>Intuitive UI/UX</li>
                          <li>Automation</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border/20">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Building the future of web development</p>
                          <p className="text-xs text-muted-foreground">One line of code at a time</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vision Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative group mt-8 lg:mt-0"
            >
              <div className="absolute -inset-1 bg-gradient-to-l from-primary/20 via-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md"></div>
              <div className="relative bg-gradient-to-bl from-card to-card/95 rounded-xl border border-border/30 overflow-hidden flex flex-col md:flex-row h-full min-h-[400px] md:min-h-0">
                <div className="md:w-3/5 flex flex-col h-full order-2 md:order-1">
                  <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-muted/50 border-b border-border/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <span className="text-sm font-mono font-semibold text-primary tracking-wider">vision.ts</span>
                    </div>
                    <div className="flex space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-foreground text-sm leading-relaxed space-y-4">
                      <TypewriterEffect
                        options={{
                          strings: [
"We envision AI-powered tools making web development accessible globally, empowering creators to bring ideas to life."
                          ],
                          autoStart: true,
                          loop: false,
                          delay: 20,
                        }}
                        className="[&_span]:text-foreground"
                        cursorClassName="animate-pulse text-primary"
                      />
                      <div className="pt-4 space-y-2">
                        <p className="text-primary font-medium">Focus:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Innovation</li>
                          <li>User Experience</li>
                          <li>Community</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border/20">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Shaping tomorrow's web today</p>
                          <p className="text-xs text-muted-foreground">Innovation at every step</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/5 relative overflow-hidden h-48 md:h-auto order-1 md:order-2">
                  <img 
                    src="/Vision.png" 
                    alt="Our Vision" 
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Individual Achievement Cards */}
        <div className="my-12 md:my-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative bg-card border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors duration-300"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        <Counter target={item.value} />
                        <span className="text-foreground">{item.suffix}</span>
                      </div>
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        {item.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.comment.replace('// ', '')}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/30">
                      <div className="text-xs text-muted-foreground/70">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        <span>Active</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-michroma font-bold mb-3">Meet the <span className="text-primary">Developers</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-mono text-sm">
              // The minds behind our AI-powered development platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
            {team.map((member, index) => {
              const initials = member.name.split(' ').map(n => n[0]).join('');
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-card border border-border/30 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Code Editor Header */}
                  <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/30">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {member.role.split(' ')[0].toLowerCase()}.tsx
                    </span>
                  </div>
                  
                  {/* Profile Section */}
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                      {/* Avatar with Code-like Background */}
                      <div className="relative mb-6">
                        <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-primary/30">
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to initials if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = 'data:image/svg+xml;base64,' + btoa(`
                                <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect width="96" height="96" rx="12" fill="%23f3f4f6"/>
                                  <text x="50%" y="50%" font-family="sans-serif" font-size="32" font-weight="bold" text-anchor="middle" dy=".3em" fill="%236b7280">${initials}</text>
                                </svg>
                              `);
                            }}
                          />
                        </div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-card"></div>
                      </div>
                      
                      {/* Name and Role */}
                      <h3 className="text-lg font-michroma font-bold text-foreground mb-1">{member.name}</h3>
                      <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-mono rounded-full mb-3">
                        {member.role}
                      </span>
                      
                      {/* Compact Comment Bio */}
                      <div className="w-full mt-3 text-left">
                        <div className="relative">
                          <div className="text-xs font-mono text-muted-foreground/80 flex items-start group">
                            <span className="text-primary mr-2">//</span>
                            <span className="text-foreground/90">
                              {member.bio}
                            </span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            <span className="text-[10px] px-1.5 py-0.5 bg-primary/5 text-primary rounded border border-primary/10">
                              {member.role}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 bg-green-500/5 text-green-500 rounded border border-green-500/10 inline-flex items-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                              Online
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Bar with Width Animation */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: '10%' }}
                      animate={{ 
                        width: ['10%', '90%', '10%']
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <CTASection 
          className="mt-4 sm:mt-8 md:mt-12"
          title="Join our growing community"
          description="Connect with like-minded developers, share your projects, and get the support you need to build amazing things."
          primaryButtonText="Join Community"
          primaryButtonHref="/contact"
          secondaryButtonText={null}
          statsText="Active community members"
          statsCount="50K+"
          hasImage={true}
          imageSrc="/aboutpage cta section.png"
          imageAlt="Community"
        />
      </div>
    </div>
  );
};

export default About;
