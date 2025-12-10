import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface ProjectCardProps { 
  id?: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  githubUrl?: {
    frontend?: string;
    backend?: string;
  };
  liveUrl?: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full bg-charcoal border border-accent-orange/20 overflow-hidden hover:border-accent-orange/50 transition-colors duration-300 group"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden aspect-[4/3] bg-charcoal">
        <Image
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          width={600}
        />
        <motion.div
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6 space-y-4">
        {/* Title */}
        <h3 className="font-heading uppercase text-xl text-white tracking-wider group-hover:text-accent-orange transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="font-paragraph italic text-base text-light-gray line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Tags */}
        

        {/* Buttons Section */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-accent-orange/20">
          {id && (
            <motion.button
              onClick={() => navigate(`/portfolio/${id}`)}
              className="flex-1 flex items-center justify-center gap-2 bg-accent-orange text-black font-heading uppercase text-sm tracking-wider font-bold py-3 hover:bg-accent-orange-soft transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Details
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
          {/* GitHub Buttons */}
{githubUrl?.frontend && (
  <a
    href={githubUrl.frontend}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 flex items-center justify-center gap-2 border-2 border-accent-orange text-accent-orange font-heading uppercase text-sm tracking-wider font-bold py-3 hover:bg-accent-orange hover:text-black transition-colors duration-300"
  >
    <Github className="w-4 h-4" />
    Frontend
  </a>
)}

{githubUrl?.backend && (
  <a
    href={githubUrl.backend}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 flex items-center justify-center gap-2 border-2 border-accent-orange text-accent-orange font-heading uppercase text-sm tracking-wider font-bold py-3 hover:bg-accent-orange hover:text-black transition-colors duration-300"
  >
    <Github className="w-4 h-4" />
    Backend
  </a>
)}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 border-2 border-accent-orange/50 text-light-gray font-heading uppercase text-sm tracking-wider font-bold py-3 hover:border-accent-orange hover:text-accent-orange transition-colors duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
