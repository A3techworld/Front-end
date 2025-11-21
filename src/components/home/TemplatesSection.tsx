import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const TemplatesSection = () => {
  const templates = [
    { name: 'Business Pro', category: 'Business', color: 'from-blue-500/20 to-blue-600/20' },
    { name: 'Tech Startup', category: 'Startup', color: 'from-purple-500/20 to-purple-600/20' },
    { name: 'Creative Portfolio', category: 'Portfolio', color: 'from-pink-500/20 to-pink-600/20' },
    { name: 'SaaS Platform', category: 'SaaS', color: 'from-green-500/20 to-green-600/20' },
    { name: 'E-Commerce', category: 'Business', color: 'from-orange-500/20 to-orange-600/20' },
    { name: 'Agency', category: 'Business', color: 'from-cyan-500/20 to-cyan-600/20' },
  ];

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-michroma font-bold mb-4">
            Beautiful Templates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our collection of professionally designed templates
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`relative bg-gradient-to-br ${template.color} rounded-xl p-8 h-72 flex flex-col justify-between border border-border overflow-hidden`}>
                <div className="relative z-10">
                  <span className="text-xs font-nunito font-semibold text-primary bg-primary/20 px-3 py-1.5 rounded-full">
                    {template.category}
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-michroma font-bold mb-2 text-gradient">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">Modern & Responsive Design</p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-semibold text-primary">Preview Template →</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button size="lg" className="gradient-primary text-white font-semibold glow-border shadow-lg">
            View All Templates
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TemplatesSection;
