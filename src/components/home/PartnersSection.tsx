import { motion } from 'framer-motion';

const PartnersSection = () => {
  const partners = [
    'TechCorp', 'InnovateCo', 'DigitalPro', 'CloudNext', 
    'DataFlow', 'SmartSys', 'WebGenius', 'AppMaster'
  ];

  return (
    <section className="py-20 px-4 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-michroma font-bold mb-4">
            Trusted by Industry Leaders
          </h2>
        </motion.div>

        <div className="relative">
          <motion.div
            className="flex gap-12"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-card border border-border rounded-lg px-12 py-6 min-w-[200px] flex items-center justify-center"
              >
                <span className="text-xl font-michroma font-bold text-muted-foreground">
                  {partner}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
