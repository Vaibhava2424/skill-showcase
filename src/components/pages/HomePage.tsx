// HPI 1.6-V
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';
import { ArrowRight, Code, Cpu, Layers, Globe, Sparkles, ArrowUpRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

// --- Utility Components ---

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
        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out opacity-0 translate-y-12 motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 ${className || ''}`}
    >
      {children}
    </div>
  );
};

const ParallaxText = ({ children, baseVelocity = 100 }: { children: string; baseVelocity: number }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useSpring(scrollY, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(scrollVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${v}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex whitespace-nowrap flex-nowrap" style={{ x }}>
        <span className="block mr-8 font-heading text-6xl md:text-8xl uppercase text-primary/20">{children} </span>
        <span className="block mr-8 font-heading text-6xl md:text-8xl uppercase text-primary/20">{children} </span>
        <span className="block mr-8 font-heading text-6xl md:text-8xl uppercase text-primary/20">{children} </span>
        <span className="block mr-8 font-heading text-6xl md:text-8xl uppercase text-primary/20">{children} </span>
      </motion.div>
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Canonical Data Sources
  const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Technologies Mastered", value: "15+" },
    { label: "Client Satisfaction", value: "100%" },
  ];

  const expertise = [
    {
      title: "Frontend Development",
      description: "Crafting responsive, accessible interfaces with React, TypeScript, and modern CSS frameworks.",
      icon: <Code className="w-8 h-8" />,
      tags: ["React", "TypeScript", "Tailwind"]
    },
    {
      title: "Full-Stack Solutions",
      description: "Building complete applications with MERN stack, database design, and API development.",
      icon: <Layers className="w-8 h-8" />,
      tags: ["Node.js", "MongoDB", "Express"]
    },
    {
      title: "AI Integration",
      description: "Implementing intelligent features and machine learning capabilities into web applications.",
      icon: <Cpu className="w-8 h-8" />,
      tags: ["OpenAI", "TensorFlow", "Python"]
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-clip selection:bg-primary selection:text-white">
      <Header />

      {/* --- HERO SECTION --- */}
      {/* Replicating "The MOOD SWINGER" layout structure */}
      <section className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-4 md:px-12 overflow-hidden">
        
        {/* Top Navigation / Meta (Visual Balance) */}
        <div className="w-full flex justify-between items-start text-xs md:text-sm font-heading tracking-widest text-primary uppercase mb-12 z-20">
          <div className="hidden md:block">Knox Chase</div>
          <div className="flex gap-8 md:gap-24">
            <span>Portfolio</span>
            <span>Skills</span>
            <span>Contact</span>
          </div>
          <div className="hidden md:block">Est. 2024</div>
        </div>

        {/* Main Typography & Image Composition */}
        <div className="relative flex-grow flex flex-col items-center justify-center z-10">
          
          {/* Huge Typography Layer */}
          <div className="relative w-full text-center z-20 mix-blend-multiply">
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-paragraph italic text-primary text-[15vw] md:text-[12vw] leading-[0.8] tracking-tight"
            >
              The
            </motion.h1>
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading uppercase text-primary text-[18vw] md:text-[16vw] leading-[0.8] tracking-tighter -mt-4 md:-mt-12"
            >
              Creative
            </motion.h1>
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading uppercase text-primary text-[18vw] md:text-[16vw] leading-[0.8] tracking-tighter -mt-2 md:-mt-8"
            >
              Developer
            </motion.h1>
          </div>

          {/* Centered Image Layer - Parallax & Scale */}
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] md:w-[25vw] aspect-[3/4] z-10"
          >
            <div className="relative w-full h-full overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
              <Image
                src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=hero-portrait"
                alt="Knox Chase Portrait"
                className="w-full h-full object-cover scale-110"
                width={600}
              />
              {/* Overlay for texture */}
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />
            </div>
          </motion.div>

        </div>

        {/* Bottom Gradient & Info */}
        <div className="relative z-20 mt-12 flex flex-col md:flex-row justify-between items-end">
          <div className="max-w-xs">
            <p className="font-heading uppercase text-primary text-sm tracking-wider mb-2">Full-Stack Engineer</p>
            <p className="font-paragraph italic text-primary text-lg">& Creative Technologist</p>
          </div>
          
          <div className="mt-8 md:mt-0">
             <p className="font-heading uppercase text-primary text-xs tracking-widest text-right">
               Ready to be the<br/>next big thing?
             </p>
          </div>
        </div>

        {/* Yellow Gradient Fade - Motif from Inspiration */}
        <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-secondary via-secondary/50 to-transparent -z-10 pointer-events-none" />
      </section>

      {/* --- TICKER SECTION --- */}
      <section className="py-12 border-y border-primary/10 bg-background overflow-hidden">
        <ParallaxText baseVelocity={-2}>
          INNOVATION • DESIGN • TECHNOLOGY • EXPERIENCE •
        </ParallaxText>
      </section>

      {/* --- PHILOSOPHY / ABOUT SECTION (Sticky) --- */}
      <section className="relative w-full max-w-[120rem] mx-auto px-4 md:px-12 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sticky Title */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32">
              <AnimatedElement>
                <h2 className="font-heading uppercase text-5xl md:text-7xl text-primary leading-none mb-8">
                  Building<br/>Digital<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-destructive">Future</span>
                </h2>
                <div className="w-24 h-1 bg-primary mb-8" />
                <p className="font-paragraph italic text-xl text-primary/80 max-w-xs">
                  Where logic meets creativity, and code becomes art.
                </p>
              </AnimatedElement>
            </div>
          </div>

          {/* Scrolling Content */}
          <div className="lg:col-span-8 flex flex-col gap-24">
            <AnimatedElement delay={200}>
              <p className="font-heading text-2xl md:text-4xl text-primary leading-tight">
                Specializing in modern web technologies and innovative solutions that bring ideas to life. From responsive interfaces to AI-powered applications, I create seamless digital experiences that combine functionality with aesthetic excellence.
              </p>
            </AnimatedElement>

            {/* Stats Grid - Bento Box Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <AnimatedElement key={index} delay={index * 100} className="h-full">
                  <div className={`h-full p-8 border border-primary transition-all duration-500 hover:shadow-[8px_8px_0px_0px_rgba(200,67,27,1)] ${index === 1 || index === 2 ? 'bg-secondary' : 'bg-background'}`}>
                    <p className={`font-heading text-6xl md:text-7xl mb-2 ${index === 1 || index === 2 ? 'text-secondary-foreground' : 'text-primary'}`}>
                      {stat.value}
                    </p>
                    <p className={`font-paragraph italic text-xl ${index === 1 || index === 2 ? 'text-secondary-foreground' : 'text-primary'}`}>
                      {stat.label}
                    </p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- EXPERTISE SECTION --- */}
      <section className="w-full bg-primary text-primary-foreground py-32 px-4 md:px-12 rounded-t-[3rem] mt-12">
        <div className="max-w-[120rem] mx-auto">
          <AnimatedElement>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-primary-foreground/20 pb-8">
              <h2 className="font-heading uppercase text-5xl md:text-8xl tracking-tight">
                Core<br/>Expertise
              </h2>
              <Link to="/skills" className="group flex items-center gap-4 text-xl font-paragraph italic hover:text-secondary transition-colors mt-8 md:mt-0">
                View all skills
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <AnimatedElement key={index} delay={index * 150}>
                <div className="group relative h-full bg-primary-foreground/5 p-8 md:p-12 rounded-2xl overflow-hidden hover:bg-primary-foreground/10 transition-colors duration-500">
                  <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 text-secondary">
                    {item.icon}
                  </div>
                  
                  <div className="mt-12">
                    <h3 className="font-heading uppercase text-2xl md:text-3xl mb-6 group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-lg opacity-80 mb-8 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 border border-primary-foreground/20 rounded-full text-xs uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* --- LARGE IMAGE BREAK --- */}
      <section className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <Image
          src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=workspace-break"
          alt="Creative Workspace"
          className="w-full h-full object-cover"
          width={1920}
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <AnimatedElement>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-12 md:p-20 text-center max-w-4xl mx-4">
              <p className="font-heading uppercase text-white text-3xl md:text-5xl tracking-widest mb-4">
                Design is Intelligence
              </p>
              <p className="font-paragraph italic text-white text-2xl md:text-4xl">
                Made Visible
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="w-full bg-secondary py-32 px-4 md:px-12">
        <div className="max-w-[100rem] mx-auto text-center">
          <AnimatedElement>
            <p className="font-heading uppercase text-primary tracking-widest mb-8">What's Next?</p>
            <h2 className="font-heading uppercase text-6xl md:text-9xl text-primary leading-[0.9] mb-12">
              Let's Build<br/>Something<br/>
              <span className="font-paragraph italic lowercase">extraordinary</span>
            </h2>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <Link 
                to="/portfolio" 
                className="group relative px-12 py-6 bg-primary text-white overflow-hidden rounded-full transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative font-heading uppercase tracking-wider text-lg flex items-center gap-3">
                  Explore Portfolio
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </Link>
              
              <Link 
                to="/skills"
                className="group px-12 py-6 border-2 border-primary text-primary rounded-full hover:bg-primary/5 transition-colors"
              >
                <span className="font-heading uppercase tracking-wider text-lg">
                  View Capabilities
                </span>
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}