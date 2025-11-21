import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Loader2, Globe, Palette, Code, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { redirectToCheckout, STRIPE_PRICE_IDS } from '@/lib/stripe';
import { CTA } from '@/components/shared/CTA';
import { CTASection } from '@/components/shared/CTASection';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planName: string) => {
    setLoadingPlan(planName);
    
    try {
      // Get the price ID for the selected plan (convert to lowercase for object key)
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

      // Use real Stripe checkout with billing cycle
      await redirectToCheckout(priceId, isYearly);
    } catch (error) {
      console.error('Subscription error:', error);
      // Show error message to user
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to start checkout'}`);
    } finally {
      setLoadingPlan(null);
    }
  };
  
  // Billing toggle component
  const BillingToggle = ({ isYearly, setIsYearly }: { isYearly: boolean; setIsYearly: (value: boolean) => void }) => (
    <div className="flex items-center justify-center w-full">
      <div className="relative flex items-center bg-muted/50 rounded-full border border-border/30 w-auto">
        <button
          type="button"
          aria-pressed={!isYearly}
          onClick={() => setIsYearly(false)}
          className={`px-4 sm:px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
            !isYearly ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          aria-pressed={isYearly}
          onClick={() => setIsYearly(true)}
          className={`px-4 sm:px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
            isYearly ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <span className="whitespace-nowrap">
            Yearly <span className="text-primary">Save 60%</span>
          </span>
        </button>
      </div>
    </div>
  );
  
  // Feature pill component
  const FeaturePill = ({ icon: Icon, text }: { icon: any, text: string }) => (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 text-primary text-xs font-medium rounded-full border border-primary/10">
      <Icon className="w-3.5 h-3.5" />
      <span>{text}</span>
    </div>
  );

  // Hero Section
  const HeroSection = () => (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px 60px',
          backgroundRepeat: 'repeat'
        }} />
      </div>

      <div className="container mx-auto px-4 pt-32 sm:pt-36 py-28 md:py-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center">
              <span className="text-foreground">Invest in Your</span>{' '}
              <span className="text-primary">Website</span>{' '}
              <span className="text-foreground">Growth</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mt-4 rounded-full" />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
          >
            Choose the perfect plan for your business. No hidden fees, cancel anytime.
          </motion.p>
          
          <div className="mt-4">
            {/* Toggle removed from here as it's now below the hero section */}
          </div>
        </motion.div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-1/4 w-40 h-40 bg-primary/10 rounded-full mix-blend-multiply blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-secondary/10 rounded-full mix-blend-multiply blur-3xl opacity-20"></div>
      </div>
    </section>
  );

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 19,
      yearlyPrice: 91,
      features: [
        '5 Websites',
        'Basic AI Features',
        'Standard Templates',
        'Email Support',
        '10GB Storage',
        'SSL Certificate',
      ],
      highlighted: false,
    },
    {
      name: 'Pro',
      monthlyPrice: 49,
      yearlyPrice: 235,
      features: [
        'Unlimited Websites',
        'Advanced AI Features',
        'Premium Templates',
        'Priority Support',
        'Custom Domain',
        'Analytics Dashboard',
        '100GB Storage',
        'Advanced SEO Tools',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      monthlyPrice: 99,
      yearlyPrice: 475,
      features: [
        'Everything in Pro',
        'Dedicated Account Manager',
        'Custom Integrations',
        'White Label Solution',
        'SLA Guarantee',
        'Unlimited Storage',
        'Custom Development',
        'Training & Onboarding',
      ],
      highlighted: false,
    },
  ];

  // Feature comparison data
  const features = [
    { name: 'Websites', icon: <Globe className="h-5 w-5 text-blue-500" /> },
    { name: 'AI Features', icon: <Zap className="h-5 w-5 text-yellow-500" /> },
    { name: 'Templates', icon: <Palette className="h-5 w-5 text-purple-500" /> },
    { name: 'Storage', icon: <Code className="h-5 w-5 text-green-500" /> },
    { name: 'Support', icon: <Shield className="h-5 w-5 text-red-500" /> },
    { name: 'Custom Domain', icon: <Star className="h-5 w-5 text-pink-500" /> },
  ];

  const getFeatureValue = (planName: string, featureName: string) => {
    const plan = plans.find(p => p.name === planName);
    if (!plan) return '';
    
    switch (featureName) {
      case 'Websites':
        return plan.features.find(f => f.includes('Website')) || '1 Website';
      case 'AI Features':
        return plan.features.find(f => f.includes('AI')) || 'Basic';
      case 'Templates':
        return plan.features.find(f => f.includes('Template')) || 'Standard';
      case 'Storage':
        return plan.features.find(f => f.includes('GB') || f.includes('Storage')) || '10GB';
      case 'Support':
        if (plan.features.some(f => f.includes('Dedicated'))) return 'Dedicated';
        if (plan.features.some(f => f.includes('Priority'))) return 'Priority';
        return 'Email';
      case 'Custom Domain':
        return plan.features.includes('Custom Domain') ? '✓' : '✗';
      default:
        return '';
    }
  };

  // Calculate prices based on billing cycle
  const getPrice = (plan: typeof plans[0]) => {
    if (!plan.monthlyPrice) return null;
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  };

  // Calculate savings for yearly billing
  const getSavings = (plan: typeof plans[0]) => {
    if (!plan.monthlyPrice || !isYearly) return null;
    return (plan.monthlyPrice * 12) - plan.yearlyPrice;
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="container mx-auto px-4 pb-12 -mt-16">
        {/* Billing Toggle - Moved below Hero Section */}
        <div className="flex justify-center mb-8">
          <BillingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 border-2 transition-all duration-300 ${
                plan.highlighted 
                  ? 'border-primary/50 bg-card shadow-lg scale-[1.02]' 
                  : 'border-border hover:border-primary/30 hover:shadow-md'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-lg rounded-tr-lg">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground">
                  {plan.monthlyPrice ? (
                    <>
                      <span className="text-4xl font-bold text-foreground">
                        ${getPrice(plan)}
                      </span>
                      <span className="text-muted-foreground">
                        /{isYearly ? 'year' : 'month'}
                        {isYearly && plan.monthlyPrice && (
                          <span className="block text-sm text-green-500">
                            Save ${getSavings(plan)} annually
                          </span>
                        )}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">Custom Pricing</span>
                  )}
                </p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.slice(0, 5).map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
                {plan.features.length > 5 && (
                  <li className="text-sm text-muted-foreground">+ {plan.features.length - 5} more features</li>
                )}
              </ul>
              
              <Button
                className={`w-full py-6 text-base ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90'
                    : 'bg-secondary hover:bg-secondary/90'
                }`}
                size="lg"
                onClick={() => handleSubscribe(plan.name)}
                disabled={loadingPlan === plan.name}
              >
                {loadingPlan === plan.name ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Get Started
                    {plan.highlighted && <Zap className="ml-2 h-4 w-4" />}
                  </>
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-6xl mx-auto bg-card rounded-2xl p-8 border border-border">
          <h2 className="text-2xl font-michroma font-bold mb-3 text-center"><span className="text-primary">Feature</span> Comparison</h2>
          
          <div className="bg-card rounded-lg border border-border overflow-hidden card-elevated">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-card/50">
                    <th className="text-left p-6 font-michroma">Features</th>
                    <th className="text-center p-6 font-michroma">Starter</th>
                    <th className="text-center p-6 font-michroma bg-primary/10">Pro</th>
                    <th className="text-center p-6 font-michroma">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Number of Websites', starter: '5', pro: 'Unlimited', enterprise: 'Unlimited' },
                    { feature: 'AI Website Generation', starter: true, pro: true, enterprise: true },
                    { feature: 'Basic Templates', starter: true, pro: true, enterprise: true },
                    { feature: 'Premium Templates', starter: false, pro: true, enterprise: true },
                    { feature: 'Custom Templates', starter: false, pro: false, enterprise: true },
                    { feature: 'Storage', starter: '10GB', pro: '100GB', enterprise: 'Unlimited' },
                    { feature: 'Custom Domain', starter: false, pro: true, enterprise: true },
                    { feature: 'SSL Certificate', starter: true, pro: true, enterprise: true },
                    { feature: 'SEO Tools', starter: 'Basic', pro: 'Advanced', enterprise: 'Advanced' },
                    { feature: 'Analytics Dashboard', starter: false, pro: true, enterprise: true },
                    { feature: 'Priority Support', starter: false, pro: true, enterprise: true },
                    { feature: 'Dedicated Account Manager', starter: false, pro: false, enterprise: true },
                    { feature: 'White Label Solution', starter: false, pro: false, enterprise: true },
                    { feature: 'Custom Integrations', starter: false, pro: false, enterprise: true },
                    { feature: 'SLA Guarantee', starter: false, pro: false, enterprise: true },
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-border hover:bg-card/50 transition-colors">
                      <td className="p-6 font-semibold">{row.feature}</td>
                      <td className="p-6 text-center">
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? (
                            <Check className="w-5 h-5 text-primary mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )
                        ) : (
                          <span className="text-muted-foreground">{row.starter}</span>
                        )}
                      </td>
                      <td className="p-6 text-center bg-primary/5">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? (
                            <Check className="w-5 h-5 text-primary mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )
                        ) : (
                          <span className="text-primary font-semibold">{row.pro}</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? (
                            <Check className="w-5 h-5 text-primary mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )
                        ) : (
                          <span className="text-muted-foreground">{row.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <CTASection
        title="Ready to find your perfect plan?"
        description="Join thousands of businesses that trust our platform. Start with a free trial or talk to our sales team to find the best solution for your needs."
        primaryButtonText="Start Free Trial"
        primaryButtonHref="/contact"
        secondaryButtonText={null}
        statsText="Businesses growing with us"
        statsCount="10K+"
        className="mt-0"
        hasImage={true}
        imageSrc="/pricingpage cta section.png"
        imageAlt="Pricing Plans"
      />
    </div>
  );
};

export default Pricing;
