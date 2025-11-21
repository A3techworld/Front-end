import { useState, useEffect } from 'react';
import { X, Cookie, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type CookieType = 'necessary' | 'analytics' | 'marketing' | 'preferences';

type CookiePreferences = {
  [key in CookieType]: boolean;
};

export const CookiesBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cookies, setCookies] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  // Load saved preferences on component mount
  useEffect(() => {
    const loadPreferences = () => {
      try {
        const saved = localStorage.getItem('cookieConsent');
        if (saved) {
          const parsed = JSON.parse(saved) as CookiePreferences;
          setCookies(parsed);
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } catch (error) {
        console.error('Error loading cookie preferences:', error);
        setIsVisible(true);
      }
    };

    // Small delay for better UX
    const timer = setTimeout(loadPreferences, 1000);
    return () => clearTimeout(timer);
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem('cookieConsent', JSON.stringify(prefs));
      setCookies(prefs);
    } catch (error) {
      console.error('Error saving cookie preferences:', error);
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    savePreferences(allAccepted);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    savePreferences(cookies);
    setIsOpen(false);
    setIsVisible(false);
  };

  const toggleCookie = (type: CookieType) => {
    if (type === 'necessary') return; // Prevent toggling necessary cookies
    setCookies(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!isVisible) {
    return (
      <div 
        onClick={() => setIsVisible(true)}
        className="fixed left-4 bottom-4 z-50 cursor-pointer group"
        aria-label="Cookie settings"
      >
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center group-hover:bg-primary transition-colors shadow-xl ring-2 ring-primary/30">
            <Cookie className="w-6 h-6 text-white" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-primary text-xs text-white items-center justify-center">
              !
            </span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto max-w-md z-50">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 font-mono">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <Cookie className="w-5 h-5 text-primary" />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-foreground">We value your privacy</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              We use cookies to enhance your browsing experience and analyze our traffic.
            </p>
            <div className="mt-3 flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={handleAcceptAll}
                size="sm"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Accept All
              </Button>
              <Button 
                onClick={() => setIsOpen(true)}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
              >
                <Settings className="w-3.5 h-3.5 mr-1.5" />
                Preferences
              </Button>
              <Button 
                onClick={() => setIsVisible(false)}
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-foreground"
                aria-label="Close cookie banner"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-mono flex items-center">
              <Settings className="w-5 h-5 mr-2 text-primary" />
              Cookie Preferences
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Manage your cookie preferences. You can change these settings at any time.
            </p>
            
            <div className="space-y-3">
              {(['necessary', 'analytics', 'marketing', 'preferences'] as CookieType[]).map((type) => (
                <div key={type} className="flex items-center justify-between p-3 bg-background/50 rounded-md border border-border">
                  <div>
                    <h4 className="text-sm font-medium text-foreground capitalize">
                      {type}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {type === 'necessary' && 'Essential for the website to function'}
                      {type === 'analytics' && 'Help us improve our website'}
                      {type === 'marketing' && 'Personalized ads and content'}
                      {type === 'preferences' && 'Remember your settings'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={cookies[type]} 
                      onChange={() => toggleCookie(type)}
                      disabled={type === 'necessary'}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsOpen(false)}
              className="font-mono"
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={handleSavePreferences}
              className="font-mono bg-primary hover:bg-primary/90"
            >
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
