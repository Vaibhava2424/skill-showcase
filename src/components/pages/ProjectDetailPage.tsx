import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import { ExternalLink, X } from 'lucide-react';

const projectsList = [
  // ======== MAIN PROJECTS ========

  {
    id:1,
    title: "Jobby App",
    description: "A dynamic job listing platform with JWT authentication, protected routes, API integration, and responsive UI. Built using React.js and Node.js with REST APIs. Features job listings, filters, company profiles, and secure login/signup flow.⚡ Note: Login may take a few seconds initially due to backend warm-up — this is a sample project environment",
    link: "https://jobbyapp-liart.vercel.app/",
    github: {
        frontend: "https://github.com/Vaibhava2424/Jobby-App",
        backend: "https://github.com/Vaibhava2424/Jobby-App-Apis"
    },
    image: "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233008/Screenshot_2025-11-03_102043_cttqul.png",
    techStack: ["React", "Node.js", "JWT", "CSS"],
    category: "mern",
  },
  {
    id:2,
    title: "Law Guide",
    description:
      "A team project developed during a no-code hackathon to provide structured legal information on government schemes, IPC sections, and public legal resources. Built entirely using AI-powered tools, it offers an intuitive interface, real-time policy insights, and smooth navigation. I contributed to content structuring, UI/UX, and flow logic.",
    link: "https://p-188620.lovable.app/",
    image: "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233302/Screenshot_2025-09-18_103807_y98rfm.png",
    techStack: ["Figma", "Relume", "Builder.io", "Lovable"],
    category: "AI",
  },
  {
    id:3,
    title: "SubTrack",
    description:
      "A UI/UX subscription-tracking project designed to simplify OTT management for users. It includes features like subscription reminders, trending content suggestions, discount coupons, and AI-powered enhancements. Designed in Figma for a seamless and visually clean user flow.",
    link: "https://www.figma.com/design/dzo7eVJZGCpfFZ3D04AD8q/Vaibhava_project",
    image: "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233258/Screenshot_2025-11-04_104400_h9szgl.png",
    techStack: ["Figma", "UI/UX"],
    category: "other",
  },
  {
    id:89,
    title: "Nextjs Project",
    description: "A simple e-commerce front-end built with Next.js, featuring multi-page navigation, product listings, and a clean responsive UI. The platform includes pages for Home, About, Products, Cart, and Feedback, offering users a smooth browsing experience. Integrated with dynamic routing and modern layouts, it serves as a foundation for future e-commerce expansion.",
    link: "https://next-js-project-eight-mu.vercel.app",
    github: {
        frontend: "https://github.com/Vaibhava2424/NextJs-Project",
    },
    image: "https://res.cloudinary.com/dodfv5sbg/image/upload/v1763011639/Screenshot_2025-11-13_105705_jjxlvm.png",
    techStack: ["Nextjs","Reactkjs", "Tailwind CSS"],
    category: "frontend",
  },
  {
    id:4,
    title: "AI Chatbot",
    description:
      "Developed a functional AI chatbot capable of interacting with users and answering queries in real-time. Built using BotPress tools, integrated NLP features, and tested through real-time chat previews. Focused on improving conversational design, automation, and AI workflows.",
    link: "https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/12/28/13/20241228132934-Q9SXG0M8.json",
    image: "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233084/Screenshot_2025-11-04_104057_ffa9di.png",
    techStack: ["BotPress WorkSpace", "BotPress Studio", "BotPress Web Chat Preview"],
    category: "AI",
  },
  {
    id:5,
    title: "Food Munch",
    description:
      "A personal project where I developed a food-centric website to bring together food lovers and culinary enthusiasts. Built using HTML and CSS, it showcases recipes, food blogs, and trending dishes in a visually appealing and user-friendly layout. The website focuses on intuitive navigation, high-quality visuals, and engaging content, making it easy for users to explore different cuisines. This project helped me refine my web development skills while blending creativity with functionality.",
    link: "https://foodmunch246.niat.tech/",
    image: "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762232680/Screenshot_2025-11-04_103353_jw6iys.png",
    techStack: ["HTML", "CSS", "Bootstrap"],
    category: "responsive",
    
  },
  {
    id:6,
    title: "Tasty Kitchens",
    description: "Tasty Kitchens – Food ordering full-stack platform using React + Vite frontend and Node.js + MongoDB backend. Features restaurant listing, menus, authentication, and orders simulation.",
    link: "https://tasty-kitchens-nu.vercel.app/",
    github: {
        frontend: "https://github.com/Vaibhava2424/Tasty-Kitchens",
        backend: "https://github.com/Vaibhava2424/Tasty-Kitchen-apis"
    },
    image: "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762232980/Screenshot_2025-09-18_102156_p5c6pw.png",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    category: "mern",
  },
  {
    id:7,
    title: "BookFlow",
    description: "A full-stack book management application developed using React + TypeScript on frontend and Node.js with MongoDB backend. Implements secure JWT authentication and CRUD operations for managing books with an elegant UI. ⚡ Note: Login may take a few seconds initially due to backend warm-up — this is a sample project environment",
    link: "https://bookflow-eosin.vercel.app/",
    github: {
        frontend: "https://github.com/Vaibhava2424/bookFlow",
        backend: "https://github.com/Vaibhava2424/BookFlow-apis"
    },
    image: "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762232946/Screenshot_2025-11-04_103823_iggpak.png",
    techStack: ["React", "TypeScript", "Node.js", "MongoDB"],
    category: "mern",
  },
  

  // ======== SMALL PROJECTS ADDED ========

  {
    id:8,
    title: "Multi-Consultancy Webpage",
    description:
      "A professional consultancy-style landing page featuring a responsive layout, service highlights, and structured content sections. Built using Bootstrap with clean styling for corporate UI.",
    link: "https://jefnncefjv.niat.tech/",
    image: "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233543/Screenshot_2025-11-04_104817_da4aag.png",
    techStack: ["HTML", "CSS", "Bootstrap"],
    category: "responsive",
  },
  {
    id:9,
    title: "Nature Tourism Page",
    description:
      "A nature-themed tourism landing page built with Bootstrap grids and mobile-first layout. Focuses on simplicity, scenic layout, and travel-inspired design blocks.",
    link: "https://jwncwndcj.niat.tech/",
    image:"https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233653/Screenshot_2025-11-04_104946_cu1bgt.png",
    techStack: ["HTML", "CSS", "Bootstrap"],
    category: "responsive",
  },
  {
    id:10,
    title: "Wikipedia Search Engine",
    description:
      "A real-time Wikipedia search application using Fetch API to pull search results. Built with pure JavaScript and dynamic DOM rendering.",
    link: "https://wikipedia64.niat.tech/",
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233760/Screenshot_2025-11-04_105222_aknvdo.png",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "other",
  },
  {
    id:11,
    title: "Number Guess Game",
    description:
      "A fun interactive guessing game built using core JavaScript logic and DOM updates. Provides feedback on correct guesses and attempts with a clean UI.",
    link: "https://guessingame24.niat.tech/",
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233794/Screenshot_2025-11-04_105300_ytsjhi.png",
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "other",
  },
  {
    id:12,
    title: "Wedding Celebration Page",
    description:
      "A vibrant and festive wedding theme design built with Bootstrap and custom UI blocks to match wedding aesthetics and event layout patterns.",
    link: "https://marriagefestive.niat.tech/",
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762233973/Screenshot_2025-11-04_105600_paccxc.png",
    techStack: ["HTML", "CSS", "Bootstrap"],
    category: "responsive",
  },
  {
    id:13,
    title: "Tech Trends Showcase",
    description:
      "A technology-trends themed website created with Bootstrap and supported by AI-assisted design tools. Features a futuristic digital look.",
    link: "https://futurthink11.niat.tech/",
    image:
      "https://res.cloudinary.com/dodfv5sbg/image/upload/v1762234092/Screenshot_2025-11-04_105722_sntunq.png",
    techStack: ["HTML", "CSS", "Bootstrap"],
    category: "AI",
  },
  {
    id:14,
    title: "FitPro Fitness Page",
    description:
      "A responsive fitness landing page showcasing workout services, trainers, and brand hero section. Fully mobile-optimized.",
    link: "https://fitprocom.niat.tech/",
    image:
      "https://res.cloudinarxy.com/dodfv5sbg/image/upload/v1762234177/Screenshot_2025-11-04_105921_rx2krh.png",
    techStack: ["HTML", "CSS", "Bootstrap"],
    category: "responsive",
  },
];

const filteredProjects = projectsList

const categories = ['All', 'MERN', 'Responsive', 'AI', 'Other', 'Frontend'];

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

        {/* Filter Buttons - Stylish Animation */}
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
        {isLoading ? (
          <div className="text-center py-24">
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-heading uppercase text-xl text-accent-orange tracking-wider"
            >
              Loading projects...
            </motion.p>
          </div>
        ) : projectsList.length === 0 ? (
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
                  key={project._id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <Link
                    to={`/portfolio/${project._id}`}
                    className="group block h-full"
                  >
                    <div className="relative overflow-hidden mb-4 aspect-[4/3] bg-charcoal">
                      {project.thumbnail && (
                        <Image
                          src={project.thumbnail}
                          alt={project.title || 'Project thumbnail'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          width={600}
                        />
                      )}
                      <motion.div
                        className="absolute inset-0 bg-accent-orange opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.2 }}
                      />
                      
                      {/* Hover overlay with category */}
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
