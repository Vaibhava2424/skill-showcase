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

// Static projects array (same as PortfolioPage)
const staticProjects: ProjectCardProps[] = [
  {
    _id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with product catalog, shopping cart, and payment integration using Stripe.',
    image: 'https://static.wixstatic.com/media/98427a_0fa9040270e540be9bef19bda71ded26~mv2.png?originWidth=576&originHeight=384',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: 'https://example.com/ecommerce',
    githubUrl: 'https://github.com/example/ecommerce',
    frontend: 'https://github.com/example/ecommerce-frontend',
    backend: 'https://github.com/example/ecommerce-backend',
  },
  {
    _id: 'portfolio-website',
    title: 'Responsive Portfolio Website',
    description: 'A modern, fully responsive portfolio website showcasing design and development work with smooth animations.',
    image: 'https://static.wixstatic.com/media/98427a_6162b0febb5a4e1288eb2e1a0d6a331f~mv2.png?originWidth=576&originHeight=384',
    category: 'Web Design',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://example.com/portfolio',
    githubUrl: 'https://github.com/example/portfolio',
    frontend: 'https://github.com/example/portfolio-frontend',
  },
  {
    _id: 'ai-chat-app',
    title: 'AI Chat Application',
    description: 'An intelligent chat application powered by AI, featuring real-time messaging and smart responses.',
    image: 'https://static.wixstatic.com/media/98427a_852eb5435d044884b574bdef5c7d924f~mv2.png?originWidth=576&originHeight=384',
    category: 'AI & Machine Learning',
    tags: ['React', 'OpenAI API', 'WebSocket', 'Express'],
    liveUrl: 'https://example.com/ai-chat',
    githubUrl: 'https://github.com/example/ai-chat',
    frontend: 'https://github.com/example/ai-chat-frontend',
    backend: 'https://github.com/example/ai-chat-backend',
  },
  {
    _id: 'task-dashboard',
    title: 'Task Management Dashboard',
    description: 'A comprehensive task management tool with drag-and-drop functionality and real-time updates.',
    image: 'https://static.wixstatic.com/media/98427a_90b662a47cf444ab8cc848017266e727~mv2.png?originWidth=576&originHeight=384',
    category: 'Web Development',
    tags: ['React', 'Redux', 'Tailwind CSS'],
    liveUrl: 'https://example.com/tasks',
    githubUrl: 'https://github.com/example/tasks',
    frontend: 'https://github.com/example/tasks-frontend',
    backend: 'https://github.com/example/tasks-backend',
  },
  {
    _id: 'social-analytics',
    title: 'Social Media Analytics Tool',
    description: 'An analytics dashboard for tracking social media performance across multiple platforms with detailed insights.',
    image: 'https://static.wixstatic.com/media/98427a_597c216a6b734dd2a7725c7709863039~mv2.png?originWidth=576&originHeight=384',
    category: 'Data Analytics',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
    liveUrl: 'https://example.com/analytics',
    githubUrl: 'https://github.com/example/analytics',
    frontend: 'https://github.com/example/analytics-frontend',
    backend: 'https://github.com/example/analytics-backend',
  },
  {
    _id: 'weather-app',
    title: 'Weather Forecast App',
    description: 'A beautiful weather application with real-time data and detailed forecasts for any location.',
    image: 'https://static.wixstatic.com/media/98427a_93343545a33d4c60ac02187f25224006~mv2.png?originWidth=576&originHeight=384',
    category: 'Web Development',
    tags: ['React', 'OpenWeather API', 'Tailwind CSS'],
    liveUrl: 'https://example.com/weather',
    githubUrl: 'https://github.com/example/weather',
    frontend: 'https://github.com/example/weather-frontend',
  },
  {
    _id: 'ml-trainer',
    title: 'Machine Learning Model Trainer',
    description: 'A web interface for training and testing machine learning models with visualization and real-time feedback.',
    image: 'https://static.wixstatic.com/media/98427a_0461cee5f8924873bf16de234391e0be~mv2.png?originWidth=576&originHeight=384',
    category: 'AI & Machine Learning',
    tags: ['React', 'Python', 'TensorFlow', 'Flask'],
    liveUrl: 'https://example.com/ml-trainer',
    githubUrl: 'https://github.com/example/ml-trainer',
    frontend: 'https://github.com/example/ml-trainer-frontend',
    backend: 'https://github.com/example/ml-trainer-backend',
  },
  {
    _id: 'video-streaming',
    title: 'Video Streaming Platform',
    description: 'A Netflix-like streaming platform with user authentication and content recommendations.',
    image: 'https://static.wixstatic.com/media/98427a_b2f7ff77ccdb4895903271374a933a99~mv2.png?originWidth=576&originHeight=384',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'MongoDB', 'HLS.js'],
    liveUrl: 'https://example.com/streaming',
    githubUrl: 'https://github.com/example/streaming',
    frontend: 'https://github.com/example/streaming-frontend',
    backend: 'https://github.com/example/streaming-backend',
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
    // First try to find in static projects
    const staticProject = staticProjects.find(p => p._id === projectId);
    if (staticProject) {
      setProject(staticProject);
      setIsLoading(false);
      return;
    }
    
    // Otherwise try to load from CMS
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

  const isStaticProject = (p: any): p is ProjectCardProps => '_id' in p && 'image' in p;
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
                              {typeof tech === 'string' ? tech.trim() : tech}
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

            {/* GitHub Links Section */}
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
                {staticProj?.frontend && (
                  <motion.a
                    href={staticProj.frontend}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center gap-3 p-4 bg-black/50 border border-accent-orange/30 hover:border-accent-orange transition-colors group"
                    whileHover={{ scale: 1.02 }}
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

                {staticProj?.backend && (
                  <motion.a
                    href={staticProj.backend}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex items-center gap-3 p-4 bg-black/50 border border-accent-orange/30 hover:border-accent-orange transition-colors group"
                    whileHover={{ scale: 1.02 }}
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

                {(staticProj?.githubUrl || cmsProj?.projectUrl) && !staticProj?.frontend && !staticProj?.backend && (
                  <motion.a
                    href={staticProj?.githubUrl || cmsProj?.projectUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center gap-3 p-4 bg-black/50 border border-accent-orange/30 hover:border-accent-orange transition-colors group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Github className="w-5 h-5 text-accent-orange flex-shrink-0" />
                    <div>
                      <p className="font-heading uppercase text-sm text-light-gray tracking-wider group-hover:text-accent-orange transition-colors">
                        View on GitHub
                      </p>
                      <p className="font-paragraph italic text-xs text-medium-gray">
                        Complete Source Code
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-accent-orange ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                )}

                {!staticProj?.frontend && !staticProj?.backend && !staticProj?.githubUrl && !cmsProj?.projectUrl && (
                  <p className="font-paragraph italic text-lg text-medium-gray text-center py-8">
                    Repository links coming soon
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Key Highlights Section */}
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

          {/* CTA Section */}
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
