import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Templates = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Business', 'Startup', 'Portfolio', 'SaaS'];
  
  const templates = [
    { name: 'Corporate Elite', category: 'Business', color: 'from-blue-500/20 to-blue-600/20' },
    { name: 'Startup Launch', category: 'Startup', color: 'from-purple-500/20 to-purple-600/20' },
    { name: 'Designer Portfolio', category: 'Portfolio', color: 'from-pink-500/20 to-pink-600/20' },
    { name: 'SaaS Dashboard', category: 'SaaS', color: 'from-green-500/20 to-green-600/20' },
    { name: 'Business Pro', category: 'Business', color: 'from-orange-500/20 to-orange-600/20' },
    { name: 'Tech Startup', category: 'Startup', color: 'from-cyan-500/20 to-cyan-600/20' },
    { name: 'Creative Studio', category: 'Portfolio', color: 'from-red-500/20 to-red-600/20' },
    { name: 'Platform Hub', category: 'SaaS', color: 'from-indigo-500/20 to-indigo-600/20' },
    { name: 'Enterprise', category: 'Business', color: 'from-yellow-500/20 to-yellow-600/20' },
  ];

  const filteredTemplates = activeFilter === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeFilter);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-michroma font-bold mb-6">
            Choose from Modern, Responsive Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every template is fully customizable and optimized for all devices
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {filters.map((filter) => (
            <Button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              variant={activeFilter === filter ? 'default' : 'outline'}
              className={`${
                activeFilter === filter 
                  ? 'gradient-primary glow-border' 
                  : 'border-border hover:border-primary'
              } transition-all duration-300`}
            >
              {filter}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${template.color} rounded-2xl p-8 h-64 flex items-center justify-center relative overflow-hidden group border border-border/30`}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl font-bold text-center text-foreground group-hover:text-white relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {template.name}
                </h3>
                <Button 
                  variant="outline" 
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 bg-white/90 hover:bg-white"
                >
                  Preview Template
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
