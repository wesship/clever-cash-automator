
import React from "react";
import { HeartIcon, GithubIcon, TwitterIcon, InstagramIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-border relative">
      <div className="absolute inset-0 bg-gradient-vibrant opacity-5"></div>
      <div className="container mx-auto px-4 py-6 md:py-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-purple-pink flex items-center justify-center card-3d-float">
                <span className="text-white font-semibold text-sm">AE</span>
              </div>
              <span className="text-lg font-semibold tracking-tight text-gradient">AutoEarn</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              Elegantly automate online tasks with an AI-powered platform designed for simplicity and performance.
            </p>
            <div className="flex items-center space-x-3">
              <a href="#" className="text-muted-foreground hover:text-vibrant-purple transition-colors transform hover:scale-110 duration-200">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-vibrant-blue transition-colors transform hover:scale-110 duration-200">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-vibrant-pink transition-colors transform hover:scale-110 duration-200">
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h3 className="text-sm font-medium mb-3 text-gradient">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform duration-200">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform duration-200">
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link to="/accounts" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform duration-200">
                    Account Management
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform duration-200">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3 text-gradient">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform duration-200">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/guides" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform duration-200">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform duration-200">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block transform duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-border flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AutoEarn. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-xs text-muted-foreground flex items-center">
              Made with <HeartIcon className="mx-1 text-vibrant-pink h-4 w-4 animate-pulse-slow" /> by the AutoEarn Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
