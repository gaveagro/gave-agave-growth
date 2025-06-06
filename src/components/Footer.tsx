
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=40&h=40&fit=crop&crop=center" 
                alt="Gavé Agro"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="ml-2 text-xl font-bold">Gavé Agro</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Technology-driven sustainable agave investment delivering superior returns while regenerating land and supporting communities.
            </p>
            <div className="space-y-2 text-sm">
              <p>San Luis Potosí, México</p>
              <p>contact@gaveagro.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Investment</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#how-it-works" className="text-primary-foreground/80 hover:text-primary-foreground">How it Works</a></li>
              <li><a href="#impact" className="text-primary-foreground/80 hover:text-primary-foreground">Impact</a></li>
              <li><a href="#faq" className="text-primary-foreground/80 hover:text-primary-foreground">FAQ</a></li>
              <li><a href="https://dashboard.gaveagro.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground">Dashboard</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/blog" className="text-primary-foreground/80 hover:text-primary-foreground">Blog</a></li>
              <li><a href="/reports" className="text-primary-foreground/80 hover:text-primary-foreground">Reports</a></li>
              <li><a href="/sustainability" className="text-primary-foreground/80 hover:text-primary-foreground">Sustainability</a></li>
              <li><a href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Get the latest investment opportunities and impact reports.
            </p>
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" size="sm" className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/80 text-sm">
              © 2024 Gavé Agro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground text-sm">Privacy Policy</a>
              <a href="/terms" className="text-primary-foreground/80 hover:text-primary-foreground text-sm">Terms of Service</a>
              <a href="/legal" className="text-primary-foreground/80 hover:text-primary-foreground text-sm">Legal</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
