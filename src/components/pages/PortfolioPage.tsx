import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import { ExternalLink } from 'lucide-react';

const categories = ['All', 'MERN', 'Responsive', 'AI', 'Other', 'Frontend'];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Projects[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.category?.toLowerCase() === activeFilter.toLowerCase()
      );
      setFilteredProjects(filtered);
    }
  }, [activeFilter, projects]);

  const loadProjects = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<Projects>('projects');
    setProjects(items);
    setFilteredProjects(items);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading uppercase text-7xl md:text-8xl text-primary tracking-wider mb-6">
            <span className="font-paragraph italic text-4xl md:text-5xl">Selected</span> PROJECTS
          </h1>
          <p className="font-paragraph italic text-xl text-primary max-w-3xl mx-auto">
            A curated collection of digital experiences, innovative solutions, and creative explorations
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 font-heading uppercase text-sm tracking-wider transition-all ${
                activeFilter === category
                  ? 'bg-secondary text-secondary-foreground'
                  : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center py-24">
            <p className="font-heading uppercase text-xl text-primary tracking-wider">
              Loading projects...
            </p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-heading uppercase text-xl text-primary tracking-wider mb-4">
              No projects found
            </p>
            <p className="font-paragraph italic text-lg text-primary">
              Try selecting a different category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/portfolio/${project._id}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden mb-4 aspect-[4/3]">
                    {project.thumbnail && (
                      <Image
                        src={project.thumbnail}
                        alt={project.title || 'Project thumbnail'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={600}
                      />
                    )}
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-heading uppercase text-xl text-primary tracking-wider group-hover:opacity-70 transition-opacity">
                        {project.title}
                      </h3>
                      {project.category && (
                        <span className="font-heading uppercase text-xs text-primary tracking-wider bg-secondary px-3 py-1 whitespace-nowrap">
                          {project.category}
                        </span>
                      )}
                    </div>
                    
                    {project.description && (
                      <p className="font-paragraph italic text-base text-primary line-clamp-2">
                        {project.description}
                      </p>
                    )}
                    
                    {project.technologies && (
                      <p className="font-heading uppercase text-xs text-primary tracking-wider opacity-70">
                        {project.technologies}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
