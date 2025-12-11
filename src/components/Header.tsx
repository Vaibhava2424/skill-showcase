import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/skills', label: 'Skills', shortLabel: 'S' },
    { path: '/portfolio', label: 'Work', shortLabel: 'W' },
    { path: '/certificates', label: 'Certs', shortLabel: 'C' }
  ];

  return (
    <header className="w-full bg-black border-b border-accent-orange/30">
      <nav className="max-w-[120rem] mx-auto px-4 md:px-8 py-4 md:py-6">
        <div className="flex justify-between items-center gap-4">
          <Link 
            to="/" 
            className="group relative flex-shrink-0"
          >
            <span className="font-heading text-lg md:text-2xl font-bold text-accent-orange tracking-wider whitespace-nowrap">
              PortWeb
            </span>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-accent-orange"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center ml-auto">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className="relative group flex-shrink-0"
              >
                <span className={`font-heading uppercase text-sm tracking-wider transition-colors ${
                  isActive(item.path) 
                    ? 'text-accent-orange' 
                    : 'text-light-gray group-hover:text-accent-orange'
                }`}>
                  {item.label}
                </span>
                {isActive(item.path) && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-accent-orange w-full"
                    layoutId="navbar-underline"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex-shrink-0 text-accent-orange hover:text-accent-orange-soft transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-4 pt-4 border-t border-accent-orange/30">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-heading uppercase text-sm tracking-wider transition-colors ${
                      isActive(item.path)
                        ? 'text-accent-orange'
                        : 'text-light-gray hover:text-accent-orange'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
