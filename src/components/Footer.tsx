import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-charcoal border-t border-accent-orange/30">
      <div className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading uppercase text-lg font-bold text-accent-orange tracking-wider mb-3">
              Developer
            </h3>
            <p className="font-paragraph italic text-base text-light-gray">
              Crafting digital experiences with modern technologies
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading uppercase text-lg font-bold text-accent-orange tracking-wider mb-3">
              Quick Links
            </h3>
            <div className="space-y-2">
              <p className="font-paragraph italic text-base text-light-gray hover:text-accent-orange transition-colors cursor-pointer">
                
                <Link
  to="/portfolio"
  className="text-accent-orange hover:underline"
>
  Portfolio
</Link>

              </p>
              <p className="font-paragraph italic text-base text-light-gray hover:text-accent-orange transition-colors cursor-pointer">
                
                <Link
  to="/skills"
  className="text-accent-orange hover:underline"
>
  Skills
</Link>

              </p>
              <p className="font-paragraph italic text-base text-light-gray hover:text-accent-orange transition-colors cursor-pointer">
                
                <Link
  to="/certificates"
  className="text-accent-orange hover:underline"
>
  Certifications
</Link>

              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading uppercase text-lg font-bold text-accent-orange tracking-wider mb-3">
              Connect
            </h3>
            <p className="font-paragraph italic text-base text-light-gray">
              Ready to collaborate on your next project
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-accent-orange/20"
        >
          <p className="font-heading uppercase text-xs text-medium-gray tracking-wider text-center">
            © 2025 Knox Chase. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
