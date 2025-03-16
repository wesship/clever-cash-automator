
import React from "react";
import { GitHubLogoIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-semibold text-sm">AE</span>
              </div>
              <span className="text-lg font-semibold tracking-tight">AutoEarn</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              Elegantly automate online tasks with an AI-powered platform designed for simplicity and performance.
            </p>
            <div className="flex items-center space-x-3">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <GitHubLogoIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h3 className="text-sm font-medium mb-3">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors">
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link to="/accounts" className="text-muted-foreground hover:text-foreground transition-colors">
                    Account Management
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="text-muted-foreground hover:text-foreground transition-colors">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/guides" className="text-muted-foreground hover:text-foreground transition-colors">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
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
              Made with <HeartFilledIcon className="mx-1 text-red-500" /> by the AutoEarn Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
