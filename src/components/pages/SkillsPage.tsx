import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Skills } from '@/entities';

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
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading uppercase text-7xl md:text-8xl text-primary tracking-wider mb-6">
            <span className="font-paragraph italic text-4xl md:text-5xl">Technical</span> EXPERTISE
          </h1>
          <p className="font-paragraph italic text-xl text-primary max-w-3xl mx-auto">
            A comprehensive toolkit of technologies, frameworks, and methodologies honed through years of practice
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-24">
            <p className="font-heading uppercase text-xl text-primary tracking-wider">
              Loading skills...
            </p>
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-heading uppercase text-xl text-primary tracking-wider">
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
                  <h2 className="font-heading uppercase text-4xl md:text-5xl text-primary tracking-wider mb-2">
                    {category}
                  </h2>
                  <div className="w-24 h-1 bg-secondary mt-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <div className="border-2 border-primary p-8 hover:bg-secondary hover:border-secondary transition-all duration-300">
                        {skill.skillImage && (
                          <div className="w-16 h-16 mb-6">
                            <Image
                              src={skill.skillImage}
                              alt={skill.skillName || 'Skill icon'}
                              className="w-full h-full object-contain"
                              width={64}
                            />
                          </div>
                        )}
                        
                        <h3 className="font-heading uppercase text-2xl text-primary group-hover:text-secondary-foreground tracking-wider mb-3 transition-colors">
                          {skill.skillName}
                        </h3>
                        
                        {skill.description && (
                          <p className="font-paragraph italic text-base text-primary group-hover:text-secondary-foreground mb-4 transition-colors">
                            {skill.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-primary/20 group-hover:border-secondary-foreground/20 transition-colors">
                          {skill.proficiencyLevel && (
                            <span className="font-heading uppercase text-xs text-primary group-hover:text-secondary-foreground tracking-wider transition-colors">
                              {skill.proficiencyLevel}
                            </span>
                          )}
                          
                          {skill.yearsOfExperience !== undefined && (
                            <span className="font-paragraph italic text-sm text-primary group-hover:text-secondary-foreground transition-colors">
                              {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
            className="mt-24 bg-secondary p-12 text-center"
          >
            <h2 className="font-heading uppercase text-3xl text-secondary-foreground tracking-wider mb-8">
              Continuous Learning & Growth
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="font-heading uppercase text-5xl text-secondary-foreground tracking-wider mb-2">
                  {skills.length}
                </p>
                <p className="font-paragraph italic text-lg text-secondary-foreground">
                  Technical Skills
                </p>
              </div>
              <div>
                <p className="font-heading uppercase text-5xl text-secondary-foreground tracking-wider mb-2">
                  {Object.keys(groupedSkills).length}
                </p>
                <p className="font-paragraph italic text-lg text-secondary-foreground">
                  Skill Categories
                </p>
              </div>
              <div>
                <p className="font-heading uppercase text-5xl text-secondary-foreground tracking-wider mb-2">
                  {Math.max(...skills.map(s => s.yearsOfExperience || 0))}+
                </p>
                <p className="font-paragraph italic text-lg text-secondary-foreground">
                  Years Experience
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}
