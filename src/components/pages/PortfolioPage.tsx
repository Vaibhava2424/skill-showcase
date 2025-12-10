import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard, { ProjectCardProps } from '@/components/ProjectCard';

// Static projects array
const projectsList: ProjectCardProps[] = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with product catalog, shopping cart, and payment integration using Stripe.',
    image: 'https://static.wixstatic.com/media/98427a_0fa9040270e540be9bef19bda71ded26~mv2.png?originWidth=576&originHeight=384',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: 'https://example.com/ecommerce',
    githubUrl: 'https://github.com/example/ecommerce',
  },
  {
    title: 'Responsive Portfolio Website',
    description: 'A modern, fully responsive portfolio website showcasing design and development work with smooth animations.',
    image: 'https://static.wixstatic.com/media/98427a_6162b0febb5a4e1288eb2e1a0d6a331f~mv2.png?originWidth=576&originHeight=384',
    category: 'Web Design',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://example.com/portfolio',
    githubUrl: 'https://github.com/example/portfolio',
  },
  {
    title: 'AI Chat Application',
    description: 'An intelligent chat application powered by AI, featuring real-time messaging and smart responses.',
    image: 'https://static.wixstatic.com/media/98427a_852eb5435d044884b574bdef5c7d924f~mv2.png?originWidth=576&originHeight=384',
    category: 'AI & Machine Learning',
    tags: ['React', 'OpenAI API', 'WebSocket', 'Express'],
    liveUrl: 'https://example.com/ai-chat',
    githubUrl: 'https://github.com/example/ai-chat',
  },
  {
    title: 'Task Management Dashboard',
    description: 'A comprehensive task management tool with drag-and-drop functionality and real-time updates.',
    image: 'https://static.wixstatic.com/media/98427a_90b662a47cf444ab8cc848017266e727~mv2.png?originWidth=576&originHeight=384',
    category: 'Web Development',
    tags: ['React', 'Redux', 'Tailwind CSS'],
    liveUrl: 'https://example.com/tasks',
    githubUrl: 'https://github.com/example/tasks',
  },
  {
    title: 'Social Media Analytics Tool',
    description: 'An analytics dashboard for tracking social media performance across multiple platforms with detailed insights.',
    image: 'https://static.wixstatic.com/media/98427a_597c216a6b734dd2a7725c7709863039~mv2.png?originWidth=576&originHeight=384',
    category: 'Data Analytics',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
    liveUrl: 'https://example.com/analytics',
    githubUrl: 'https://github.com/example/analytics',
  },
  {
    title: 'Weather Forecast App',
    description: 'A beautiful weather application with real-time data and detailed forecasts for any location.',
    image: 'https://static.wixstatic.com/media/98427a_93343545a33d4c60ac02187f25224006~mv2.png?originWidth=576&originHeight=384',
    category: 'Web Development',
    tags: ['React', 'OpenWeather API', 'Tailwind CSS'],
    liveUrl: 'https://example.com/weather',
    githubUrl: 'https://github.com/example/weather',
  },
  {
    title: 'Machine Learning Model Trainer',
    description: 'A web interface for training and testing machine learning models with visualization and real-time feedback.',
    image: 'https://static.wixstatic.com/media/98427a_0461cee5f8924873bf16de234391e0be~mv2.png?originWidth=576&originHeight=384',
    category: 'AI & Machine Learning',
    tags: ['React', 'Python', 'TensorFlow', 'Flask'],
    liveUrl: 'https://example.com/ml-trainer',
    githubUrl: 'https://github.com/example/ml-trainer',
  },
  {
    title: 'Video Streaming Platform',
    description: 'A Netflix-like streaming platform with user authentication and content recommendations.',
    image: 'https://static.wixstatic.com/media/98427a_b2f7ff77ccdb4895903271374a933a99~mv2.png?originWidth=576&originHeight=384',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'MongoDB', 'HLS.js'],
    liveUrl: 'https://example.com/streaming',
    githubUrl: 'https://github.com/example/streaming',
  },
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
  const [filterType, setFilterType] = useState<'category' | 'tag'>('tag');

  // Get unique categories and tags from all projects
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    projectsList.forEach((project) => {
      categories.add(project.category);
    });
    return ['All', ...Array.from(categories).sort()];
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projectsList.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag));
    });
    return ['All', ...Array.from(tags).sort()];
  }, []);

  // Filter projects based on selected category or tag
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projectsList;
    }
    
    if (filterType === 'category') {
      return projectsList.filter((project) => project.category === activeFilter);
    } else {
      return projectsList.filter((project) => project.tags.includes(activeFilter));
    }
  }, [activeFilter, filterType]);

  const currentFilters = filterType === 'category' ? allCategories : allTags;

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
            A comprehensive showcase of all my projects, innovations, and creative endeavors across diverse technologies and domains
          </p>
        </motion.div>

        {/* Filter Type Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-4 mb-8"
        >
          <motion.button
            onClick={() => {
              setFilterType('category');
              setActiveFilter('All');
            }}
            className={`px-6 py-3 font-heading uppercase text-sm tracking-wider font-bold transition-all duration-300 ${
              filterType === 'category'
                ? 'bg-accent-orange text-black'
                : 'bg-charcoal text-light-gray border-2 border-accent-orange/30 hover:border-accent-orange'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            By Category
          </motion.button>
          <motion.button
            onClick={() => {
              setFilterType('tag');
              setActiveFilter('All');
            }}
            className={`px-6 py-3 font-heading uppercase text-sm tracking-wider font-bold transition-all duration-300 ${
              filterType === 'tag'
                ? 'bg-accent-orange text-black'
                : 'bg-charcoal text-light-gray border-2 border-accent-orange/30 hover:border-accent-orange'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            By Technology
          </motion.button>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <AnimatePresence mode="wait">
            {currentFilters.map((filter, i) => (
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="font-heading uppercase text-xl text-accent-orange tracking-wider mb-4">
              No projects found
            </p>
            <p className="font-paragraph italic text-lg text-light-gray">
              Try selecting a different technology
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
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
