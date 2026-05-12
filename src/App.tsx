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

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
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

const IntroLoader = ({ onComplete }: { onComplete: () => void }) => {
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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Skills', href: '#skills' },
    { name: 'Activities', href: '#activities' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-zinc-950/80 backdrop-blur-md border-bottom border-white/5" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-heading font-bold tracking-tighter"
        >
          MAHMOUD<span className="text-emerald-500">.</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ scale: 1.05 }}
              className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <a 
            href="#contact"
            className="px-5 py-2 rounded-full bg-emerald-500 text-zinc-950 font-semibold text-sm hover:bg-emerald-400 transition-colors"
          >
            Work with me
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-zinc-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-zinc-900 border-b border-white/5 p-6 md:hidden flex flex-col space-y-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-zinc-300"
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
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero Background"
          className="w-full h-full object-cover opacity-20"
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
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/20 mb-6">
            Building the Athletes of Tomorrow
          </span>
          <h1 className="text-6xl md:text-8xl font-heading font-bold leading-none tracking-tighter mb-6">
            MAHMOUD<br />
            <span className="text-gradient">MOAMEN</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mb-10">
            Professional Physical Education Teacher dedicated to building 
            <span className="text-zinc-100 font-medium italic"> discipline</span>, 
            <span className="text-zinc-100 font-medium italic"> health</span>, and 
            <span className="text-zinc-100 font-medium italic"> confidence</span> through movement.
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
              className="px-8 py-4 bg-zinc-900 text-white border border-white/10 rounded-full font-bold hover:bg-zinc-800 transition-all flex items-center gap-2"
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
                className="relative z-10 rounded-[30px] overflow-hidden border border-white/10 shadow-2xl glass p-2 shadow-emerald-500/10"
              >
                <img 
                  src="https://artifact.mural.co/edge/api/v1/assets/95834898-765f-409b-9860-96f7c975191b/artifact" 
                  alt="Mahmoud Moamen"
                  className="w-full aspect-[3/4] object-cover rounded-[22px]"
                  referrerPolicy="no-referrer"
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

