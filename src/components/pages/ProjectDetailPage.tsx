import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import { ArrowLeft, ExternalLink, Calendar, Code2 } from 'lucide-react';
import { format } from 'date-fns';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Projects | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProject(id);
    }
  }, [id]);

  const loadProject = async (projectId: string) => {
    setIsLoading(true);
    const projectData = await BaseCrudService.getById<Projects>('projects', projectId);
    setProject(projectData);
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
          {project.thumbnail && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-[16/9] mb-12 overflow-hidden bg-charcoal"
            >
              <Image
                src={project.thumbnail}
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
                {project.technologies && (
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
                        <p className="font-paragraph italic text-lg text-light-gray">
                          {project.technologies}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {project.completionDate && (
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
                          {format(new Date(project.completionDate), 'MMMM yyyy')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {project.projectUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <p className="font-heading uppercase text-sm text-medium-gray tracking-wider mb-2 opacity-70">
                      Live Project
                    </p>
                    <a
                      href={project.projectUrl}
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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-charcoal border-2 border-accent-orange/30 p-8"
            >
              <h2 className="font-heading uppercase text-2xl text-accent-orange tracking-wider font-bold mb-6">
                Key Highlights
              </h2>
              <div className="space-y-4">
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
          </div>

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
