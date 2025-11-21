import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  highlightText: string;
  description?: string;
  highlightColor?: string;
  showDecoration?: boolean;
  titleParts?: {
    before?: string;
    highlight: string;
    after?: string;
  };
}

export const PageHero = ({
  title,
  highlightText,
  description,
  highlightColor = 'text-primary',
  showDecoration = true,
  titleParts,
}: PageHeroProps) => {
  return (
    <div className="relative">

      <div className="container mx-auto px-4 pt-32 pb-8 md:pt-40 md:pb-12">
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
              {titleParts ? (
                <>
                  {titleParts.before && <span className="text-foreground">{titleParts.before}{' '}</span>}
                  <span className={highlightColor}>{titleParts.highlight}</span>
                  {titleParts.after && <span className="text-foreground">{' '}{titleParts.after}</span>}
                </>
              ) : (
                <>
                  <span className="text-foreground">{title}{' '}</span>
                  <span className={highlightColor}>{highlightText}</span>
                </>
              )}
            </h1>
            <div className={`w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mt-4 rounded-full`} />
          </motion.div>
          
          {description && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
        
        {/* Decorative Elements */}
        {showDecoration && (
          <>
            <div className="absolute top-20 left-1/4 w-40 h-40 bg-primary/10 rounded-full mix-blend-multiply blur-3xl opacity-20"></div>
            <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-secondary/10 rounded-full mix-blend-multiply blur-3xl opacity-20"></div>
          </>
        )}
      </div>
    </div>
  );
};
