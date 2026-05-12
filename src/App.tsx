/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView, useMotionValue } from 'motion/react';
import { 
  Sun,
  Moon,
  User, 
  Dumbbell, 
  Users, 
  Trophy, 
  Brain, 
  Target, 
  Github,
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Instagram, 
  ChevronRight, 
  ExternalLink,
  GraduationCap,
  Award,
  Calendar,
  CheckCircle2,
  Menu,
  X,
  Dumbbell as FootballIcon,
  ChevronLeft
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
interface Skill {
  name: string;
  level: number;
}

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

// --- Components ---

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-20">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{ 
            y: [null, Math.random() * -100 - 50],
            x: [null, Math.random() * 100 - 50],
            opacity: [null, 0]
          }}
          transition={{ 
            duration: Math.random() * 5 + 5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute w-1 h-1 bg-emerald-500 rounded-full"
        />
      ))}
    </div>
  );
};

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string; key?: React.Key }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("relative transition-all duration-200", className)}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

const IntroLoader = ({ onComplete }: { onComplete: () => void; key?: React.Key }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      onAnimationComplete={(definition: any) => {
        if (definition === "exit" || (typeof definition === "object" && definition.opacity === 0)) {
          onComplete();
        }
      }}
      className="fixed inset-0 z-[200] bg-zinc-950 flex flex-col items-center justify-center p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.h2 
          initial={{ letterSpacing: "0.5em", opacity: 0 }}
          animate={{ letterSpacing: "0.1em", opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-white font-heading font-bold text-3xl md:text-5xl mb-4 tracking-tighter"
        >
          MAHMOUD MOAMEN
        </motion.h2>
        <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-white/50"
          />
        </div>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 text-xs font-bold tracking-[0.3em] uppercase text-zinc-500"
      >
        Excellence in Motion
      </motion.p>
    </motion.div>
  );
};

const Section = ({ id, className, children }: SectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id={id} ref={ref} className={cn("py-24 px-6 md:px-12", className)}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

const Navbar = ({ isDarkMode, toggleTheme }: { isDarkMode: boolean, toggleTheme: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Glass effect trigger
      setIsScrolled(currentScrollY > 50);

      // Visibility calculation
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Skills', href: '#skills' },
    { name: 'Activities', href: '#activities' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        isScrolled 
          ? (isDarkMode ? "bg-zinc-950/80 border-b border-white/5 shadow-2xl" : "bg-white/80 border-b border-zinc-200 shadow-xl shadow-zinc-200/50") 
          : "bg-transparent",
        "backdrop-blur-md"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={cn("text-2xl font-heading font-bold tracking-tighter", isDarkMode ? "text-white" : "text-zinc-900")}
        >
          MAHMOUD<span className="text-emerald-500">.</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial="initial"
              whileHover="hover"
              animate="initial"
              variants={{
                initial: { y: 0 },
                hover: { y: -2, transition: { type: "spring", stiffness: 400, damping: 10 } }
              }}
              className={cn(
                "relative text-sm font-medium transition-colors",
                isDarkMode ? "text-zinc-400 hover:text-emerald-400" : "text-zinc-500 hover:text-emerald-600"
              )}
            >
              {link.name}
              <motion.span 
                variants={{
                  initial: { scaleX: 0 },
                  hover: { scaleX: 1 }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
              />
            </motion.a>
          ))}
          
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              isDarkMode ? "bg-zinc-900 text-yellow-400 hover:bg-zinc-800" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            )}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <motion.a 
            href="#contact"
            animate={{ 
              boxShadow: [
                "0 0 0px rgba(16, 185, 129, 0)", 
                "0 0 15px rgba(16, 185, 129, 0.4)", 
                "0 0 0px rgba(16, 185, 129, 0)"
              ] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="px-6 py-2.5 rounded-full bg-emerald-500 text-zinc-950 font-bold text-sm hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
          >
            Work with me
          </motion.a>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-full transition-all",
              isDarkMode ? "text-yellow-400" : "text-zinc-600"
            )}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            className={isDarkMode ? "text-zinc-100" : "text-zinc-900"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "absolute top-full left-0 right-0 p-6 md:hidden flex flex-col space-y-4 border-b",
              isDarkMode ? "bg-zinc-900 border-white/5" : "bg-white border-zinc-200"
            )}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-lg font-medium",
                  isDarkMode ? "text-zinc-300" : "text-zinc-700"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="w-full py-3 rounded-xl bg-emerald-500 text-zinc-950 text-center font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get in Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className={cn(
          "absolute inset-0 z-10",
          isDarkMode ? "bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950" : "bg-gradient-to-b from-transparent via-zinc-50/50 to-white"
        )} />
        <img 
          src="https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero Background"
          className={cn("w-full h-full object-cover", isDarkMode ? "opacity-20" : "opacity-40")}
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-left"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-6 font-mono">
            Building the Athletes of Tomorrow
          </span>
          <h1 className={cn("text-6xl md:text-8xl font-heading font-bold leading-none tracking-tighter mb-6", isDarkMode ? "text-white" : "text-zinc-900")}>
            MAHMOUD<br />
            <span className="text-gradient">MOAMEN</span>
          </h1>
          <p className={cn("text-xl md:text-2xl font-light max-w-2xl mb-10", isDarkMode ? "text-zinc-400" : "text-zinc-600")}>
            Professional Physical Education Teacher dedicated to building 
            <span className={cn("font-medium italic", isDarkMode ? "text-zinc-100" : "text-zinc-900")}> discipline</span>, 
            <span className={cn("font-medium italic", isDarkMode ? "text-zinc-100" : "text-zinc-900")}> health</span>, and 
            <span className={cn("font-medium italic", isDarkMode ? "text-zinc-100" : "text-zinc-900")}> confidence</span> through movement.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a 
              href="#contact"
              className="group px-8 py-4 bg-emerald-500 text-zinc-950 rounded-full font-bold flex items-center gap-2 hover:bg-emerald-400 transition-all hover:pr-10"
            >
              Work With Me <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
              onClick={() => window.print()}
              className={cn(
                "px-8 py-4 border rounded-full font-bold transition-all flex items-center gap-2",
                isDarkMode ? "bg-zinc-900 text-white border-white/10 hover:bg-zinc-800" : "bg-white text-zinc-900 border-zinc-200 hover:bg-zinc-100"
              )}
            >
              Download CV <ExternalLink size={18} />
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <TiltCard className="w-full max-w-[500px] mx-auto">
            <div className="relative group">
              {/* Premium Glow effect behind */}
              <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full group-hover:bg-emerald-500/40 transition-all duration-700" />
              
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  "relative z-10 rounded-[30px] overflow-hidden border shadow-2xl p-2",
                  isDarkMode ? "bg-black/40 backdrop-blur-md border-white/10 shadow-emerald-500/10" : "bg-white/40 backdrop-blur-md border-zinc-200 shadow-emerald-500/5"
                )}
              >
                <img 
                  src={`${import.meta.env.BASE_URL}profile.png`} 
                  alt="Mahmoud Moamen"
                  className="w-full aspect-[3/4] object-cover rounded-[22px]"
                  onError={(e) => {
                    e.currentTarget.src = "https://artifact.mural.co/edge/api/v1/assets/95834898-765f-409b-9860-96f7c975191b/artifact";
                  }}
                />
                
                {/* 3D Reflection Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-1 h-12 bg-gradient-to-b from-emerald-500 to-transparent rounded-full" />
      </motion.div>
    </section>
  );
};

const About = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const stats = [
    { label: "Years Experience", value: "3+", icon: <Calendar className="text-emerald-500" size={20} /> },
    { label: "Students", value: "200+", icon: <Users className="text-blue-500" size={20} /> },
    { label: "Ages", value: "6–14", icon: <Target className="text-purple-500" size={20} /> },
  ];

  return (
    <Section id="about" className={isDarkMode ? "bg-zinc-950" : "bg-white"}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-4 block">About Me</span>
          <h2 className={cn("text-4xl md:text-5xl font-heading font-bold mb-8", isDarkMode ? "text-white" : "text-zinc-900")}>
            Driving <span className="text-emerald-500">Excellence</span> Through Physical Literacy
          </h2>
          
          <div className={cn("space-y-6 text-lg leading-relaxed mb-12", isDarkMode ? "text-zinc-400" : "text-zinc-600")}>
            <p>
              I am a dedicated Physical Education teacher with experience delivering engaging PE programs in private school settings. Skilled in creating inclusive lesson plans, promoting physical literacy, and organizing school-wide sports events.
            </p>
            <p>
              Proven ability to foster teamwork and discipline among students aged 6–14. I maintain a strong commitment to safeguarding and student wellbeing, backed by continuous professional development in educational English and child protection.
            </p>
          </div>

          <div className="flex justify-center mb-16">
            <div className={cn(
              "p-6 rounded-[32px] border flex items-start gap-6 text-left backdrop-blur-md max-w-xs w-full shadow-2xl transition-all",
              isDarkMode ? "bg-zinc-900/50 border-white/5 shadow-emerald-500/5" : "bg-zinc-100/50 border-zinc-200 shadow-emerald-500/10"
            )}>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <GraduationCap className="text-emerald-500" size={28} />
              </div>
              <div>
                <h4 className={cn("font-bold text-lg", isDarkMode ? "text-white" : "text-zinc-900")}>Bachelor of PE</h4>
                <p className="text-sm text-zinc-500">Al-Azhar University, 2023</p>
                <div className="mt-2 text-[10px] font-black uppercase tracking-wider text-emerald-500/50">Primary Qualification</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "p-8 rounded-[32px] border flex flex-col items-center gap-4 transition-colors group",
                  isDarkMode ? "bg-zinc-900/30 border-white/5 hover:border-emerald-500/20" : "bg-zinc-100 border-zinc-200 hover:border-emerald-500/20"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform",
                  isDarkMode ? "bg-white/5" : "bg-zinc-50 border border-zinc-200"
                )}>
                  {stat.icon}
                </div>
                <div>
                  <div className={cn("text-3xl font-heading font-bold mb-1", isDarkMode ? "text-white" : "text-zinc-900")}>{stat.value}</div>
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};


const Certificates = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const certs = [
    { 
      title: "Sports Coaching", 
      issuer: "Int. Olympic Committee", 
      year: "2025", 
      img: "cert1.png",
      fallback: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
    },
    { 
      title: "English for Career Development", 
      issuer: "University of Pennsylvania", 
      year: "2024", 
      img: "cert2.png",
      fallback: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
    },
    { 
      title: "Basic Online First Aid Course", 
      issuer: "First Aid for Free", 
      year: "2025", 
      img: "cert3.png",
      fallback: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
    },
    { 
      title: "Claude 101 Certified", 
      issuer: "Anthropic", 
      year: "2026", 
      img: "cert4.png",
      fallback: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
    },
  ];

  const total = certs.length;
  const [radius, setRadius] = useState(400);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setRadius(250);
      else if (window.innerWidth < 1024) setRadius(350);
      else setRadius(500);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moveNext = () => setCurrentIndex(prev => prev + 1);
  const movePrev = () => setCurrentIndex(prev => prev - 1);

  return (
    <Section id="certificates" className={cn("overflow-hidden flex flex-col justify-center min-h-[900px]", isDarkMode ? "bg-zinc-950" : "bg-white")}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-3 block"
          >
            Professional Credentials
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={cn("text-5xl md:text-7xl font-heading font-bold", isDarkMode ? "text-white" : "text-zinc-900")}
          >
            Expertise <span className="text-emerald-500">& Certs</span>
          </motion.h2>
        </div>

        <div className="relative h-[600px] w-full flex items-center justify-center perspective-[2000px] touch-none">
          {/* Main 3D Container */}
          <motion.div
            style={{ 
              transformStyle: "preserve-3d",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            animate={{ rotateY: currentIndex * (-360 / total) }}
            transition={{ type: "spring", stiffness: 100, damping: 25 }}
          >
            {certs.map((cert, i) => {
              const rotation = (i * 360) / total;
              const activeIndex = ((currentIndex % total) + total) % total;
              const isActive = i === activeIndex;

              return (
                <div
                  key={i}
                  className="absolute w-[300px] sm:w-[450px] aspect-[16/11] preserve-3d"
                  style={{ 
                    transform: `rotateY(${rotation}deg) translateZ(${radius}px)`,
                  }}
                >
                  <motion.div
                    initial={false}
                    animate={{ 
                      scale: isActive ? 1.05 : 0.85,
                      opacity: isActive ? 1 : 0.3,
                      filter: isActive ? "blur(0px)" : "blur(2px)"
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-full w-full"
                  >
                    <div className={cn(
                      "p-4 rounded-[32px] border shadow-2xl flex flex-col h-full group transition-colors",
                      isDarkMode ? "bg-black/40 backdrop-blur-md border-white/10 shadow-emerald-500/10" : "bg-white/80 backdrop-blur-md border-zinc-200 shadow-emerald-500/5"
                    )}>
                      <div className={cn(
                        "relative flex-1 rounded-[24px] overflow-hidden mb-6 border transition-colors",
                        isDarkMode ? "bg-zinc-900 border-white/5" : "bg-zinc-50 border-zinc-200"
                      )}>
                        <img 
                          src={`${import.meta.env.BASE_URL}${cert.img}`}
                          alt={cert.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = cert.fallback;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-6 flex flex-col justify-end">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-zinc-950 shadow-lg shadow-emerald-500/20">
                              <ExternalLink size={18} />
                            </div>
                            <span className="text-white font-bold text-sm bg-zinc-900/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">View Credential</span>
                          </div>
                        </div>
                      </div>

                      <div className="px-2 pb-2">
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h3 className={cn("text-xl sm:text-2xl font-bold leading-tight group-hover:text-emerald-400 transition-colors uppercase tracking-tight", isDarkMode ? "text-white" : "text-zinc-900")}>{cert.title}</h3>
                          <div className="bg-emerald-500 text-zinc-950 px-3 py-1 rounded-full text-[10px] font-black shrink-0 flex items-center gap-1">
                            <Calendar size={10} />
                            {cert.year}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                          <Award size={14} className="text-emerald-500" />
                          {cert.issuer}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 max-w-5xl mx-auto flex justify-between px-6 pointer-events-none z-20">
            <button 
              onClick={movePrev}
              className={cn(
                "w-14 h-14 rounded-full backdrop-blur-md border flex items-center justify-center hover:bg-emerald-500 hover:text-zinc-950 transition-all pointer-events-auto shadow-2xl active:scale-90",
                isDarkMode ? "bg-zinc-900/80 border-white/10 text-white" : "bg-white/80 border-zinc-200 text-zinc-900"
              )}
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={moveNext}
              className={cn(
                "w-14 h-14 rounded-full backdrop-blur-md border flex items-center justify-center hover:bg-emerald-500 hover:text-zinc-950 transition-all pointer-events-auto shadow-2xl active:scale-90",
                isDarkMode ? "bg-zinc-900/80 border-white/10 text-white" : "bg-white/80 border-zinc-200 text-zinc-900"
              )}
            >
              <ChevronRight size={28} />
            </button>
          </div>
          
          {/* Progress Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {certs.map((_, i) => {
              const activeIndex = ((currentIndex % total) + total) % total;
              return (
                <button
                  key={i}
                  onClick={() => {
                    const diff = i - activeIndex;
                    setCurrentIndex(currentIndex + diff);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === activeIndex ? "w-10 bg-emerald-500" : (isDarkMode ? "bg-zinc-800 hover:bg-zinc-700" : "bg-zinc-200 hover:bg-zinc-300")
                  )}
                />
              );
            })}
          </div>
        </div>
        
        <div className="text-center mt-12 opacity-30 flex flex-col items-center gap-2">
           <div className={cn("flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]", isDarkMode ? "text-white" : "text-zinc-900")}>
             <ChevronLeft size={14} /> Use Arrows <ChevronRight size={14} />
           </div>
           <p className={cn("text-[10px]", isDarkMode ? "text-zinc-400" : "text-zinc-500")}>EXPERIENCE IN 3D SPACE</p>
        </div>
      </div>
    </Section>
  );
};


const Philosophy = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const principles = [
    {
      icon: <Target className="text-emerald-400" size={32} />,
      title: "Discipline",
      description: "Consistency and focus are the foundations of both athletic and personal success."
    },
    {
      icon: <Brain className="text-emerald-400" size={32} />,
      title: "Active Learning",
      description: "Moving beyond drills to create cognitive engagement in every physical activity."
    },
    {
      icon: <Users className="text-emerald-400" size={32} />,
      title: "Teamwork",
      description: "Fostering collaboration and leadership through structured group challenges."
    },
    {
      icon: <Trophy className="text-emerald-400" size={32} />,
      title: "Motivation",
      description: "Celebrating individual progress and effort to build long-term confidence."
    }
  ];

  return (
    <Section id="philosophy" className={isDarkMode ? "bg-zinc-900/50" : "bg-zinc-50"}>
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className={cn("text-4xl font-heading font-bold mb-4", isDarkMode ? "text-white" : "text-zinc-900")}>Teaching Philosophy</h2>
        <p className={isDarkMode ? "text-zinc-500" : "text-zinc-500"}>My core principles that guide how I interact with students and structure my programs.</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {principles.map((item, index) => (
          <TiltCard key={index}>
            <div className={cn(
               "p-8 rounded-3xl transition-all group h-full border",
               isDarkMode ? "bg-black/40 backdrop-blur-md border-white/5 hover:bg-white/5" : "bg-white border-zinc-200 hover:shadow-xl shadow-zinc-200/50"
            )}>
              <div className={cn(
                "mb-6 p-4 rounded-2xl inline-block group-hover:scale-110 transition-transform",
                isDarkMode ? "bg-zinc-950" : "bg-zinc-100"
              )}>
                {item.icon}
              </div>
              <h3 className={cn("text-xl font-bold mb-3", isDarkMode ? "text-white" : "text-zinc-900")}>{item.title}</h3>
              <p className={cn("leading-relaxed text-sm", isDarkMode ? "text-zinc-500" : "text-zinc-600")}>
                {item.description}
              </p>
            </div>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
};

const Skills = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const skills: Skill[] = [
    { name: "PE Instruction", level: 98 },
    { name: "Student Engagement", level: 100 },
    { name: "Active Learning", level: 92 },
    { name: "Classroom Management", level: 95 },
    { name: "Sports Coaching", level: 90 },
    { name: "Lesson Planning", level: 94 },
  ];

  return (
    <Section id="skills" className={isDarkMode ? "bg-zinc-950" : "bg-white"}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className={cn("text-4xl font-heading font-bold mb-6", isDarkMode ? "text-white" : "text-zinc-900")}>Core <span className="text-emerald-500">Skills</span></h2>
          <p className={cn("mb-12 text-lg", isDarkMode ? "text-zinc-400" : "text-zinc-600")}>
            I specialize in transforming traditional PE into a dynamic, inclusive, and high-energy learning experience.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className={cn(
                   "p-6 rounded-2xl border transition-all group",
                   isDarkMode ? "bg-zinc-900 border-white/5" : "bg-zinc-100 border-zinc-200"
                )}
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className={cn("font-bold text-sm transition-colors", isDarkMode ? "group-hover:text-emerald-400" : "group-hover:text-emerald-600")}>{skill.name}</h4>
                  <span className="text-xs font-bold text-emerald-500/50">{skill.level}%</span>
                </div>
                <div className={cn("h-1.5 w-full rounded-full overflow-hidden", isDarkMode ? "bg-zinc-950" : "bg-white border border-zinc-200")}>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { Icon: FootballIcon, color: "text-blue-400", title: "Team Sports", desc: "Football, Athletics, and Group Tactics expertise." },
            { Icon: Dumbbell, color: "text-emerald-400", title: "Fitness", desc: "Strength, conditioning, and HIIT instruction." },
            { Icon: Brain, color: "text-purple-400", title: "Pedagogy", desc: "Educational English and child psychology." },
            { Icon: Award, color: "text-emerald-400", title: "Leadership", desc: "Organizing school-wide events and leagues.", highlight: true },
          ].map((item, idx) => (
            <div key={idx} className={cn(
              "p-8 rounded-3xl flex flex-col justify-between border transition-all",
              item.highlight 
                ? (isDarkMode ? "border-emerald-500/30 bg-emerald-500/5" : "border-emerald-500/30 bg-emerald-50")
                : (isDarkMode ? "bg-black/40 backdrop-blur-md border-white/10" : "bg-zinc-100 border-zinc-200 shadow-sm shadow-zinc-200")
            )}>
              <item.Icon className={cn(item.color, "mb-6")} size={40} />
              <div>
                <h4 className={cn("font-bold text-xl mb-2", isDarkMode ? "text-white" : "text-zinc-900")}>{item.title}</h4>
                <p className={isDarkMode ? "text-zinc-500 text-sm" : "text-zinc-600 text-sm"}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const Activities = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [filter, setFilter] = useState('All');
  const activities = [
    {
      title: "School Football League",
      cat: "Football",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200",
      stats: "+40% Participation"
    },
    {
      title: "Athletics Day",
      cat: "Events",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1200",
      stats: "Whole School Event"
    }
  ];

  const filtered = filter === 'All' ? activities : activities.filter(a => a.cat === filter);

  return (
    <Section id="activities" className={isDarkMode ? "bg-zinc-950" : "bg-white"}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className={cn("text-4xl font-heading font-bold mb-4", isDarkMode ? "text-white" : "text-zinc-900")}>Activities & Events</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {['All', 'Football', 'Events'].map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold transition-all",
                  filter === tag 
                    ? "bg-emerald-500 text-zinc-950" 
                    : (isDarkMode ? "bg-zinc-900 text-zinc-500 hover:text-zinc-300" : "bg-zinc-100 text-zinc-500 hover:text-zinc-700")
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((act, index) => (
            <motion.div
              layout
              key={act.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -10 }}
              className="group relative h-[450px] rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
              <img 
                src={act.image} 
                alt={act.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {act.cat}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    {act.stats}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{act.title}</h3>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-white text-zinc-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight size={24} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
};



const Testimonials = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [activeTab, setActiveTab] = useState(0);
  const reviews = [
    {
      name: "Ahmed Ibrahim",
      role: "Parent",
      text: "Coach Mahmoud has completely transformed my son's attitude towards physical activity. He's much more confident and disciplined now."
    },
    {
      name: "Sara Ali",
      role: "Student, Grade 8",
      text: "The football league Mr. Moamen started was the highlight of our year. He makes every class interesting and challenging."
    },
    {
      name: "Dr. Khaled",
      role: "School Principal",
      text: "Mahmoud's dedication to student wellbeing and child protection standards is exemplary. He is a truly professional asset to our school."
    }
  ];

  return (
    <Section id="testimonials" className={cn("overflow-hidden relative", isDarkMode ? "bg-zinc-950" : "bg-zinc-50")}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Users className="mx-auto text-emerald-500 mb-8 opacity-50" size={48} />
        
        <div className="h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <p className={cn("text-2xl md:text-3xl font-light italic leading-relaxed", isDarkMode ? "text-zinc-300" : "text-zinc-700")}>
                "{reviews[activeTab].text}"
              </p>
              <div>
                <p className={cn("font-bold text-lg", isDarkMode ? "text-white" : "text-zinc-900")}>{reviews[activeTab].name}</p>
                <p className="text-emerald-500 text-sm font-medium uppercase tracking-widest">{reviews[activeTab].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                activeTab === i ? "bg-emerald-500 w-8" : (isDarkMode ? "bg-zinc-800" : "bg-zinc-200")
              )}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

const Contact = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <Section id="contact" className={isDarkMode ? "bg-zinc-950" : "bg-white"}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/3">
          <h2 className={cn("text-4xl md:text-5xl font-heading font-bold mb-8", isDarkMode ? "text-white" : "text-zinc-900")}>Get In <span className="text-emerald-500">Touch</span></h2>
          <p className={cn("mb-12 text-lg", isDarkMode ? "text-zinc-400" : "text-zinc-600")}>
            Interested in collaboration, coaching, or have a question about my teaching methods? Drop me a message.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors",
                isDarkMode ? "bg-zinc-900" : "bg-zinc-100"
              )}>
                <Mail className={cn("transition-colors", isDarkMode ? "group-hover:text-zinc-950" : "group-hover:text-zinc-950")} size={24} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Email</p>
                <p className={cn("font-medium transition-colors", isDarkMode ? "text-white" : "text-zinc-900")}>mahmoudmoamen71@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className={cn(
                 "w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors",
                 isDarkMode ? "bg-zinc-900" : "bg-zinc-100"
              )}>
                <Phone className={cn("transition-colors", isDarkMode ? "group-hover:text-zinc-950" : "group-hover:text-zinc-950")} size={24} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">WhatsApp</p>
                <p className={cn("font-medium transition-colors", isDarkMode ? "text-white" : "text-zinc-900")}>+20 150 100 2947</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors",
                isDarkMode ? "bg-zinc-900" : "bg-zinc-100"
              )}>
                <MapPin className={cn("transition-colors", isDarkMode ? "group-hover:text-zinc-950" : "group-hover:text-zinc-950")} size={24} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Location</p>
                <p className={cn("font-medium transition-colors", isDarkMode ? "text-white" : "text-zinc-900")}>Egypt</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-12">
            <motion.a 
              whileHover={{ y: -5 }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/mahmoudmoamen/" 
              className={cn(
                "px-6 py-3 rounded-2xl flex items-center gap-3 hover:bg-emerald-500 hover:text-zinc-950 transition-all group backdrop-blur-md border",
                isDarkMode ? "bg-black/40 border-white/10" : "bg-white border-zinc-200 shadow-sm"
              )}
            >
              <Linkedin size={20} />
              <span className="font-bold text-sm">LinkedIn</span>
            </motion.a>
            <motion.a 
              whileHover={{ y: -5 }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/MahmoudMo2amen" 
              className={cn(
                "px-6 py-3 rounded-2xl flex items-center gap-3 hover:bg-emerald-500 hover:text-zinc-950 transition-all group backdrop-blur-md border",
                isDarkMode ? "bg-black/40 border-white/10" : "bg-white border-zinc-200 shadow-sm"
              )}
            >
              <Github size={20} />
              <span className="font-bold text-sm">GitHub</span>
            </motion.a>
          </div>
        </div>

        <div className="lg:w-2/3">
          <form className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-6 p-8 md:p-12 rounded-[40px] backdrop-blur-md border",
            isDarkMode ? "bg-black/40 border-white/5" : "bg-zinc-50 border-zinc-200 shadow-xl shadow-zinc-200/50"
          )}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className={cn(
                  "w-full border rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-colors",
                  isDarkMode ? "bg-zinc-900/50 border-white/5" : "bg-white border-zinc-200"
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className={cn(
                  "w-full border rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-colors",
                  isDarkMode ? "bg-zinc-900/50 border-white/5" : "bg-white border-zinc-200"
                )}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Subject</label>
              <select className={cn(
                  "w-full border rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-colors appearance-none",
                  isDarkMode ? "bg-zinc-900/50 border-white/5" : "bg-white border-zinc-200"
                )}>
                <option>Sports Coaching Inquiry</option>
                <option>School Event Collaboration</option>
                <option>Private Training</option>
                <option>General Message</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Your Message</label>
              <textarea 
                rows={5}
                placeholder="How can I help you?"
                className={cn(
                  "w-full border rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-colors resize-none",
                  isDarkMode ? "bg-zinc-900/50 border-white/5" : "bg-white border-zinc-200"
                )}
              />
            </div>
            <button className="md:col-span-2 py-4 bg-emerald-500 text-zinc-950 font-bold rounded-2xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
};

const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <footer className={cn(
      "py-12 border-t px-6 transition-colors duration-500",
      isDarkMode ? "bg-zinc-950 border-white/5" : "bg-white border-zinc-200"
    )}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className={cn("text-2xl font-heading font-bold tracking-tighter", isDarkMode ? "text-white" : "text-zinc-900")}>
          MAHMOUD<span className="text-emerald-500">.</span>
        </div>
        
        <p className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} Mahmoud Moamen. Designed for excellence.
        </p>

        <div className="flex gap-8">
          <a href="#" className="text-zinc-500 hover:text-emerald-500 transition-colors text-sm uppercase tracking-widest font-bold">Privacy</a>
          <a href="#" className="text-zinc-500 hover:text-emerald-500 transition-colors text-sm uppercase tracking-widest font-bold">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Delay the disappearance of the loader for cinematic effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={cn(
      "min-h-screen selection:bg-emerald-500 selection:text-zinc-950 transition-colors duration-500",
      isDarkMode ? "bg-zinc-950 text-zinc-100" : "bg-white text-zinc-900"
    )}>
      <AnimatePresence>
        {isLoading && (
          <IntroLoader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <ParticleBackground />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className={cn("transition-opacity duration-1000", isLoading ? "opacity-0" : "opacity-100")}>
        <Hero isDarkMode={isDarkMode} />
        <About isDarkMode={isDarkMode} />
        <Certificates isDarkMode={isDarkMode} />
        <Philosophy isDarkMode={isDarkMode} />
        <Skills isDarkMode={isDarkMode} />
        <Activities isDarkMode={isDarkMode} />
        <Testimonials isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} />
        <Footer isDarkMode={isDarkMode} />
      </div>

      {/* Custom Cursor / Accent Glow */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </main>
  );
}
