import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-black border-b border-accent-orange/30">
      <nav className="max-w-[120rem] mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="group relative"
          >
            <span className="font-heading uppercase text-2xl font-bold text-accent-orange tracking-wider">
              KC
            </span>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-accent-orange"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </Link>
          
          <div className="flex gap-8 items-center">
            {[
              { path: '/skills', label: 'Skills' },
              { path: '/portfolio', label: 'Work' },
              { path: '/certificates', label: 'Certs' }
            ].map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className="relative group"
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
        </div>
      </nav>
    </header>
  );
}
