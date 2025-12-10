import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard, { ProjectCardProps } from '@/components/ProjectCard';

// Static projects array
const projectsList: ProjectCardProps[] = [
  {
    id: 1,
    title: "Jobby App",
    description:
      "A dynamic job listing platform with JWT authentication, protected routes, API integration, and responsive UI. Built using React.js and Node.js with REST APIs. Features job listings, filters, company profiles, and secure login/signup flow.⚡ Note: Login may take a few seconds initially due to backend warm-up — this is a sample project environment",
    liveUrl: "https://jobbyapp-liart.vercel.app/",
    githubUrl: {
      frontend: "https://github.com/Vaibhava2424/Jobby-App",
      backend: "https://github.com/Vaibhava2424/Jobby-App-Apis",
    },
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233008/Screenshot_2025-11-03_102043_cttqul.png",
    tags: ["React", "Node.js", "JWT", "CSS"],
    category: "mern",
  },
  {
    id: 2,
    title: "Law Guide",
    description:
      "A team project developed during a no-code hackathon to provide structured legal information on government schemes, IPC sections, and public legal resources. Built entirely using AI-powered tools, it offers an intuitive interface, real-time policy insights, and smooth navigation. I contributed to content structuring, UI/UX, and flow logic.",
    liveUrl: "https://p-188620.lovable.app/",
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233302/Screenshot_2025-09-18_103807_y98rfm.png",
    tags: ["Figma", "Relume", "Builder.io", "Lovable"],
    category: "AI",
  },
  {
    id: 3,
    title: "SubTrack",
    description:
      "A UI/UX subscription-tracking project designed to simplify OTT management for users. It includes features like subscription reminders, trending content suggestions, discount coupons, and AI-powered enhancements. Designed in Figma for a seamless and visually clean user flow.",
    liveUrl:
      "https://www.figma.com/design/dzo7eVJZGCpfFZ3D04AD8q/Vaibhava_project",
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233258/Screenshot_2025-11-04_104400_h9szgl.png",
    tags: ["Figma", "UI/UX"],
    category: "other",
  },
  {
    id: 4,
    title: "Nextjs Project",
    description:
      "A simple e-commerce front-end built with Next.js, featuring multi-page navigation, product listings, and a clean responsive UI. The platform includes pages for Home, About, Products, Cart, and Feedback, offering users a smooth browsing experience. Integrated with dynamic routing and modern layouts, it serves as a foundation for future e-commerce expansion.",
    liveUrl: "https://next-js-project-eight-mu.vercel.app",
    githubUrl: {
      frontend: "https://github.com/Vaibhava2424/NextJs-Project",
    },
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1763011639/Screenshot_2025-11-13_105705_jjxlvm.png",
    tags: ["Nextjs", "Reactkjs", "Tailwind CSS"],
    category: "frontend",
  },
  {
    id: 5,
    title: "AI Chatbot",
    description:
      "Developed a functional AI chatbot capable of interacting with users and answering queries in real-time. Built using BotPress tools, integrated NLP features, and tested through real-time chat previews. Focused on improving conversational design, automation, and AI workflows.",
    liveUrl:
      "https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/12/28/13/20241228132934-Q9SXG0M8.json",
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233084/Screenshot_2025-11-04_104057_ffa9di.png",
    tags: ["BotPress WorkSpace", "BotPress Studio", "BotPress Web Chat Preview"],
    category: "AI",
  },
  {
    id: 7,
    title: "Tasty Kitchens",
    description:
      "Tasty Kitchens – Food ordering full-stack platform using React + Vite frontend and Node.js + MongoDB backend. Features restaurant listing, menus, authentication, and orders simulation.",
    liveUrl: "https://tasty-kitchens-nu.vercel.app/",
    githubUrl: {
      frontend: "https://github.com/Vaibhava2424/Tasty-Kitchens",
      backend: "https://github.com/Vaibhava2424/Tasty-Kitchen-apis",
    },
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762232980/Screenshot_2025-09-18_102156_p5c6pw.png",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    category: "mern",
  },
  {
    id: 8,
    title: "BookFlow",
    description:
      "A full-stack book management application developed using React + TypeScript on frontend and Node.js with MongoDB backend. Implements secure JWT authentication and CRUD operations with a clean UI.",
    liveUrl: "https://bookflow-eosin.vercel.app/",
    githubUrl: {
      frontend: "https://github.com/Vaibhava2424/bookFlow",
      backend: "https://github.com/Vaibhava2424/BookFlow-apis",
    },
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762232946/Screenshot_2025-11-04_103823_iggpak.png",
    tags: ["React", "TypeScript", "Node.js", "MongoDB"],
    category: "mern",
  },
  {
    id: 6,
    title: "Food Munch",
    description:
      "A personal project where I developed a food-centric website to bring together food lovers and culinary enthusiasts. Built using HTML and CSS, it showcases recipes, food blogs, and trending dishes in a visually appealing and user-friendly layout.",
    liveUrl: "https://foodmunch246.niat.tech/",
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762232680/Screenshot_2025-11-04_103353_jw6iys.png",
    tags: ["HTML", "CSS", "Bootstrap"],
    category: "responsive",
  },

  // SMALL PROJECTS
  {
    id: 9,
    title: "Multi-Consultancy Webpage",
    description:
      "A professional consultancy-style landing page featuring a responsive layout, service highlights, and structured content sections.",
    liveUrl: "https://jefnncefjv.niat.tech/",
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233543/Screenshot_2025-11-04_104817_da4aag.png",
    tags: ["HTML", "CSS", "Bootstrap"],
    category: "responsive",
  },
  {
    id: 10,
    title: "Nature Tourism Page",
    description:
      "A nature-themed tourism landing page built with Bootstrap grids and mobile-first layout.",
    liveUrl: "https://jwncwndcj.niat.tech/",
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233653/Screenshot_2025-11-04_104946_cu1bgt.png",
    tags: ["HTML", "CSS", "Bootstrap"],
    category: "responsive",
  },
  {
    id: 11,
    title: "Wikipedia Search Engine",
    description:
      "A real-time Wikipedia search application using Fetch API to pull search results with dynamic DOM rendering.",
    liveUrl: "https://wikipedia64.niat.tech/",
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233760/Screenshot_2025-11-04_105222_aknvdo.png",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "other",
  },
  {
    id: 12,
    title: "Number Guess Game",
    description:
      "A fun interactive guessing game built using JavaScript logic and DOM manipulation.",
    liveUrl: "https://guessingame24.niat.tech/",
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233794/Screenshot_2025-11-04_105300_ytsjhi.png",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "other",
  },
  {
    id: 13,
    title: "Wedding Celebration Page",
    description:
      "A vibrant and festive wedding theme page built with Bootstrap and custom UI blocks.",
    liveUrl: "https://marriagefestive.niat.tech/",
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233973/Screenshot_2025-11-04_105600_paccxc.png",
    tags: ["HTML", "CSS", "Bootstrap"],
    category: "responsive",
  },
  {
    id: 14,
    title: "Tech Trends Showcase",
    description:
      "A technology-trends themed website created with Bootstrap and supported by AI-assisted design tools.",
    liveUrl: "https://futurthink11.niat.tech/",
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762234092/Screenshot_2025-11-04_105722_sntunq.png",
    tags: ["HTML", "CSS", "Bootstrap"],
    category: "AI",
  },
  {
    id: 15,
    title: "FitPro Fitness Page",
    description:
      "A responsive fitness landing page showcasing workout services, trainers, and brand hero section.",
    liveUrl: "https://fitprocom.niat.tech/",
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762234177/Screenshot_2025-11-04_105921_rx2krh.png",
    tags: ["HTML", "CSS", "Bootstrap"],
    category: "responsive",
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
