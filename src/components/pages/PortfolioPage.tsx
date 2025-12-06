import { projectsList } from "@/data/projectsList";

export default function ProjectsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projectsList.map((project) => (
        <div
          key={project.id}
          className="bg-[#111] rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition duration-300"
        >
          {/* Project Image */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-56 object-cover"
          />

          {/* Content */}
          <div className="p-5">
            <h3 className="text-xl font-bold text-white mb-2">
              {project.title}
            </h3>

            <p className="text-gray-400 text-sm mb-4">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Link */}
            <a
              href={project.link}
              target="_blank"
              className="text-accent-orange underline font-medium"
            >
              Visit Project →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
