// HPI 1.6-V
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { ArrowRight, Code2, Zap, Palette, ArrowDownRight, Globe, Layers, Cpu } from 'lucide-react';

// --- Types & Interfaces ---
interface StatItem {
  label: string;
  desc: string;
}

interface ExpertiseItem {
  icon: React.ElementType;
  title: string;
  desc: string;
  tags: string[];
}

// --- Canonical Data Sources ---
const STATS_DATA: StatItem[] = [
  { label: '5+', desc: 'Years Experience' },
  { label: '50+', desc: 'Projects Completed' },
  { label: '15+', desc: 'Technologies' },
  { label: '100%', desc: 'Client Satisfaction' }
];

const EXPERTISE_DATA: ExpertiseItem[] = [
  { 
    icon: Code2, 
    title: 'Frontend Development', 
    desc: 'Crafting responsive, accessible interfaces with React, TypeScript, and modern CSS frameworks.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion']
  },
  { 
    icon: Zap, 
    title: 'Full-Stack Solutions', 
    desc: 'Building complete applications with MERN stack, database design, and API development.',
    tags: ['Node.js', 'PostgreSQL', 'REST APIs', 'GraphQL']
  },
  { 
    icon: Palette, 
    title: 'AI Integration', 
    desc: 'Implementing intelligent features and machine learning capabilities into web applications.',
    tags: ['OpenAI API', 'TensorFlow.js', 'Predictive UI', 'Automation']
  }
];

// --- Utility Components ---

// Mandatory AnimatedElement for Scroll Reveals
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Add a small delay via style if needed, or just let CSS handle it
        setTimeout(() => {
            element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.15 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref} className={`reveal-on-scroll ${className || ''}`}>{children}</div>;
};

// Parallax Image Component using IntersectionObserver for performance
const ParallaxImage: React.FC<{ src: string; alt: string; className?: string; speed?: number }> = ({ src, alt, className, speed = 0.5 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const img = imgRef.current;
        if (!container || !img) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.addEventListener('scroll', handleScroll);
                } else {
                    window.removeEventListener('scroll', handleScroll);
                }
            });
        });

        const handleScroll = () => {
            if (!container) return;
            const rect = container.getBoundingClientRect();
            const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            // Clamp progress between 0 and 1 for safety, though we want the effect to continue
            const yPos = (scrollProgress - 0.5) * 100 * speed; 
            img.style.transform = `translateY(${yPos}px) scale(1.1)`;
        };

        observer.observe(container);
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [speed]);

    return (
        <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
            <div ref={imgRef} className="w-full h-full transition-transform duration-75 ease-linear will-change-transform">
                <Image src={src} alt={alt} width={1200} className="w-full h-full object-cover" />
            </div>
        </div>
    );
};

