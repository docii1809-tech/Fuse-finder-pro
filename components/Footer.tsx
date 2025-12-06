import React from 'react';
import { APP_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-2">{APP_NAME}</h3>
            <p className="text-sm">
              Your AI-powered automotive companion. Identify issues, find fuses, and keep your vehicle running smoothly.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Tools</h4>
            <ul className="text-sm space-y-1">
              <li><a href="#/fuse" className="hover:text-blue-400">Fuse Finder</a></li>
              <li><a href="#/dashboard" className="hover:text-blue-400">Dashboard Lights</a></li>
              <li><a href="#/tire" className="hover:text-blue-400">Tire Analysis</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Legal</h4>
            <ul className="text-sm space-y-1">
              <li>Disclaimer: Information is for reference only.</li>
              <li>Always consult a professional mechanic.</li>
              <li>© {new Date().getFullYear()} Fuse Finder Pro</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
