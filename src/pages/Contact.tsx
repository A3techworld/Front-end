import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Terminal, Send, CheckCircle } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import ReactGoogleReCaptcha from 'react-google-recaptcha';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA verification.');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xrbrgvzw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setRecaptchaToken(null);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setRecaptchaToken(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <PageHero
        title="Let's Talk About Your"
        highlightText="Next Project"
        description="Have questions? We're here to help you build something amazing."
        showDecoration={false}
      />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Terminal Form */}
          <motion.div 
            className="bg-card border border-border/50 rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Terminal Header */}
            <div className="bg-foreground/5 border-b border-border/30 p-3 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs font-mono text-foreground/70">contact-form.js</span>
              </div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6">
              <div className="mb-6">
                <p className="text-primary font-mono text-sm">// Complete the form below to send us a message</p>
              </div>
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-8"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">Thank you for reaching out. We'll get back to you soon!</p>
                    <Button
                      onClick={resetForm}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-sm h-10 px-6"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-primary font-mono text-sm">const</span>
                    <span className="text-foreground mx-1 font-mono text-sm">name</span>
                    <span className="text-muted-foreground font-mono text-sm">=</span>
                    <span className="text-amber-400 ml-1 font-mono text-sm">""</span>
                  </div>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="bg-background/50 border-border/50 focus:border-primary/50 text-foreground font-mono text-sm h-9"
                    required
                  />
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-primary font-mono text-sm">const</span>
                    <span className="text-foreground mx-1 font-mono text-sm">email</span>
                    <span className="text-muted-foreground font-mono text-sm">=</span>
                    <span className="text-amber-400 ml-1 font-mono text-sm">""</span>
                  </div>
                  <Input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="bg-background/50 border-border/50 focus:border-primary/50 text-foreground font-mono text-sm h-9"
                    required
                  />
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-primary font-mono text-sm">const</span>
                    <span className="text-foreground mx-1 font-mono text-sm">message</span>
                    <span className="text-muted-foreground font-mono text-sm">=</span>
                    <span className="text-amber-400 ml-1 font-mono text-sm">`...`</span>
                  </div>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    rows={4}
                    className="bg-background/50 border-border/50 focus:border-primary/50 text-foreground font-mono text-sm resize-none"
                    required
                  />
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <span className="text-primary font-mono text-sm">//</span>
                    <span className="text-foreground mx-1 font-mono text-sm">Complete</span>
                    <span className="text-muted-foreground font-mono text-sm">reCAPTCHA</span>
                  </div>
                  <div className="bg-background/50 border border-border/30 rounded p-2">
                    <ReactGoogleReCaptcha
                      sitekey="6LfpaxEsAAAAAB80oNcLmiuZTJkB-UgF5uMd5VVU"
                      onChange={handleRecaptchaChange}
                      onExpired={() => setRecaptchaToken(null)}
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-sm h-10 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>sendMessage()</span>
                      </>
                    )}
                  </Button>
                </div>
              </motion.form>
              )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="bg-card/80 border border-border/50 rounded-lg p-6 shadow-lg h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <Terminal className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-michroma font-bold">Get in Touch</h2>
            </div>
            
            <div className="space-y-4 font-mono text-sm">
              {/* Email Section */}
              <div className="bg-background/50 border border-border/30 p-3 rounded">
                <div className="text-primary">// Email Us</div>
                <div className="ml-4 mt-1 space-y-1">
                  <div className="text-foreground/80">
                    <span className="text-muted-foreground">const</span> support ={" "}
                    <a href="mailto:support@a3techworld.com" className="text-primary hover:underline">'support@a3techworld.com'</a>
                  </div>
                  {/* <div className="text-foreground/80">
                    <span className="text-muted-foreground">const</span> sales ={" "}
                    <a href="mailto:sales@a3techworld.com" className="text-primary hover:underline">'sales@a3techworld.com'</a>
                  </div> */}
                </div>
              </div>

              {/* Phone Section */}
              <div className="bg-background/50 border border-border/30 p-3 rounded">
                <div className="text-primary">// Call Us</div>
                <div className="ml-4 mt-1 space-y-1">
                  <div className="text-foreground/80">
                    <span className="text-muted-foreground">const</span> phone ={" "}
                    <a href="tel:12073068729" className="text-primary hover:underline">'+1 (207) 306-8729'</a>
                  </div>
                  <div className="text-muted-foreground text-xs flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                    Available: Mon-Fri 9am-6pm EST
                  </div>
                </div>
              </div>

              {/* Office Section */}
              <div className="bg-background/50 border border-border/30 p-3 rounded">
                <div className="text-primary">// Visit Us</div>
                <div className="ml-4 mt-1">
                  <div className="text-foreground/80">
                    <span className="text-muted-foreground">const</span> office = {"{"}
                    <div className="ml-4">
                      <div>street: <span className="text-primary">'114 E 2nd St, Los Angeles,'</span>,</div>
                      <div>city: <span className="text-primary">' CA 90012, United States'</span></div>
                    </div>
                    {"}"}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 group relative">
              <div className="flex items-center mb-3">
                <Terminal className="w-4 h-4 text-primary mr-2" />
                <h3 className="font-mono text-foreground/80 text-sm">// Our Location</h3>
              </div>
              <div className="relative rounded-lg overflow-hidden border border-border/30 h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-3 left-3 z-20">
                  <div className="bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded text-xs font-mono border border-border/30 shadow-sm">
                    <span className="text-primary">const</span> location = {
                    <div className="ml-4">
                      <div>lat: <span className="text-foreground">34.0507</span>,</div>
                      <div>lng: <span className="text-foreground">-118.2440</span></div>
                    </div>
                    };
                  </div>
                </div>
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.740664354411!2d-118.24658682524489!3d34.050522917822846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c64902e7f501%3A0x5441e6ddd9753e3!2s114%20E%202nd%20St%2C%20Los%20Angeles%2C%20CA%2090012%2C%20USA!5e0!3m2!1sen!2slk!4v1763458216129!5m2!1sen!2slk"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
