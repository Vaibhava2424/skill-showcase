import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import { ArrowLeft, ExternalLink, Calendar } from 'lucide-react';
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
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[100rem] mx-auto px-8 py-24 text-center">
          <p className="font-heading uppercase text-xl text-primary tracking-wider">
            Loading project...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[100rem] mx-auto px-8 py-24 text-center">
          <p className="font-heading uppercase text-xl text-primary tracking-wider mb-4">
            Project not found
          </p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 font-paragraph italic text-lg text-primary hover:opacity-70 transition-opacity"
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
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Back Button */}
      <div className="max-w-[100rem] mx-auto px-8 pt-8">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 font-heading uppercase text-sm text-primary tracking-wider hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
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
              <span className="inline-block font-heading uppercase text-xs text-secondary-foreground bg-secondary px-4 py-2 tracking-wider mb-4">
                {project.category}
              </span>
            )}
            <h1 className="font-heading uppercase text-6xl md:text-7xl text-primary tracking-wider mb-6">
              {project.title}
            </h1>
            {project.description && (
              <p className="font-paragraph italic text-2xl text-primary max-w-4xl">
                {project.description}
              </p>
            )}
          </div>

          {/* Project Image */}
          {project.thumbnail && (
            <div className="relative w-full aspect-[16/9] mb-12">
              <Image
                src={project.thumbnail}
                alt={project.title || 'Project image'}
                className="w-full h-full object-cover"
                width={1600}
              />
            </div>
          )}

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-heading uppercase text-2xl text-primary tracking-wider mb-6">
                Project Details
              </h2>
              
              <div className="space-y-6">
                {project.technologies && (
                  <div>
                    <p className="font-heading uppercase text-sm text-primary tracking-wider mb-2 opacity-70">
                      Technologies
                    </p>
                    <p className="font-paragraph italic text-lg text-primary">
                      {project.technologies}
                    </p>
                  </div>
                )}

                {project.completionDate && (
                  <div>
                    <p className="font-heading uppercase text-sm text-primary tracking-wider mb-2 opacity-70">
                      Completion Date
                    </p>
                    <p className="font-paragraph italic text-lg text-primary flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      {format(new Date(project.completionDate), 'MMMM yyyy')}
                    </p>
                  </div>
                )}

                {project.projectUrl && (
                  <div>
                    <p className="font-heading uppercase text-sm text-primary tracking-wider mb-2 opacity-70">
                      Live Project
                    </p>
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-paragraph italic text-lg text-primary hover:opacity-70 transition-opacity"
                    >
                      Visit Website
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-secondary p-8">
              <h2 className="font-heading uppercase text-2xl text-secondary-foreground tracking-wider mb-6">
                Key Highlights
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary-foreground mt-2 flex-shrink-0" />
                  <p className="font-paragraph italic text-lg text-secondary-foreground">
                    Innovative design approach with modern aesthetics
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary-foreground mt-2 flex-shrink-0" />
                  <p className="font-paragraph italic text-lg text-secondary-foreground">
                    Fully responsive across all devices and screen sizes
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary-foreground mt-2 flex-shrink-0" />
                  <p className="font-paragraph italic text-lg text-secondary-foreground">
                    Optimized performance and accessibility standards
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary-foreground mt-2 flex-shrink-0" />
                  <p className="font-paragraph italic text-lg text-secondary-foreground">
                    Clean, maintainable code architecture
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-12 border-t-2 border-primary/10">
            <h3 className="font-heading uppercase text-3xl text-primary tracking-wider mb-4">
              Interested in similar work?
            </h3>
            <p className="font-paragraph italic text-xl text-primary mb-8">
              Let's discuss your next project
            </p>
            <Link
              to="/portfolio"
              className="inline-block border-2 border-primary px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <span className="font-heading uppercase text-sm tracking-wider">
                View More Projects
              </span>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
