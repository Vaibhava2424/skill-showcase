import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

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
          
          <div className="flex gap-3 md:gap-8 items-center ml-auto">
            {[
              { path: '/skills', label: 'Skills', shortLabel: 'S' },
              { path: '/portfolio', label: 'Work', shortLabel: 'W' },
              { path: '/certificates', label: 'Certs', shortLabel: 'C' }
            ].map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className="relative group flex-shrink-0"
              >
                <span className={`font-heading uppercase text-xs md:text-sm tracking-wider transition-colors ${
                  isActive(item.path) 
                    ? 'text-accent-orange' 
                    : 'text-light-gray group-hover:text-accent-orange'
                }`}>
                  <span className="md:hidden">{item.shortLabel}</span>
                  <span className="hidden md:inline">{item.label}</span>
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
        </div>
      </nav>
    </header>
  );
}
