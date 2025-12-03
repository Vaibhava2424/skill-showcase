import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-background">
      <nav className="max-w-[120rem] mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="font-paragraph italic text-base text-primary hover:opacity-70 transition-opacity uppercase tracking-wider"
          >
            Knox Chase
          </Link>
          
          <div className="flex gap-12 items-center">
            <Link 
              to="/skills" 
              className={`font-heading uppercase text-sm tracking-wider transition-opacity ${
                isActive('/skills') ? 'text-primary' : 'text-primary hover:opacity-70'
              }`}
            >
              Skills
            </Link>
            <Link 
              to="/portfolio" 
              className={`font-heading uppercase text-sm tracking-wider transition-opacity ${
                isActive('/portfolio') ? 'text-primary' : 'text-primary hover:opacity-70'
              }`}
            >
              Work
            </Link>
            <Link 
              to="/certificates" 
              className={`font-heading uppercase text-sm tracking-wider transition-opacity ${
                isActive('/certificates') ? 'text-primary' : 'text-primary hover:opacity-70'
              }`}
            >
              Certificates
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
