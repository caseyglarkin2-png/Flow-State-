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
              <div className="w-6 h-6 rounded-full border-2 border-neon flex items-center justify-center">
                <div className="w-1 h-1 bg-neon rounded-full"></div>
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
