import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Skills } from '@/entities';

const skillVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
    },
  }),
};

// ---------------------------------------------
// STATIC SKILLS ARRAY
// ---------------------------------------------
const staticSkills: Skills[] = [
  // Frontend
  {
    _id: '1',
    skillName: 'HTML',
    category: 'Frontend Development',
    skillImage: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    description: 'Creating structured, semantic, and accessible markup for modern web applications.',
  },
  {
    _id: '2',
    skillName: 'CSS',
    category: 'Frontend Development',
    skillImage: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    description: 'Crafting responsive, elegant UI layouts with animations, grids, and modern styling techniques.',
  },
  {
    _id: '3',
    skillName: 'JavaScript',
    category: 'Frontend Development',
    skillImage: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    description: 'Building interactive client-side logic, DOM manipulation, and asynchronous functionalities.',
  },
  {
    _id: '4',
    skillName: 'React.js',
    category: 'Frontend Development',
    skillImage: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    description: 'Building interactive and dynamic interfaces using components, hooks, and state management.',
  },
  {
    _id: '5',
    skillName: 'Next.js',
    category: 'Frontend Development',
    skillImage: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    description: 'Developing fast, SEO-friendly applications with SSR, routing, API routes, and server components.',
  },
  {
    _id: '6',
    skillName: 'Tailwind CSS',
    category: 'Frontend Development',
    skillImage: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
    description: 'Building modern, responsive UI with utility-first classes and customizable design systems.',
  },
  {
    _id: '7',
    skillName: 'Bootstrap',
    category: 'Frontend Development',
    skillImage: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
    description: 'Creating responsive layouts quickly using components, grid systems, and utilities.',
  },

  // Backend
  {
    _id: '8',
    skillName: 'Node.js',
    category: 'Backend Development',
    skillImage: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    description: 'Building scalable, event-driven backend services using JavaScript on the server.',
  },
  {
    _id: '9',
    skillName: 'Express.js',
    category: 'Backend Development',
    skillImage: 'https://res.cloudinary.com/dodfv5sbg/image/upload/v1765434636/download_eeshlq.png',
    description: 'Developing REST APIs, routing, middleware, and backend architecture with Express.',
  },
  {
    _id: '10',
    skillName: 'JWT Authentication',
    category: 'Backend Development',
    skillImage: 'https://res.cloudinary.com/dodfv5sbg/image/upload/v1765434327/download_cevgkh.png',
    description: 'Implementing secure authentication, authorization, and token-based user access.',
  },
  {
    _id: '11',
    skillName: 'REST APIs',
    category: 'Backend Development',
    skillImage: 'https://img.icons8.com/ios-filled/100/ffffff/api.png',
    description: 'Designing and integrating scalable API endpoints for frontend and mobile apps.',
  },

  // Databases
  {
    _id: '12',
    skillName: 'MongoDB',
    category: 'Databases',
    skillImage: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    description: 'Storing and retrieving application data using NoSQL documents and flexible schemas.',
  },
  {
    _id: '13',
    skillName: 'MongoDB Atlas',
    category: 'Databases',
    skillImage: 'https://img.icons8.com/color/100/mongodb.png',
    description: 'Deploying and scaling cloud-hosted databases with automated backups and monitoring.',
  },

  // Cloud & Deployment
  {
    _id: '14',
    skillName: 'Vercel',
    category: 'Cloud and Deployment Platforms',
    skillImage: 'https://res.cloudinary.com/dodfv5sbg/image/upload/v1765434139/download_zzhf3m.png',
    description: 'Deploying lightning-fast frontend and Next.js applications with CI/CD and analytics.',
  },
  {
    _id: '15',
    skillName: 'Netlify',
    category: 'Cloud and Deployment Platforms',
    skillImage: 'https://www.netlify.com/v3/img/components/logomark.png',
    description: 'Deploying static sites, handling forms, and managing serverless functions.',
  },
  {
    _id: '16',
    skillName: 'Render',
    category: 'Cloud and Deployment Platforms',
    skillImage: 'https://res.cloudinary.com/dodfv5sbg/image/upload/v1765434195/download_nxaet8.png',
    description: 'Hosting backend APIs, cron jobs, background tasks, and web services on Render.',
  },

  // UI/UX Tools
  {
    _id: '17',
    skillName: 'Figma',
    category: 'UI/UX & Tools',
    skillImage: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    description: 'Designing user interfaces, prototypes, wireframes, and collaborative design flows.',
  },
  {
    _id: '18',
    skillName: 'Framer',
    category: 'UI/UX & Tools',
    skillImage: 'https://res.cloudinary.com/dodfv5sbg/image/upload/v1765434872/images_s2i9gn.jpg',
    description: 'Creating animated prototypes and full no-code websites using Framer features.',
  },
  {
    _id: '19',
    skillName: 'Builder.io',
    category: 'UI/UX & Tools',
    skillImage: 'https://res.cloudinary.com/dodfv5sbg/image/upload/v1765435362/Screenshot_2025-12-11_121218_eeryrt.png',
    description: 'Developing visual pages and components with drag-and-drop integrated workflows.',
  },
  {
    _id: '20',
    skillName: 'Relume',
    category: 'UI/UX & Tools',
    skillImage: 'https://res.cloudinary.com/dodfv5sbg/image/upload/v1765434972/download_uyyf7p.png',
    description: 'Building Webflow-ready components, sitemaps, and AI-generated layouts.',
  },

  // Other Skills
  {
    _id: '21',
    skillName: 'Git',
    category: 'Other Technical Skills',
    skillImage: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    description: 'Managing project versions, branches, commits, and collaborative workflows.',
  },
  {
    _id: '22',
    skillName: 'GitHub',
    category: 'Other Technical Skills',
    skillImage: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    description: 'Hosting repositories, reviewing pull requests, and managing CI/CD pipelines.',
  },
  {
    _id: '23',
    skillName: 'Linux Basics',
    category: 'Other Technical Skills',
    skillImage: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    description: 'Working with file systems, permissions, commands, and server-side environments.',
  },
  {
    _id: '24',
    skillName: 'API Integration',
    category: 'Other Technical Skills',
    skillImage: 'https://img.icons8.com/ios-filled/100/api-settings.png',
    description: 'Connecting third-party services, handling JSON, and implementing external endpoints.',
  },
];



