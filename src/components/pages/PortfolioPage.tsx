import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { ExternalLink } from 'lucide-react';

// =====================================
// REPLACE IMPORT WITH LOCAL ARRAY
// =====================================

const projectsList = [
  {
    id: 1,
    title: "TechTrends India",
    description:
      "A platform focused on informing and engaging visitors about technology trends and innovations in India.",
    image: "/images/projects/techtrends.png",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    link: "#",
    github: null,
  },
  {
    id: 2,
    title: "Food Munch",
    description:
      "A website for food lovers showcasing recipes, blogs, and trending dishes.",
    image: "/images/projects/foodmunch.png",
    techStack: ["HTML", "CSS"],
    category: "Responsive",
    link: "#",
    github: null,
  },
  {
    id: 3,
    title: "Law Guide",
    description:
      "A legal resource platform covering state & central schemes, IPC sections, and related content.",
    image: "/images/projects/lawguide.png",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    link: "#",
    github: null,
  },
  {
    id: 4,
    title: "SubTrack",
    description:
      "A UI/UX project for managing OTT subscriptions with reminders and trending recommendations.",
    image: "/images/projects/subtrack.png",
    techStack: ["Figma", "UI/UX"],
    category: "Other",
    link: "#",
    github: null,
  },
];

// =====================================
// FILTER CATEGORIES
// =====================================

const categories = ["All", "MERN", "Responsive", "AI", "Other", "Frontend"];

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

// =====================================
// MAIN PAGE COMPONENT
// =====================================

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // ===== Load local projects into correct structure =====
  useEffect(() => {
    setIsLoading(true);

    const mapped = projectsList.map((p: any) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      thumbnail: p.image,
      technologies: p.techStack?.join(", ") || "",
      category: p.category || "",
      link: p.link,
      github: p.github || null,
    }));

    setProjects(mapped);
    setFilteredProjects(mapped);
    setIsLoading(false);
  }, []);

  // ===== Apply Filter =====
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) =>
          project.category?.toLowerCase() === activeFilter.toLowerCase()
      );
      setFilteredProjects(filtered);
    }
  }, [activeFilter, projects]);

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
            A comprehensive showcase of all my projects, innovations, and
            creative endeavors across diverse technologies and domains
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
                    ? "bg-accent-orange text-black"
                    : "bg-charcoal text-light-gray border-2 border-accent-orange/30 hover:border-accent-orange"
                }`}
              >
                <motion.div
                  className="absolute inset-0 bg-accent-orange/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="font-heading uppercase text-xl text-accent-orange tracking-wider mb-4">
              Loading projects...
            </p>
          </motion.div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="font-heading uppercase text-xl text-accent-orange tracking-wider mb-4">
              No projects found
            </p>
            <p className="font-paragraph italic text-lg text-light-gray">
              Try selecting a different category
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
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
                  <Link to={`/portfolio/${project.id}`} className="group block h-full">
                    <div className="relative overflow-hidden mb-4 aspect-[4/3] bg-charcoal">
                      {project.thumbnail && (
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          width={600}
                        />
                      )}

                      <motion.div
                        className="absolute inset-0 bg-accent-orange opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.2 }}
                      />

                      <motion.div
                        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
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
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="font-heading uppercase text-xs text-black bg-accent-orange px-3 py-1 whitespace-nowrap font-bold"
                          >
                            {project.category}
                          </motion.span>
                        )}
                      </div>

                      {project.description && (
                        <p className="font-paragraph italic text-base text-light-gray line-clamp-2">
                          {project.description}
                        </p>
                      )}

                      {project.technologies && (
                        <p className="font-heading uppercase text-xs text-medium-gray tracking-wider opacity-70">
                          {project.technologies}
                        </p>
                      )}
                    </div>
                  </Link>
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
