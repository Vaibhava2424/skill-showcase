import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Certificates } from '@/entities';
import { ExternalLink, Award, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificates[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<Certificates>('certificates');
    // Sort by issue date, newest first
    const sortedItems = items.sort((a, b) => {
      if (!a.issueDate) return 1;
      if (!b.issueDate) return -1;
      return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
    });
    setCertificates(sortedItems);
    setIsLoading(false);
  };

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
            <span className="font-paragraph italic text-4xl md:text-5xl">Professional</span> CERTIFICATIONS
          </h1>
          <p className="font-paragraph italic text-xl text-primary max-w-3xl mx-auto">
            Validated expertise through industry-recognized credentials and continuous professional development
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-24">
            <p className="font-heading uppercase text-xl text-primary tracking-wider">
              Loading certificates...
            </p>
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-heading uppercase text-xl text-primary tracking-wider">
              No certificates found
            </p>
          </div>
        ) : (
          <>
            {/* Certificates Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
              {certificates.map((certificate, index) => (
                <motion.div
                  key={certificate._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="border-2 border-primary hover:border-secondary transition-colors duration-300">
                    {certificate.certificateImage && (
                      <div className="relative w-full aspect-[16/10] overflow-hidden">
                        <Image
                          src={certificate.certificateImage}
                          alt={certificate.title || 'Certificate'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          width={800}
                        />
                      </div>
                    )}
                    
                    <div className="p-8">
                      <div className="flex items-start gap-3 mb-4">
                        <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <h3 className="font-heading uppercase text-2xl text-primary tracking-wider">
                          {certificate.title}
                        </h3>
                      </div>
                      
                      {certificate.issuingOrganization && (
                        <p className="font-paragraph italic text-lg text-primary mb-4">
                          {certificate.issuingOrganization}
                        </p>
                      )}
                      
                      <div className="space-y-3 mb-6">
                        {certificate.issueDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary opacity-70" />
                            <p className="font-heading uppercase text-sm text-primary tracking-wider opacity-70">
                              Issued {format(new Date(certificate.issueDate), 'MMMM yyyy')}
                            </p>
                          </div>
                        )}
                        
                        {certificate.credentialId && (
                          <p className="font-heading uppercase text-xs text-primary tracking-wider opacity-70">
                            ID: {certificate.credentialId}
                          </p>
                        )}
                      </div>
                      
                      {certificate.credentialUrl && (
                        <a
                          href={certificate.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-heading uppercase text-sm text-primary tracking-wider hover:opacity-70 transition-opacity border-2 border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground"
                        >
                          Verify Credential
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-secondary p-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="font-heading uppercase text-5xl text-secondary-foreground tracking-wider mb-2">
                    {certificates.length}
                  </p>
                  <p className="font-paragraph italic text-lg text-secondary-foreground">
                    Professional Certifications
                  </p>
                </div>
                <div>
                  <p className="font-heading uppercase text-5xl text-secondary-foreground tracking-wider mb-2">
                    {new Set(certificates.map(c => c.issuingOrganization)).size}
                  </p>
                  <p className="font-paragraph italic text-lg text-secondary-foreground">
                    Issuing Organizations
                  </p>
                </div>
                <div>
                  <p className="font-heading uppercase text-5xl text-secondary-foreground tracking-wider mb-2">
                    100%
                  </p>
                  <p className="font-paragraph italic text-lg text-secondary-foreground">
                    Verified Credentials
                  </p>
                </div>
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
              <h2 className="font-heading uppercase text-4xl text-primary tracking-wider mb-6">
                Commitment to Excellence
              </h2>
              <p className="font-paragraph italic text-xl text-primary max-w-3xl mx-auto mb-8">
                These certifications represent a dedication to staying current with industry best practices, 
                emerging technologies, and professional standards in software development.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="p-6">
                  <h3 className="font-heading uppercase text-xl text-primary tracking-wider mb-3">
                    Continuous Learning
                  </h3>
                  <p className="font-paragraph italic text-base text-primary">
                    Regularly updating skills through courses and certifications
                  </p>
                </div>
                <div className="p-6 bg-secondary">
                  <h3 className="font-heading uppercase text-xl text-secondary-foreground tracking-wider mb-3">
                    Industry Standards
                  </h3>
                  <p className="font-paragraph italic text-base text-secondary-foreground">
                    Following best practices and proven methodologies
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="font-heading uppercase text-xl text-primary tracking-wider mb-3">
                    Verified Expertise
                  </h3>
                  <p className="font-paragraph italic text-base text-primary">
                    Credentials validated by leading tech organizations
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