export default function SkillsPage() {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ---------------------------------------------
  // LOAD STATIC SKILLS (NO DATABASE)
  // ---------------------------------------------
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setSkills(staticSkills);
      setIsLoading(false);
    }, 300);
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skills[]>);

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
            <span className="text-accent-orange">Technical</span> EXPERTISE
          </h1>
          <p className="font-paragraph italic text-xl text-light-gray max-w-3xl mx-auto">
            A comprehensive toolkit of technologies, frameworks, and methodologies honed through years of practice
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-24">
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-heading uppercase text-xl text-accent-orange tracking-wider"
            >
              Loading skills...
            </motion.p>
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-heading uppercase text-xl text-accent-orange tracking-wider">
              No skills found
            </p>
          </div>
        ) : (
          <div className="space-y-24">
            {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <div className="mb-12">
                  <h2 className="font-heading uppercase text-4xl md:text-5xl text-white tracking-wider font-black mb-4">
                    {category}
                  </h2>
                  <motion.div
                    className="w-24 h-1 bg-accent-orange"
                    initial={{ width: 0 }}
                    animate={{ width: 96 }}
                    transition={{ duration: 0.8, delay: categoryIndex * 0.1 + 0.2 }}
                  />
                </div>

                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {categorySkills.map((skill, index) => (
                      <motion.div
                        key={skill._id}
                        custom={index}
                        variants={skillVariants}
                        initial="hidden"
                        animate="visible"
                        layout
                        className="group"
                      >
                        <motion.div
                          className="border-2 border-accent-orange/30 p-8 h-full hover:border-accent-orange hover:bg-accent-orange/10 transition-all duration-300 cursor-pointer"
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          {skill.skillImage && (
                            <motion.div
                              className="w-16 h-16 mb-6"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Image
                                src={skill.skillImage}
                                alt={skill.skillName || 'Skill icon'}
                                className="w-full h-full object-contain"
                                width={64}
                              />
                            </motion.div>
                          )}

                          <h3 className="font-heading uppercase text-2xl text-accent-orange tracking-wider font-black mb-3">
                            {skill.skillName}
                          </h3>

                          {skill.description && (
                            <p className="font-paragraph italic text-base text-light-gray mb-4">
                              {skill.description}
                            </p>
                          )}
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {!isLoading && skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-24 bg-charcoal border-2 border-accent-orange/30 p-12 hover:border-accent-orange transition-colors"
          >
            <h2 className="font-heading uppercase text-3xl text-white tracking-wider font-black mb-8 text-center">
              Continuous Learning & <span className="text-accent-orange">Growth</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: skills.length, desc: 'Technical Skills' },
                { label: Object.keys(groupedSkills).length, desc: 'Skill Categories' },
                { label: Math.max(...skills.map(s => s.yearsOfExperience || 0)), desc: 'Years Experience' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.p
                    className="font-heading uppercase text-5xl text-accent-orange tracking-wider font-black mb-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.label}+
                  </motion.p>
                  <p className="font-paragraph italic text-lg text-light-gray">
                    {stat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}
