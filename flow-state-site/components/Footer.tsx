'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-carbon border-t border-neon/20 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-7 h-7">
                  {/* Outer glow ring */}
                  <circle cx="18" cy="18" r="16" fill="none" stroke="url(#footerNodeGlow)" strokeWidth="1" opacity="0.3" />
                  
                  {/* Connection lines */}
                  <line x1="18" y1="18" x2="4" y2="8" stroke="#00FF88" strokeWidth="1" opacity="0.5" />
                  <line x1="18" y1="18" x2="32" y2="8" stroke="#00FF88" strokeWidth="1" opacity="0.5" />
                  <line x1="18" y1="18" x2="4" y2="28" stroke="#00FF88" strokeWidth="0.8" opacity="0.35" />
                  <line x1="18" y1="18" x2="32" y2="28" stroke="#00FF88" strokeWidth="0.8" opacity="0.35" />
                  <line x1="18" y1="18" x2="18" y2="2" stroke="#00FF88" strokeWidth="1" opacity="0.6" />
                  <line x1="18" y1="18" x2="18" y2="34" stroke="#00FF88" strokeWidth="0.6" opacity="0.3" />
                  
                  {/* Satellite nodes */}
                  <circle cx="4" cy="8" r="2" fill="#00FF88" opacity="0.6" />
                  <circle cx="32" cy="8" r="2" fill="#00FF88" opacity="0.5" />
                  <circle cx="4" cy="28" r="1.5" fill="#00FF88" opacity="0.35" />
                  <circle cx="32" cy="28" r="1.5" fill="#00FF88" opacity="0.35" />
                  <circle cx="18" cy="2" r="1.5" fill="#00FF88" opacity="0.5" />
                  <circle cx="18" cy="34" r="1" fill="#00FF88" opacity="0.25" />
                  
                  {/* Central core node */}
                  <circle cx="18" cy="18" r="5" fill="#00AA55" />
                  <circle cx="18" cy="18" r="3.5" fill="#0A0A0A" />
                  <circle cx="18" cy="18" r="2" fill="#00FF88" />
                  
                  {/* Gradient */}
                  <defs>
                    <radialGradient id="footerNodeGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00FF88" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#00FF88" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              <span className="font-bold text-neon">FLOW STATE</span>
            </div>
            <p className="text-steel text-sm">Industrial fluidity. Yard orchestration. Ground source truth.</p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-neon">Product</h3>
            <ul className="space-y-2 text-sm text-steel">
              <li><a href="#" className="hover:text-neon transition-colors">YardOS</a></li>
              <li><a href="#" className="hover:text-neon transition-colors">Digital Guard</a></li>
              <li><a href="#" className="hover:text-neon transition-colors">Digital Comms</a></li>
              <li><a href="#" className="hover:text-neon transition-colors">Digital BOL</a></li>
              <li><a href="#" className="hover:text-neon transition-colors">YardBuilder AI</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4 text-neon">Solutions</h3>
            <ul className="space-y-2 text-sm text-steel">
              <li><a href="#" className="hover:text-neon transition-colors">Retail & Grocery</a></li>
              <li><a href="#" className="hover:text-neon transition-colors">3PL & Contract</a></li>
              <li><a href="#" className="hover:text-neon transition-colors">Ports & Marine</a></li>
              <li><a href="#" className="hover:text-neon transition-colors">LTL Terminal</a></li>
              <li><a href="#" className="hover:text-neon transition-colors">Industrial</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-neon">Company</h3>
            <ul className="space-y-2 text-sm text-steel">
              <li><a href="#" className="hover:text-neon transition-colors">About</a></li>
              <li><a href="#" className="hover:text-neon transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-neon transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-neon transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neon/10 pt-8 flex items-center justify-between text-sm text-steel">
          <p>&copy; 2025 Flow State. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-neon transition-colors">Twitter</a>
            <a href="#" className="hover:text-neon transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-neon transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
