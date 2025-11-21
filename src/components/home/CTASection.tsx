import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  const featureImage = '/homepage cta section.png';

  return (
    <section className="relative py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Content */}
            <div className="p-10 md:p-12 lg:p-16 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Ready to transform your business?
                </h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Join over 10,000 businesses already growing with our platform. 
                  Start your journey today with a 14-day free trial.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90" asChild>
                      <a href="/contact">Get Started Free</a>
                    </Button>
                  </motion.div>
                </div>

                <div className="mt-8 flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    {[
                      { name: 'Aya Nakamura', image: '/Aya Nakamura.png' },
                      { name: 'Dante Alvarez', image: '/Dante Alvarez.png' },
                      { name: 'Sora Lin', image: '/Sora Lin.png' }
                    ].map((user, index) => (
                      <div key={index} className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-background z-0">
                        <img 
                          src={user.image} 
                          alt={user.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
                          }}
                        />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-gray-900 border-2 border-primary flex items-center justify-center relative z-10 -ml-1">
                      <span className="text-[10px] font-semibold text-white">10K+</span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">Trusted by businesses worldwide</span>
                </div>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div 
              className="relative h-64 lg:h-auto bg-muted"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
              <img 
                src={featureImage}
                alt="A3TechWorld Platform"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
