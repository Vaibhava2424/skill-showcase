import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { ExternalLink } from 'lucide-react';
import projectsList from './projectsList'; // import the array

const categories = ['All', 'MERN', 'Responsive', 'AI', 'Other', 'Frontend'];

const filterVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projectsList
      : projectsList.filter(
          project => project.category?.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading uppercase text-7xl md:text-8xl text-white tracking-wider font-black mb-6">
            <span className="text-accent-orange">Selected</span> PROJECTS
          </h1>
          <p className="font-paragraph italic text-xl text-light-gray max-w-3xl mx-auto">
            A curated collection of digital experiences, innovative solutions, and creative explorations
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <AnimatePresence mode="wait">
            {categories.map((category, i) => (
              <motion.button
                key={category}
                custom={i}
                variants={filterVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setActiveFilter(category)}
                className={`relative px-6 py-3 font-heading uppercase text-sm tracking-wider font-bold transition-all duration-300 overflow-hidden group ${
                  activeFilter === category
                    ? 'bg-accent-orange text-black'
                    : 'bg-charcoal text-light-gray border-2 border-accent-orange/30 hover:border-accent-orange'
                }`}
              >
                <motion.div
                  className="absolute inset-0 bg-accent-orange/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-heading uppercase text-xl text-accent-orange tracking-wider mb-4">
              No projects found
            </p>
            <p className="font-paragraph italic text-lg text-light-gray">
              Try selecting a different category
            </p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full"
                  >
                    <div className="relative overflow-hidden mb-4 aspect-[4/3] bg-charcoal">
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        width={600}
                      />
                      <motion.div
                        className="absolute inset-0 bg-accent-orange opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      />
                      <motion.div
                        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="text-center"
                        >
                          <p className="font-heading uppercase text-accent-orange text-sm tracking-wider mb-2">
                            View Project
                          </p>
                          <ExternalLink className="w-6 h-6 text-accent-orange mx-auto" />
                        </motion.div>
                      </motion.div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-heading uppercase text-xl text-white tracking-wider group-hover:text-accent-orange transition-colors">
                          {project.title}
                        </h3>
                        {project.category && (
                          <span className="font-heading uppercase text-xs text-black bg-accent-orange px-3 py-1 whitespace-nowrap font-bold">
                            {project.category}
                          </span>
                        )}
                      </div>

                      <p className="font-paragraph italic text-base text-light-gray line-clamp-2">
                        {project.description}
                      </p>

                      {project.techStack && (
                        <p className="font-heading uppercase text-xs text-medium-gray tracking-wider opacity-70">
                          {project.techStack.join(', ')}
                        </p>
                      )}
                    </div>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}
