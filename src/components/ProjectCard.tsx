import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ExternalLink, Github } from 'lucide-react';

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
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
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-heading uppercase text-xs text-black bg-accent-orange px-3 py-1 tracking-wider font-bold"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Buttons Section */}
        <div className="flex gap-3 pt-4 border-t border-accent-orange/20">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-accent-orange text-black font-heading uppercase text-sm tracking-wider font-bold py-3 hover:bg-accent-orange-soft transition-colors duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              View Live
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 border-2 border-accent-orange text-accent-orange font-heading uppercase text-sm tracking-wider font-bold py-3 hover:bg-accent-orange hover:text-black transition-colors duration-300"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
