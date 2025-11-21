import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [currentBadgeText, setCurrentBadgeText] = useState(0);
  
  const badgeTexts = [
    "FAQ",
    "Common Questions",
    "Need Help?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBadgeText((prev) => (prev + 1) % badgeTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const faqs = [
    {
      question: "How do I get started with your platform?",
      answer: "Getting started is easy! Simply sign up for a free account, choose a template, and follow our step-by-step guide to customize it to your needs. No coding required!"
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer 24/7 email support for all plans, with priority support for premium users. We also have an extensive knowledge base and video tutorials to help you get the most out of our platform."
    },
    {
      question: "Can I use my own domain name?",
      answer: "Absolutely! You can connect your existing domain or purchase a new one directly through our platform. We provide simple DNS management tools to make the process seamless."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial with full access to all features. No credit card is required to start your trial."
    },
    {
      question: "How does billing work?",
      answer: "We offer monthly and annual billing cycles. You can upgrade, downgrade, or cancel your plan at any time. All plans come with a 30-day money-back guarantee."
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background"></div>
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl">
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
                {badgeTexts[currentBadgeText]}
              </span>
              <span className="font-mono text-xs text-primary/80">//</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-michroma font-bold mb-4">
           Clarifying the Code <span className="text-primary">Behind AI Websites</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our platform
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <button
                className={`w-full px-6 py-5 text-left flex justify-between items-center ${
                  activeIndex === index ? 'bg-muted/30' : 'hover:bg-muted/10'
                } transition-colors`}
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-primary font-bold text-lg">{index + 1}.</span>
                  <span className="font-semibold text-foreground text-lg text-left">
                    {faq.question}
                  </span>
                </div>
                <motion.span
                  className="text-muted-foreground"
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.span>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