export default function HomePage() {
  // Scroll progress for global effects
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent-orange selection:text-black overflow-x-clip">
      {/* Global Styles for Custom Animations */}
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .text-stroke-orange {
          -webkit-text-stroke: 1px #FF6A00;
          color: transparent;
        }
        
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }

        .grain-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 50;
            opacity: 0.03;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>

      <div className="grain-overlay" />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent-orange origin-left z-[100]"
        style={{ scaleX }}
      />

      <Header />

      <main>
        {/* --- HERO SECTION --- */}
        {/* Replicating structure of "The MOOD SWINGER" */}
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center pt-20 pb-12 px-4 md:px-8 overflow-hidden">
            
            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-accent-orange rounded-full blur-[120px] animate-pulse duration-[10s]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-accent-orange-soft rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-[110rem] mx-auto flex flex-col items-center">
                
                {/* Top Row Text */}
                <div className="w-full flex justify-between items-end mb-4 md:mb-8 px-2">
                    <AnimatedElement delay={200}>
                        <span className="font-heading font-bold text-xs md:text-sm tracking-[0.2em] text-accent-orange uppercase">
                            Portfolio 2025
                        </span>
                    </AnimatedElement>
                    <AnimatedElement delay={400}>
                        <span className="font-heading font-bold text-xs md:text-sm tracking-[0.2em] text-white uppercase">
                            Available for Hire
                        </span>
                    </AnimatedElement>
                </div>

                {/* Main Typography Composition */}
                <div className="relative w-full text-center">
                    <AnimatedElement className="relative z-20 mix-blend-difference">
                        <h1 className="flex flex-col items-center justify-center leading-[0.85]">
                            <span className="font-paragraph italic text-5xl md:text-7xl lg:text-9xl text-accent-orange self-start md:self-center md:-ml-[30%] mb-2 md:mb-4">
                                The
                            </span>
                            <span className="font-heading font-black text-[12vw] md:text-[11vw] text-white tracking-tighter uppercase">
                                Creative
                            </span>
                            <span className="font-heading font-black text-[12vw] md:text-[11vw] text-accent-orange tracking-tighter uppercase md:-mt-4">
                                Developer
                            </span>
                        </h1>
                    </AnimatedElement>

                    {/* Central Image - Abstract Technology Illustration */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[350px] lg:w-[450px] aspect-[3/4] z-10 pointer-events-none mix-blend-normal">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                            className="w-full h-full"
                        >
                            <ParallaxImage 
                                src="https://static.wixstatic.com/media/98427a_b27c25d095bd4786901b7b8234c3f04c~mv2.png?originWidth=448&originHeight=576"
                                alt="Abstract technology illustration with geometric shapes and digital patterns"
                                className="w-full h-full object-cover shadow-2xl shadow-accent-orange/20"
                                speed={0.2}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Row Info */}
                <div className="w-full flex justify-between items-end mt-12 md:mt-24 px-2">
                    <AnimatedElement delay={600} className="max-w-xs hidden md:block">
                        <p className="font-paragraph text-medium-gray text-sm leading-relaxed">
                            Specializing in high-performance React applications and immersive digital experiences.
                        </p>
                    </AnimatedElement>
                    
                    <AnimatedElement delay={800}>
                        <div className="flex flex-col items-center gap-2">
                            <span className="font-heading text-xs tracking-widest text-accent-orange">SCROLL</span>
                            <motion.div 
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-[1px] h-12 bg-gradient-to-b from-accent-orange to-transparent"
                            />
                        </div>
                    </AnimatedElement>

                    <AnimatedElement delay={700} className="max-w-xs text-right hidden md:block">
                        <p className="font-paragraph text-medium-gray text-sm leading-relaxed">
                            Based in the Digital Realm.<br/>
                            Working Worldwide.
                        </p>
                    </AnimatedElement>
                </div>
            </div>
        </section>

        {/* --- NARRATIVE / ABOUT SECTION --- */}
        <section className="w-full bg-charcoal py-24 md:py-32 relative overflow-hidden">
            {/* Decorative Divider */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-medium-gray/30 to-transparent" />

            <div className="max-w-[110rem] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    
                    {/* Sticky Title */}
                    <div className="lg:col-span-4 relative">
                        <div className="sticky top-32">
                            <AnimatedElement>
                                <h2 className="font-heading font-black text-5xl md:text-7xl text-white uppercase leading-none mb-8">
                                    Full<span className="text-accent-orange">Stack</span><br/>
                                    Vision
                                </h2>
                            </AnimatedElement>
                            <AnimatedElement delay={200}>
                                <div className="w-24 h-2 bg-accent-orange mb-8" />
                            </AnimatedElement>
                            <AnimatedElement delay={300}>
                                <p className="font-paragraph text-lg text-light-gray/80 italic leading-relaxed max-w-md">
                                    "I don't just write code; I architect digital ecosystems that breathe, react, and evolve."
                                </p>
                            </AnimatedElement>
                        </div>
                    </div>

                    {/* Scrolling Content */}
                    <div className="lg:col-span-8 flex flex-col gap-20">
                        <AnimatedElement>
                            <p className="font-heading text-2xl md:text-4xl text-white leading-tight font-light">
                                In a world of static templates, I build <span className="text-accent-orange font-bold">living interfaces</span>. 
                                Combining technical precision with artistic intuition to create web applications that leave a lasting impression.
                            </p>
                        </AnimatedElement>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-white/10 pt-12">
                            {STATS_DATA.map((stat, index) => (
                                <AnimatedElement key={index} delay={index * 100}>
                                    <div className="group p-6 bg-black/30 border border-white/5 hover:border-accent-orange/50 transition-colors duration-500 h-full flex flex-col justify-between">
                                        <span className="font-heading font-black text-4xl md:text-5xl text-white group-hover:text-accent-orange transition-colors duration-300">
                                            {stat.label}
                                        </span>
                                        <span className="font-paragraph text-sm text-medium-gray mt-2 group-hover:text-white transition-colors duration-300">
                                            {stat.desc}
                                        </span>
                                    </div>
                                </AnimatedElement>
                            ))}
                        </div>

                        {/* Large Image Break */}
                        <AnimatedElement className="w-full aspect-video md:aspect-[21/9] mt-8">
                            <ParallaxImage 
                                src="https://static.wixstatic.com/media/98427a_9d28fa56b68c4af3aff677710489607a~mv2.png?originWidth=1152&originHeight=640"
                                alt="Developer workspace setup"
                                className="w-full h-full rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
                                speed={0.1}
                            />
                        </AnimatedElement>
                    </div>
                </div>
            </div>
        </section>

        {/* --- EXPERTISE SECTION (Sticky Cards) --- */}
        <section className="w-full bg-black py-32 relative">
            <div className="max-w-[110rem] mx-auto px-4 md:px-8 mb-24">
                <AnimatedElement>
                    <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/20 pb-8">
                        <h2 className="font-heading font-black text-6xl md:text-8xl text-white uppercase tracking-tighter">
                            Core <span className="text-stroke-orange">Expertise</span>
                        </h2>
                        <Link to="/skills" className="group flex items-center gap-2 text-accent-orange font-heading font-bold uppercase tracking-widest mt-6 md:mt-0">
                            View All Skills
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </AnimatedElement>
            </div>

            <div className="max-w-[100rem] mx-auto px-4 md:px-8 flex flex-col gap-8">
                {EXPERTISE_DATA.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="sticky top-32 z-10">
                            <AnimatedElement>
                                <div className="w-full bg-charcoal border-l-4 border-accent-orange p-8 md:p-16 shadow-2xl transform transition-transform hover:-translate-y-2">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                                        <div className="md:col-span-2">
                                            <div className="w-16 h-16 md:w-24 md:h-24 bg-black rounded-full flex items-center justify-center border border-white/10 text-accent-orange">
                                                <Icon className="w-8 h-8 md:w-12 md:h-12" />
                                            </div>
                                        </div>
                                        <div className="md:col-span-6">
                                            <h3 className="font-heading font-bold text-3xl md:text-5xl text-white mb-4 uppercase">
                                                {item.title}
                                            </h3>
                                            <p className="font-paragraph text-lg text-light-gray/80 max-w-xl">
                                                {item.desc}
                                            </p>
                                        </div>
                                        <div className="md:col-span-4 flex flex-wrap gap-3 justify-start md:justify-end">
                                            {item.tags.map((tag, i) => (
                                                <span key={i} className="px-4 py-2 bg-black/50 border border-white/10 text-sm text-medium-gray font-heading uppercase tracking-wider rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </AnimatedElement>
                        </div>
                    );
                })}
            </div>
        </section>

        {/* --- FEATURED WORK TEASER (Parallax & Full Bleed) --- */}
        <section className="w-full py-32 bg-charcoal overflow-hidden relative">
            {/* Background Text Marquee */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-5 pointer-events-none select-none overflow-hidden whitespace-nowrap">
                <motion.div 
                    className="font-heading font-black text-[20vw] text-white uppercase leading-none"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                >
                    Selected Works Selected Works Selected Works Selected Works
                </motion.div>
            </div>

            <div className="max-w-[110rem] mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <AnimatedElement>
                            <div className="relative w-full aspect-[4/5] md:aspect-square max-w-2xl mx-auto">
                                <div className="absolute inset-0 bg-accent-orange transform translate-x-4 translate-y-4 z-0" />
                                <div className="absolute inset-0 z-10 overflow-hidden bg-black">
                                    <ParallaxImage 
                                        src="https://static.wixstatic.com/media/98427a_b59e5aa2540d44c88bcc77795fb1c33d~mv2.png?originWidth=768&originHeight=960"
                                        alt="Collage of recent project work"
                                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                                        speed={0.15}
                                    />
                                </div>
                                {/* Floating Badge */}
                                <div className="absolute -bottom-8 -right-8 z-20 bg-white text-black p-6 md:p-8 max-w-[200px]">
                                    <p className="font-heading font-bold text-xl uppercase leading-tight">
                                        Latest<br/>Case Studies
                                    </p>
                                    <ArrowDownRight className="w-8 h-8 mt-4 text-accent-orange" />
                                </div>
                            </div>
                        </AnimatedElement>
                    </div>

                    <div className="order-1 lg:order-2">
                        <AnimatedElement>
                            <span className="text-accent-orange font-heading font-bold tracking-widest uppercase mb-4 block">
                                Portfolio
                            </span>
                            <h2 className="font-heading font-black text-5xl md:text-7xl text-white uppercase mb-8 leading-none">
                                Digital<br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-medium-gray">Excellence</span>
                            </h2>
                            <p className="font-paragraph text-xl text-light-gray mb-12 max-w-lg">
                                Explore a curated selection of projects that demonstrate the convergence of technical complexity and visual beauty.
                            </p>
                            
                            <Link to="/portfolio" className="inline-block">
                                <button className="group relative px-10 py-5 bg-transparent border border-white/30 overflow-hidden">
                                    <div className="absolute inset-0 w-0 bg-accent-orange transition-all duration-[250ms] ease-out group-hover:w-full opacity-100" />
                                    <span className="relative flex items-center gap-4 font-heading font-bold text-white uppercase tracking-widest group-hover:text-black transition-colors">
                                        View All Projects
                                        <ArrowRight className="w-5 h-5" />
                                    </span>
                                </button>
                            </Link>
                        </AnimatedElement>
                    </div>
                </div>
            </div>
        </section>

        {/* --- CTA / FOOTER PRELUDE --- */}
        <section className="w-full bg-accent-orange py-32 px-4 md:px-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply" />
            
            <AnimatedElement>
                <h2 className="font-heading font-black text-black text-5xl md:text-8xl uppercase mb-8 relative z-10">
                    Ready to <br/>Innovate?
                </h2>
            </AnimatedElement>
            
            <AnimatedElement delay={200}>
                <p className="font-paragraph text-black/80 text-xl md:text-2xl max-w-2xl mb-12 relative z-10 font-medium">
                    Let's collaborate to build something extraordinary that stands out in the digital noise.
                </p>
            </AnimatedElement>

            <AnimatedElement delay={400}>
                <Link 
                    to="/portfolio" 
                    className="relative z-10 inline-flex items-center justify-center w-20 h-20 md:w-32 md:h-32 bg-black rounded-full text-white hover:scale-110 transition-transform duration-300 group"
                >
                    <span className="font-heading font-bold text-sm md:text-lg uppercase tracking-widest group-hover:hidden">
                        Start
                    </span>
                    <ArrowRight className="hidden group-hover:block w-8 h-8 md:w-12 md:h-12 text-accent-orange" />
                </Link>
            </AnimatedElement>
        </section>

      </main>

      <Footer />
    </div>
  );
}