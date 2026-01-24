import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Certificates } from '@/entities';
import { ExternalLink, Award } from 'lucide-react';

const certVariants = {
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

const staticCertificates: Certificates[] = [
  {
    _id: '1',
    id: 1,
    title: 'Ethical Hacking 101 Workshop',
    description: 'Comprehensive workshop covering ethical hacking principles, penetration testing methodologies, and security best practices.',
    liveUrl: 'https://cdn1.ccbp.in/misc/niat_ethical_101_part/M0RWF5X8PJ.png',
    fallbackText: 'links yet to be added',
  },
  {
    _id: '2',
    id: 2,
    title: 'UI/UX Participation Certificate',
    description: 'Participation certificate for completing the UI/UX project/workshop.',
    liveUrl: 'https://cdn1.ccbp.in/misc/UI_UX_participation/U9XIAM43IO.png',
    fallbackText: 'links yet to be added',
  },
  {
    _id: '3',
    id: 3,
    title: 'UI/UX Accomplishment Certificate',
    description: 'Accomplishment certificate for completing the UI/UX project/workshop successfully.',
    liveUrl: 'https://cdn1.ccbp.in/misc/UI_UX_Accomplishment/OHPF52ZIC2.png',
    fallbackText: 'links yet to be added',
  },
  {
    _id: '4',
    id: 4,
    title: 'The MCP Magic Workshop',
    description: 'An introductory session exploring how MCP-style automation streamlines workflows and enhances digital efficiency. Designed to help participants understand intelligent control systems and their practical applications.',
    liveUrl: '',
    fallbackText: 'links yet to be added',
  },
  {
    _id: '5',
    id: 5,
    title: 'Robotic Arm 101 Workshop',
    description: 'A foundational workshop introducing robotic arm mechanisms, motion control, and real-world automation. Helps participants understand how robotic arms operate and how they are programmed for precision tasks.',
    liveUrl: '',
    fallbackText: 'links yet to be added',
  },
];


export default function CertificatesPage() {
  const certificates = staticCertificates;

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
          <h1 className="font-heading uppercase text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white tracking-wider font-black mb-6">
            <span className="text-accent-orange">Professional</span> CERTIFICATIONS
          </h1>
          <p className="font-paragraph italic text-xl text-light-gray max-w-3xl mx-auto">
            Validated expertise through industry-recognized credentials and continuous professional development
          </p>
        </motion.div>

        {certificates.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-heading uppercase text-xl text-accent-orange tracking-wider">
              No certificates found
            </p>
          </div>
        ) : (
          <>
            {/* Certificates Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24"
            >
              <AnimatePresence mode="popLayout">
                {certificates.map((certificate, index) => (
                  <motion.div
                    key={certificate._id}
                    custom={index}
                    variants={certVariants}
                    initial="hidden"
                    animate="visible"
                    layout
                    className="group"
                  >
                    <motion.div
                      className="border-2 border-accent-orange/30 hover:border-accent-orange transition-colors duration-300 h-full flex flex-col"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-8 flex-1 flex flex-col">
                        <div className="flex items-start gap-3 mb-4">
                          <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Award className="w-6 h-6 text-accent-orange flex-shrink-0 mt-1" />
                          </motion.div>
                          <h3 className="font-heading uppercase text-2xl text-white tracking-wider font-black">
                            {certificate.title}
                          </h3>
                        </div>
                        
                        {certificate.description && (
                          <p className="font-paragraph italic text-lg text-light-gray mb-6 flex-1">
                            {certificate.description}
                          </p>
                        )}
                        
                        {certificate.liveUrl ? (
                          <motion.a
                            href={certificate.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-heading uppercase text-sm text-accent-orange tracking-wider hover:text-accent-orange-soft transition-colors border-2 border-accent-orange/30 px-4 py-2 hover:border-accent-orange hover:bg-accent-orange/10 w-fit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View Certificate
                            <motion.div
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </motion.div>
                          </motion.a>
                        ) : (
                          <p className="font-heading uppercase text-sm text-medium-gray tracking-wider opacity-70">
                            {certificate.fallbackText || 'links yet to be added'}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-charcoal border-2 border-accent-orange/30 p-12 hover:border-accent-orange transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                {[
                  { label: certificates.length, desc: 'Professional Certifications' },
                  { label: 100, desc: 'Verified Credentials' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.p
                      className="font-heading uppercase text-5xl text-accent-orange tracking-wider font-black mb-2"
                      whileHover={{ scale: 1.1 }}
                    >
                      {stat.label}%
                    </motion.p>
                    <p className="font-paragraph italic text-lg text-light-gray">
                      {stat.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Commitment Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-24 text-center"
            >
              <h2 className="font-heading uppercase text-4xl text-white tracking-wider font-black mb-6">
                Commitment to <span className="text-accent-orange">Excellence</span>
              </h2>
              <p className="font-paragraph italic text-xl text-light-gray max-w-3xl mx-auto mb-8">
                These certifications represent a dedication to staying current with industry best practices, 
                emerging technologies, and professional standards in software development.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[
                  {
                    title: 'Continuous Learning',
                    desc: 'Regularly updating skills through courses and certifications'
                  },
                  {
                    title: 'Industry Standards',
                    desc: 'Following best practices and proven methodologies'
                  },
                  {
                    title: 'Verified Expertise',
                    desc: 'Credentials validated by leading tech organizations'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`p-6 border-2 ${index === 1 ? 'bg-accent-orange/10 border-accent-orange' : 'border-accent-orange/30 hover:border-accent-orange'} transition-colors`}
                  >
                    <h3 className="font-heading uppercase text-xl text-white tracking-wider font-black mb-3">
                      {item.title}
                    </h3>
                    <p className="font-paragraph italic text-base text-light-gray">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
