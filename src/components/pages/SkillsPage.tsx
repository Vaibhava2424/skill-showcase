import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
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

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<Skills>('skills');
    setSkills(items);
    setIsLoading(false);
  };

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
