import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Code2, Terminal, Cpu, Zap, Github, Twitter, Linkedin, Mail, GitBranch, X, Maximize2, Minus, ChevronRight, Facebook, Youtube, Instagram, Check } from 'lucide-react';
import F6sIcon from '/F6s.svg';
import QuoraIcon from '/icons8-quora.svg';

const Footer = () => {
  const [isSubscribed, setIsSubscribed] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('newsletterSubscribed');
    }
    return false;
  });

  // Listen for storage changes to update the subscription state
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', () => {
      setIsSubscribed(!!localStorage.getItem('newsletterSubscribed'));
    });
  }
  const currentYear = new Date().getFullYear();
  
  // Code snippet for the footer
  const codeSnippet = `// A3TechWorld - Modern Web Solutions
const techStack = [
  { name: 'React', version: '18.2.0' },
  { name: 'TypeScript', version: '5.0.0' },
  { name: 'Tailwind CSS', version: '3.3.0' },
  { name: 'Node.js', version: '20.0.0' },
];

function buildFuture() {
  return {
    innovation: true,
    performance: 'optimized',
    scalability: 'unlimited',
  };
}`;

  return (
    <footer className="relative overflow-hidden bg-background text-foreground/90 border-t border-border font-mono">
      {/* Editor Tabs */}
      <div className="bg-card border-b border-border/50">
        <div className="container mx-auto px-4 flex items-center overflow-x-auto">
          <div className="flex space-x-1 py-2">
            <div className="px-4 py-2 text-xs rounded-t-md flex items-center bg-background text-primary border-t-2 border-primary">
              <Code2 className="w-3 h-3 mr-2" />
              footer.tsx
              <X className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100" />
            </div>
          </div>
          <div className="ml-auto flex space-x-2">
            <button className="p-1 text-gray-500 hover:text-gray-300">
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 text-gray-500 hover:text-gray-300">
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 text-gray-500 hover:text-red-400">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Code Editor with Logo */}
            <div className="lg:col-span-5 bg-card rounded-lg border border-border overflow-hidden flex flex-col">
              {/* Logo and Title */}
              <div className="px-6 pt-6 pb-2">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Link to="/" className="block hover:opacity-80 transition-opacity duration-200">
                      <div className="w-30 h-16 flex items-center justify-center">
                        <img 
                          src="/Logo.svg" 
                          alt="A3TechWorld Logo" 
                          className="h-28 w-auto"
                        />
                      </div>
                    </Link>
                  </div>
                  
                </div>
              </div>
              
              <div className="bg-background/80 px-4 py-2 border-t border-border flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-xs text-muted-foreground">terminal: bash</div>
              </div>
              <div className="p-4 pt-2 font-mono text-sm text-muted-foreground">
                <div className="text-foreground/80 mb-3">
                  Build your website in minutes with AI guidance, saving time and simplifying your workflow.
                </div>
                <div className="mt-4"># Start building something amazing!</div>
                <div className="mt-6 flex space-x-4 text-sm">
                  <div className="text-primary flex items-center">
                    <Github className="w-4 h-4 mr-1" /> GitHub
                  </div>
                  <div className="text-primary flex items-center">
                    <span className="text-primary/80 mr-1">$</span> npm install
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <div className="bg-card p-4 rounded-lg border border-border h-full">
                <h3 className="text-sm text-primary mb-4 flex items-center">
                  <span className="text-primary/60 mr-2">//</span> Navigation
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'Features', path: '/features' },
                    { name: 'About', path: '/about' },
                    { name: 'Pricing', path: '/pricing' },
                    { name: 'Dashboard', path: 'https://app.a3techworld.com' },
                    { name: 'Contact', path: '/contact' },
                  ].map((item, index) => (
                    <li key={item.name}>
                      { item.name === 'Dashboard' ? (
                        <a 
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center text-muted-foreground hover:text-primary transition-colors text-sm"
                        >
                          <span className="text-primary/60 mr-2">{'->'}</span>
                          <span className="font-mono">{item.name}</span>
                          <span className="ml-auto text-xs text-muted-foreground/50 group-hover:text-muted-foreground">[{index + 1}]</span>
                        </a>
                      ) : (
                        <Link 
                          to={item.path}
                          className="group flex items-center text-muted-foreground hover:text-primary transition-colors text-sm"
                        >
                          <span className="text-primary/60 mr-2">{'->'}</span>
                          <span className="font-mono">{item.name}</span>
                          <span className="ml-auto text-xs text-muted-foreground/50 group-hover:text-muted-foreground">[{index + 1}]</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-2">
              <div className="bg-card p-6 rounded-lg border border-border h-full">
                <h3 className="text-sm text-primary mb-4 flex items-center">
                  <span className="text-primary/60 mr-2">//</span> Newsletter
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Subscribe to get updates, news and product offers.
                </p>
                {isSubscribed ? (
                  <div className="p-4 bg-primary/5 border border-border rounded-md text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-foreground font-mono">Thanks for subscribing!</p>
                  </div>
                ) : (
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const email = formData.get('email') as string;
                    
                    try {
                      const response = await fetch('https://formspree.io/f/xanayzyq', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email }),
                      });

                      if (response.ok) {
                        // Store in localStorage to prevent re-submission
                        localStorage.setItem('newsletterSubscribed', 'true');
                        window.dispatchEvent(new Event('storage')); // Trigger re-render
                      } else {
                        throw new Error('Subscription failed');
                      }
                    } catch (error) {
                      console.error('Error subscribing:', error);
                      alert('Failed to subscribe. Please try again later.');
                    }
                  }} className="space-y-3">
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 text-sm bg-background border border-border rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Subscribe</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Social & Contact */}
            <div className="lg:col-span-3">
              <div className="bg-card p-4 rounded-lg border border-border h-full">
                <h3 className="text-sm text-primary mb-4 flex items-center">
                  <span className="text-primary/60 mr-2">//</span> Connect With Us
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-background/50 rounded border border-border">
                    <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Email us</div>
                      <a href="mailto:support@a3techworld.com" className="text-sm text-primary hover:underline">support@a3techworld.com</a>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {[
                      { icon: Facebook, label: 'Facebook', url: 'https://web.facebook.com/A3TechWorld/' },
                      { icon: Youtube, label: 'YouTube', url: 'https://www.youtube.com/@A3TechWorld' },
                      { icon: Twitter, label: 'Twitter', url: 'https://x.com/A3_TechWorld' },
                      { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/company/a3-techworld/' },
                      { 
                        icon: () => <img src={F6sIcon} alt="F6S" className="w-4 h-4 mb-1 group-hover:opacity-80 transition-opacity filter grayscale" />, 
                        label: 'F6S', 
                        url: 'https://www.f6s.com/a3-techworld' 
                      },
                      { 
                        icon: () => <img src={QuoraIcon} alt="Quora" className="w-5 h-5 mb-1 group-hover:opacity-80 transition-opacity filter grayscale" />, 
                        label: 'Quora', 
                        url: 'https://www.quora.com/profile/A3-TechWorld' 
                      }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded border border-border hover:border-primary/30 hover:bg-primary/5 flex flex-col items-center justify-center transition-colors group"
                        aria-label={social.label}
                      >
                        {typeof social.icon === 'function' ? (
                          social.icon()
                        ) : (
                          <social.icon className="w-4 h-4 mb-1 text-foreground/70 group-hover:text-primary transition-colors" />
                        )}
                        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-6">
                <div className="text-xs text-muted-foreground font-mono">
                  <span className="text-primary">$</span> Running on A3TechWorld v2.0.0
                </div>
                <div className="hidden md:flex items-center text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>
                  <span>Status: Operational</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono">
                  <span className="text-primary/60">//</span> Privacy
                </Link>
                <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono">
                  <span className="text-primary/60">//</span> Terms
                </Link>
                <span className="text-xs text-muted-foreground font-mono">
                  &copy; {currentYear} A3TechWorld
                </span>
              </div>
            </div>
            
            {/* Status Bar */}
            <div className="mt-4 bg-card border border-border rounded text-xs text-muted-foreground p-2 font-mono flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span>main</span>
                <span className="text-green-500">✓</span>
                <span>TypeScript</span>
                <span>UTF-8</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>Ln 1, Col 1</span>
                <span>Spaces: 2</span>
                <span>UTF-8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
