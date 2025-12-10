import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard, { ProjectCardProps } from '@/components/ProjectCard';

// Static projects array
const projectsList: ProjectCardProps[] = [
  // your same 14 project objects EXACTLY as you pasted
];

const filterVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
    },
  }),
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Get unique categories from all projects
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    projectsList.forEach((project) => categories.add(project.category));
    return ['All', ...Array.from(categories).sort()];
  }, []);

  // Filter projects by category ONLY
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projectsList;
    return projectsList.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

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
            MY <span className="text-accent-orange">WORK</span>
          </h1>
          <p className="font-paragraph italic text-xl text-light-gray max-w-3xl mx-auto">
            A comprehensive showcase of all my projects, innovations, and creative
            endeavors across diverse technologies and domains
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <AnimatePresence mode="wait">
            {allCategories.map((filter, i) => (
              <motion.button
                key={filter}
                custom={i}
                variants={filterVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setActiveFilter(filter)}
                className={`relative px-6 py-3 font-heading uppercase text-sm tracking-wider font-bold transition-all duration-300 overflow-hidden group ${
                  activeFilter === filter
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
                <span className="relative z-10">{filter}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <p className="font-heading uppercase text-xl text-accent-orange tracking-wider mb-4">
              No projects found
            </p>
            <p className="font-paragraph italic text-lg text-light-gray">
              Try selecting a different category
            </p>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <ProjectCard {...project} />
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
