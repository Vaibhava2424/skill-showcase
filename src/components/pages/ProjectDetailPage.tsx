import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import { ArrowLeft, ExternalLink, Calendar, Code2, Github } from 'lucide-react';
import { format } from 'date-fns';
import { ProjectCardProps } from '@/components/ProjectCard';

// Static projects array
const staticProjects: ProjectCardProps[] =  [
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

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectCardProps | Projects | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProject(id);
    }
  }, [id]);

  const loadProject = async (projectId: string) => {
    setIsLoading(true);
    // Convert id to number for static projects
    const staticProject = staticProjects.find(p => p.id === Number(projectId));
    if (staticProject) {
      setProject(staticProject);
      setIsLoading(false);
      return;
    }

    // Load from CMS
    try {
      const projectData = await BaseCrudService.getById<Projects>('projects', projectId);
      setProject(projectData);
    } catch (error) {
      console.error('Project not found:', error);
      setProject(null);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="max-w-[100rem] mx-auto px-8 py-24 text-center">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-heading uppercase text-xl text-accent-orange tracking-wider"
          >
            Loading project...
          </motion.p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="max-w-[100rem] mx-auto px-8 py-24 text-center">
          <p className="font-heading uppercase text-xl text-accent-orange tracking-wider mb-4">
            Project not found
          </p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 font-paragraph italic text-lg text-light-gray hover:text-accent-orange transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to portfolio
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Type guards
  const isStaticProject = (p: any): p is ProjectCardProps => 'id' in p && 'image' in p;
  const isCMSProject = (p: any): p is Projects => '_id' in p && 'thumbnail' in p;

  const staticProj = isStaticProject(project) ? project : null;
  const cmsProj = isCMSProject(project) ? project : null;

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Back Button */}
      <div className="max-w-[100rem] mx-auto px-8 pt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 font-heading uppercase text-sm text-light-gray tracking-wider hover:text-accent-orange transition-colors group"
          >
            <motion.div
              animate={{ x: [-4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
            Back to Projects
          </Link>
        </motion.div>
      </div>

      {/* Project Hero */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            {project.category && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block font-heading uppercase text-xs text-black bg-accent-orange px-4 py-2 tracking-wider mb-4 font-bold"
              >
                {project.category}
              </motion.span>
            )}
            <h1 className="font-heading uppercase text-6xl md:text-7xl text-white tracking-wider font-black mb-6">
              {project.title}
            </h1>
            {project.description && (
              <p className="font-paragraph italic text-2xl text-light-gray max-w-4xl">
                {project.description}
              </p>
            )}
          </div>

          {/* Project Image */}
          {(cmsProj?.thumbnail || staticProj?.image) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-[16/9] mb-12 overflow-hidden bg-charcoal"
            >
              <Image
                src={cmsProj?.thumbnail || staticProj?.image || ''}
                alt={project.title || 'Project image'}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                width={1600}
              />
            </motion.div>
          )}

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="font-heading uppercase text-2xl text-accent-orange tracking-wider font-bold mb-6">
                Project Details
              </h2>

              <div className="space-y-6">
                {(staticProj?.tags || cmsProj?.technologies) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="flex items-start gap-3">
                      <Code2 className="w-5 h-5 text-accent-orange mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-heading uppercase text-sm text-medium-gray tracking-wider mb-2 opacity-70">
                          Technologies
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(staticProj?.tags || (cmsProj?.technologies?.split(',') || [])).map((tech: string) => (
                            <span key={tech} className="font-heading uppercase text-xs text-black bg-accent-orange px-3 py-1 tracking-wider font-bold">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {cmsProj?.completionDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-accent-orange mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-heading uppercase text-sm text-medium-gray tracking-wider mb-2 opacity-70">
                          Completion Date
                        </p>
                        <p className="font-paragraph italic text-lg text-light-gray">
                          {format(new Date(cmsProj.completionDate), 'MMMM yyyy')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {(cmsProj?.projectUrl || staticProj?.liveUrl) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <p className="font-heading uppercase text-sm text-medium-gray tracking-wider mb-2 opacity-70">
                      Live Project
                    </p>
                    <a
                      href={cmsProj?.projectUrl || staticProj?.liveUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-heading uppercase text-sm text-accent-orange tracking-wider hover:text-accent-orange-soft transition-colors group"
                    >
                      Visit Website
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.div>
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* GitHub Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-charcoal border-2 border-accent-orange/30 p-8"
            >
              <h2 className="font-heading uppercase text-2xl text-accent-orange tracking-wider font-bold mb-6">
                Repository Links
              </h2>
              <div className="space-y-4">
                {staticProj?.githubUrl?.frontend && (
                  <motion.a
                    href={staticProj.githubUrl.frontend}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center gap-3 p-4 bg-black/50 border border-accent-orange/30 hover:border-accent-orange transition-colors group"
                  >
                    <Github className="w-5 h-5 text-accent-orange flex-shrink-0" />
                    <div>
                      <p className="font-heading uppercase text-sm text-light-gray tracking-wider group-hover:text-accent-orange transition-colors">
                        Frontend Repository
                      </p>
                      <p className="font-paragraph italic text-xs text-medium-gray">
                        React & UI Components
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-accent-orange ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                )}

                {staticProj?.githubUrl?.backend && (
                  <motion.a
                    href={staticProj.githubUrl.backend}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex items-center gap-3 p-4 bg-black/50 border border-accent-orange/30 hover:border-accent-orange transition-colors group"
                  >
                    <Github className="w-5 h-5 text-accent-orange flex-shrink-0" />
                    <div>
                      <p className="font-heading uppercase text-sm text-light-gray tracking-wider group-hover:text-accent-orange transition-colors">
                        Backend Repository
                      </p>
                      <p className="font-paragraph italic text-xs text-medium-gray">
                        API & Server Logic
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-accent-orange ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                )}

                {!staticProj?.githubUrl?.frontend && !staticProj?.githubUrl?.backend && (
                  <p className="font-paragraph italic text-lg text-medium-gray text-center py-8">
                    Repository links coming soon
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Key Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-charcoal border-2 border-accent-orange/30 p-8 mb-16"
          >
            <h2 className="font-heading uppercase text-2xl text-accent-orange tracking-wider font-bold mb-6">
              Key Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Innovative design approach with modern aesthetics',
                'Fully responsive across all devices and screen sizes',
                'Optimized performance and accessibility standards',
                'Clean, maintainable code architecture'
              ].map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-accent-orange mt-2 flex-shrink-0" />
                  <p className="font-paragraph italic text-lg text-light-gray">
                    {highlight}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center py-12 border-t-2 border-accent-orange/20"
          >
            <h3 className="font-heading uppercase text-3xl text-white tracking-wider font-black mb-4">
              Interested in similar work?
            </h3>
            <p className="font-paragraph italic text-xl text-light-gray mb-8">
              Let's discuss your next project
            </p>
            <Link
              to="/portfolio"
              className="inline-block border-2 border-accent-orange px-8 py-4 text-accent-orange font-heading uppercase text-sm tracking-wider font-bold hover:bg-accent-orange hover:text-black transition-all duration-300"
            >
              View More Projects
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