const About = () => {
  return (
    <Section id="about" className="bg-zinc-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative z-10 rounded-3xl overflow-hidden border border-white/10 aspect-[4/5]"
          >
            <img 
              src="https://artifact.mural.co/edge/api/v1/assets/95834898-765f-409b-9860-96f7c975191b/artifact" 
              alt="Mahmoud Moamen"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl z-20 hidden md:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Award className="text-zinc-900" size={24} />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Education</p>
                <p className="text-sm font-semibold">Bachelor of PE, Al-Azhar</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Driving <span className="text-emerald-500">Excellence</span> Through Physical Literacy
          </h2>
          <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
            <p>
              I am a dedicated Physical Education teacher with experience delivering engaging PE programs in private school settings. Skilled in creating inclusive lesson plans, promoting physical literacy, and organizing school-wide sports events.
            </p>
            <p>
              Proven ability to foster teamwork and discipline among students aged 6–14. I maintain a strong commitment to safeguarding and student wellbeing, backed by continuous professional development in educational English and child protection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <GraduationCap className="text-emerald-500" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Bachelor of PE</h4>
                <p className="text-xs text-zinc-500">Al-Azhar University, 2023</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="text-blue-500" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">First Aid & CPR</h4>
                <p className="text-xs text-zinc-500">Certified, 2026</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <Award className="text-purple-500" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Sports Coaching</h4>
                <p className="text-xs text-zinc-500">Int. Olympic Committee, 2025</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                <Target className="text-orange-500" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">English for Career</h4>
                <p className="text-xs text-zinc-500">UPenn, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const Philosophy = () => {
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
    <Section id="philosophy" className="bg-zinc-900/50">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-heading font-bold mb-4">Teaching Philosophy</h2>
        <p className="text-zinc-500 max-w-2xl mx-auto">My core principles that guide how I interact with students and structure my programs.</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {principles.map((item, index) => (
          <TiltCard key={index}>
            <div className="glass p-8 rounded-3xl hover:bg-white/5 transition-colors group h-full">
              <div className="mb-6 p-4 rounded-2xl bg-zinc-950 inline-block group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
};

const Skills = () => {
  const skills: Skill[] = [
    { name: "PE Instruction", level: 98 },
    { name: "Student Engagement", level: 100 },
    { name: "Active Learning", level: 92 },
    { name: "Classroom Management", level: 95 },
    { name: "Sports Coaching", level: 90 },
    { name: "Lesson Planning", level: 94 },
  ];

  return (
    <Section id="skills" className="bg-zinc-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl font-heading font-bold mb-6">Core <span className="text-emerald-500">Skills</span></h2>
          <p className="text-zinc-400 mb-12 text-lg">
            I specialize in transforming traditional PE into a dynamic, inclusive, and high-energy learning experience.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-zinc-900 border border-white/5 group"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-sm group-hover:text-emerald-400 transition-colors">{skill.name}</h4>
                  <span className="text-xs font-bold text-emerald-500/50">{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden">
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
          <div className="glass p-8 rounded-3xl flex flex-col justify-between">
            <FootballIcon className="text-blue-400 mb-6" size={40} />
            <div>
              <h4 className="font-bold text-xl mb-2">Team Sports</h4>
              <p className="text-zinc-500 text-sm">Football, Athletics, and Group Tactics expertise.</p>
            </div>
          </div>
          <div className="glass p-8 rounded-3xl flex flex-col justify-between">
            <Dumbbell className="text-emerald-400 mb-6" size={40} />
            <div>
              <h4 className="font-bold text-xl mb-2">Fitness</h4>
              <p className="text-zinc-500 text-sm">Strength, conditioning, and HIIT instruction.</p>
            </div>
          </div>
          <div className="glass p-8 rounded-3xl flex flex-col justify-between">
            <Brain className="text-purple-400 mb-6" size={40} />
            <div>
              <h4 className="font-bold text-xl mb-2">Pedagogy</h4>
              <p className="text-zinc-500 text-sm">Educational English and child psychology.</p>
            </div>
          </div>
          <div className="glass p-8 rounded-3xl flex flex-col justify-between border-emerald-500/30 bg-emerald-500/5">
            <Award className="text-emerald-400 mb-6" size={40} />
            <div>
              <h4 className="font-bold text-xl mb-2">Leadership</h4>
              <p className="text-zinc-500 text-sm">Organizing school-wide events and leagues.</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const Activities = () => {
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
    <Section id="activities" className="bg-zinc-950">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-heading font-bold mb-4">Activities & Events</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {['All', 'Football', 'Events'].map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold transition-all",
                  filter === tag ? "bg-emerald-500 text-zinc-950" : "bg-zinc-900 text-zinc-500 hover:text-zinc-300"
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

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1517649763962-0c6234978a0b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1518611012118-2969c636f7b4?auto=format&fit=crop&q=80&w=800",
  ];

  return (
    <Section id="gallery" className="bg-zinc-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold mb-4">Capturing Moments</h2>
          <p className="text-zinc-500">A visual diary of movement and student growth.</p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl overflow-hidden border border-white/5 cursor-zoom-in"
            >
              <img 
                src={img} 
                alt={`Gallery ${index}`}
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const Testimonials = () => {
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
    <Section id="testimonials" className="bg-zinc-950 overflow-hidden relative">
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
              <p className="text-2xl md:text-3xl font-light italic text-zinc-300 leading-relaxed">
                "{reviews[activeTab].text}"
              </p>
              <div>
                <p className="font-bold text-lg">{reviews[activeTab].name}</p>
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
                activeTab === i ? "bg-emerald-500 w-8" : "bg-zinc-800"
              )}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

const Contact = () => {
  return (
    <Section id="contact" className="bg-zinc-950">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/3">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">Get In <span className="text-emerald-500">Touch</span></h2>
          <p className="text-zinc-400 mb-12 text-lg">
            Interested in collaboration, coaching, or have a question about my teaching methods? Drop me a message.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                <Mail className="group-hover:text-zinc-950 transition-colors" size={24} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Email</p>
                <p className="font-medium">mahmoudmoamen71@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                <Phone className="group-hover:text-zinc-950 transition-colors" size={24} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">WhatsApp</p>
                <p className="font-medium">+20 150 100 2947</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                <MapPin className="group-hover:text-zinc-950 transition-colors" size={24} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Location</p>
                <p className="font-medium">Egypt</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-12">
            <motion.a 
              whileHover={{ y: -5 }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/mahmoudmoamen/" 
              className="px-6 py-3 rounded-2xl glass flex items-center gap-3 hover:bg-emerald-500 hover:text-zinc-950 transition-all group"
            >
              <Linkedin size={20} />
              <span className="font-bold text-sm">LinkedIn</span>
            </motion.a>
            <motion.a 
              whileHover={{ y: -5 }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/MahmoudMo2amen" 
              className="px-6 py-3 rounded-2xl glass flex items-center gap-3 hover:bg-emerald-500 hover:text-zinc-950 transition-all group"
            >
              <Github size={20} />
              <span className="font-bold text-sm">GitHub</span>
            </motion.a>
          </div>
        </div>

        <div className="lg:w-2/3">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 glass p-8 md:p-12 rounded-[40px]">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Subject</label>
              <select className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-colors appearance-none">
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
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-colors resize-none"
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

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-zinc-950 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-2xl font-heading font-bold tracking-tighter">
          MAHMOUD<span className="text-emerald-500">.</span>
        </div>
        
        <p className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} Mahmoud Moamen. Designed for excellence.
        </p>

        <div className="flex gap-8">
          <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold">Privacy</a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Delay the disappearance of the loader for cinematic effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-zinc-950 text-zinc-100 min-h-screen selection:bg-emerald-500 selection:text-zinc-950">
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

      <Navbar />
      
      <div className={cn("transition-opacity duration-1000", isLoading ? "opacity-0" : "opacity-100")}>
        <Hero />
        <About />
        <Philosophy />
        <Skills />
        <Activities />
        <Gallery />
        <Testimonials />
        <Contact />
        <Footer />
      </div>

      {/* Custom Cursor / Accent Glow */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </main>
  );
}
