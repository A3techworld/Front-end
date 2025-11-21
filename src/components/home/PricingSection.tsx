import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Zap, Star, Shield, Code, Palette, Globe, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState, ReactNode, isValidElement } from 'react';
import { createCheckoutSession, STRIPE_PRICE_IDS, mockCheckout, redirectToCheckout } from '@/lib/stripe';

// Code background pattern component
const CodeBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
    <div className="absolute inset-0 grid grid-cols-12 gap-4">
      {[...Array(24)].map((_, i) => (
        <div key={i} className="h-full border-r border-foreground/5"></div>
      ))}
    </div>
    <div className="absolute inset-0 grid grid-rows-12 gap-4">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="w-full border-b border-foreground/5"></div>
      ))}
    </div>
  </div>
);

// Code line component for features
const CodeFeature = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={cn("flex items-start font-mono text-sm group", className)}>
    <span className="text-foreground/30 mr-2 select-none">$</span>
    <div className="flex-1">
      <span className="text-foreground/80">{children}</span>
      <span className="inline-block w-2 h-4 ml-1 bg-primary/20 animate-pulse"></span>
    </div>
  </div>
);

const PricingSection = () => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planName: string) => {
    setLoadingPlan(planName);
    
    try {
      // Get the price ID for the selected plan
      let priceId: string;
      switch (planName.toLowerCase()) {
        case 'starter':
          priceId = STRIPE_PRICE_IDS.starter;
          break;
        case 'pro':
          priceId = STRIPE_PRICE_IDS.pro;
          break;
        case 'enterprise':
          priceId = STRIPE_PRICE_IDS.enterprise;
          break;
        default:
          throw new Error('Invalid plan selected');
      }

      // Use real Stripe checkout
      await redirectToCheckout(priceId);
    } catch (error) {
      console.error('Subscription error:', error);
      // Show error message to user
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to start checkout'}`);
    } finally {
      setLoadingPlan(null);
    }
  };
  const [badgeText, setBadgeText] = useState('Pricing Plans');
  const badgeVariants = ['Pricing Plans', 'Simple Pricing', 'Choose Your Plan'];
  
  // Animation variants for price numbers
  const priceVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        type: 'spring',
        stiffness: 100
      }
    })
  };
  
  useEffect(() => {
    const badgeInterval = setInterval(() => {
      setBadgeText(prev => {
        const currentIndex = badgeVariants.indexOf(prev);
        return badgeVariants[(currentIndex + 1) % badgeVariants.length];
      });
    }, 3000);
    
    return () => clearInterval(badgeInterval);
  }, []);
  interface Plan {
    name: string;
    price: string;
    period: string;
    features: { text: string; icon: ReactNode }[];
    highlighted: boolean;
    badge: string;
    icon: ReactNode;
  }

  const plans: Plan[] = [
    {
      name: 'Starter',
      price: '$19',
      period: '',
      features: [
        { text: '5 Websites', icon: <Globe className="w-4 h-4" /> },
        { text: 'Basic AI Features', icon: <Zap className="w-4 h-4" /> },
        { text: 'Standard Templates', icon: <Code className="w-4 h-4" /> },
        { text: 'Email Support', icon: <Shield className="w-4 h-4" /> },
      ],
      highlighted: false,
      badge: 'Starter',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      name: 'Pro',
      price: '$49',
      period: '',
      features: [
        { text: 'Unlimited Websites', icon: <Globe className="w-4 h-4" /> },
        { text: 'Advanced AI Features', icon: <Zap className="w-4 h-4" /> },
        { text: 'Premium Templates', icon: <Code className="w-4 h-4" /> },
        { text: 'Priority Support', icon: <Shield className="w-4 h-4" /> },
        { text: 'Custom Domain', icon: <Globe className="w-4 h-4" /> },
        { text: 'Analytics Dashboard', icon: <Palette className="w-4 h-4" /> },
      ],
      highlighted: true,
      badge: 'Most Popular',
      icon: <Star className="w-5 h-5" />,
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '',
      features: [
        { text: 'Everything in Pro', icon: <Check className="w-4 h-4" /> },
        { text: 'Dedicated Account Manager', icon: <Shield className="w-4 h-4" /> },
        { text: 'Custom Integrations', icon: <Code className="w-4 h-4" /> },
        { text: 'White Label Solution', icon: <Palette className="w-4 h-4" /> },
        { text: 'SLA Guarantee', icon: <Shield className="w-4 h-4" /> },
      ],
      highlighted: false,
      badge: 'Best Value',
      icon: <Shield className="w-5 h-5" />,
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0,transparent_70%)] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background/100"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
          <h2 className="text-4xl md:text-5xl font-michroma font-bold mb-4">
            Unlock Your <span className="text-primary">Website Potential</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan that fits your needs. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
          <AnimatePresence>
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={cn(
                  "relative flex flex-col h-full rounded-lg border border-foreground/10 bg-[#0f0f0f] overflow-hidden transition-all duration-300 group",
                  {
                    "border-primary/30 shadow-lg shadow-primary/10 ring-1 ring-primary/20": plan.highlighted,
                    "hover:border-primary/20 hover:ring-1 hover:ring-primary/10": !plan.highlighted
                  }
                )}
              >
                <div className="absolute inset-0 -z-10">
                  <CodeBackground />
                  {plan.highlighted && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                  )}
                </div>
                
                <div className="p-4 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        plan.highlighted 
                          ? "bg-primary/10 text-primary" 
                          : "bg-foreground/5 text-foreground/60"
                      )}>
                        {isValidElement(plan.icon) ? plan.icon : null}
                      </div>
                      <div>
                        <h3 className="text-xl font-mono font-bold text-foreground">
                          {plan.name}
                        </h3>
                        {plan.highlighted && (
                          <div className="mt-1 flex items-center">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                              {plan.badge}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        <motion.span 
                          className="text-4xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                        >
                          {plan.price}
                        </motion.span>
                        {plan.period && (
                          <span className="ml-1 text-sm font-normal text-muted-foreground">
                            {plan.period}
                          </span>
                        )}
                      </motion.div>
                      <div className="text-xs text-muted-foreground font-mono">per user/month</div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
                    <div className="space-y-4 pl-6 py-2">
                      {plan.features.map((feature, i) => (
                        <CodeFeature key={i}>
                          <span className="text-primary/80">//</span> {feature.text}
                        </CodeFeature>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 pt-0 mt-auto">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-200 group-hover:duration-200"></div>
                    <Button 
                      variant={plan.highlighted ? 'default' : 'outline'}
                      size="lg"
                      onClick={() => handleSubscribe(plan.name)}
                      disabled={loadingPlan === plan.name}
                      className={cn(
                        "relative w-full font-mono font-medium transition-all duration-300 border-foreground/10",
                        plan.highlighted 
                          ? "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg shadow-primary/20"
                          : "bg-background/80 backdrop-blur-sm hover:bg-foreground/5 hover:border-foreground/20"
                      )}
                    >
                      {loadingPlan === plan.name ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          {plan.name === 'Enterprise' ? 'Get Enterprise' : 'Get Started'}
                          <ChevronRight className={cn(
                            "ml-2 h-4 w-4 transition-transform duration-300",
                            plan.highlighted ? "group-hover:translate-x-1" : "group-hover:translate-x-0.5"
                          )} />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="mt-20 relative">
          <div className="absolute inset-x-0 -bottom-6 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
