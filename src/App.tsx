/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter, 
  ChevronRight, 
  Star, 
  MessageCircle,
  Clock,
  Dumbbell,
  Users,
  Trophy,
  ArrowUpRight
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Floors', href: '#floors' },
    { name: 'Membership', href: '#membership' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-header py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-action-orange flex items-center justify-center rounded-sm rotate-45 group-hover:rotate-0 transition-transform duration-300">
            <Dumbbell className="text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" size={24} />
          </div>
          <span className="font-display text-2xl font-bold tracking-tighter">ANCHOR <span className="text-action-orange">FITNESS</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="font-display text-sm uppercase tracking-widest hover:text-action-orange transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a 
            href="#membership" 
            className="bg-action-orange hover:bg-action-orange-hover text-white px-8 py-3 font-display text-sm uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95"
          >
            Join Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#0a0a0a] z-[60] lg:hidden flex flex-col items-center justify-center gap-6 p-6"
          >
            {/* Close Button in Mobile Menu */}
            <button 
              className="absolute top-6 right-6 text-white" 
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>

            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="font-display text-xl uppercase tracking-widest hover:text-action-orange transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#membership" 
              onClick={() => setIsOpen(false)}
              className="bg-action-orange text-white px-10 py-3 font-display text-lg uppercase tracking-widest mt-4"
            >
              Join Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
          alt="Gym Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-action-orange font-display tracking-[0.5em] uppercase text-sm mb-4 block">Your Strength, Anchored</span>
          <h1 className="text-clamp-hero font-bold leading-none mb-8">
            TRANSFORM YOURSELF AT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">DELTA 1'S ULTIMATE</span> <br />
            FITNESS HUB
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#membership" className="bg-action-orange hover:bg-action-orange-hover text-white px-10 py-5 font-display text-lg uppercase tracking-widest transition-all group flex items-center gap-2">
              Start Your Journey
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#floors" className="border border-white/30 hover:border-white text-white px-10 py-5 font-display text-lg uppercase tracking-widest transition-all backdrop-blur-sm">
              Explore Floors
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-action-orange to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

const FloorShowcase = () => {
  const floors = [
    {
      level: '01',
      floor: '3rd Floor',
      title: 'Strength & Cardio Zone',
      desc: 'Equipped with heavy-duty power racks, Olympic platforms, and premium cardio machines for peak performance.',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop',
      features: ['Olympic Lifting', 'Cardio Suite', 'Functional Area']
    },
    {
      level: '02',
      floor: '4th Floor',
      title: 'Elite Training & Recovery',
      desc: 'Dedicated space for personal training, group classes, and a recovery lounge to recharge your body.',
      image: 'https://images.unsplash.com/photo-1571902251103-d71b46b5fce3?q=80&w=2070&auto=format&fit=crop',
      features: ['Personal Training', 'Yoga Studio', 'Recovery Lounge']
    }
  ];

  return (
    <section id="floors" className="py-24 bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-clamp-section font-bold mb-4">TWO FLOORS OF EXCELLENCE</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Experience a massive fitness space designed for every goal, from raw strength to holistic wellness.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {floors.map((f, i) => (
            <motion.div 
              key={f.level}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group relative h-[500px] overflow-hidden rounded-sm cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
              <img 
                src={f.image} 
                alt={f.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute top-8 right-8 z-20">
                <div className="bg-action-orange text-white font-display px-4 py-2 text-xl shadow-[0_0_20px_rgba(255,77,0,0.5)] group-hover:shadow-[0_0_30px_rgba(255,77,0,0.8)] transition-shadow">
                  LEVEL {f.level}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-10 z-20 bg-gradient-to-t from-black/90 to-transparent">
                <span className="text-action-orange font-display uppercase tracking-widest text-sm mb-2 block">{f.floor}</span>
                <h3 className="text-3xl font-bold mb-4">{f.title}</h3>
                <p className="text-gray-300 mb-6 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">{f.desc}</p>
                <div className="flex gap-4">
                  {f.features.map(feat => (
                    <span key={feat} className="text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Membership = () => {
  const plans = [
    {
      name: 'Starter',
      price: '₹1,999',
      period: 'per month',
      features: ['Access to 3rd Floor', 'Standard Equipment', 'Locker Room Access', 'General Training'],
      popular: false
    },
    {
      name: 'Pro Elite',
      price: '₹3,499',
      period: 'per month',
      features: ['Access to Both Floors', 'All Premium Equipment', '2 PT Sessions / Month', 'Nutrition Consultation', 'Recovery Lounge Access'],
      popular: true
    },
    {
      name: 'Annual Anchor',
      price: '₹29,999',
      period: 'per year',
      features: ['Unlimited Access', 'Priority PT Booking', 'Free Guest Passes', 'Merchandise Kit', 'All Workshops Included'],
      popular: false
    }
  ];

  return (
    <section id="membership" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-action-orange rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-clamp-section font-bold mb-4">MEMBERSHIP TIERS</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Choose the plan that fits your ambition. No hidden fees, just pure results.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-10 rounded-sm border ${plan.popular ? 'border-action-orange bg-charcoal' : 'border-white/10 bg-black/40'} flex flex-col`}
            >
              {plan.popular && (
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-display text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full"
                >
                  Most Popular
                </motion.div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-8">
                <span className="text-4xl font-bold text-action-orange">{plan.price}</span>
                <span className="text-gray-500 text-sm ml-2">/ {plan.period}</span>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map(feat => (
                  <li key={feat} className="flex items-center gap-3 text-gray-300 text-sm">
                    <div className="w-5 h-5 rounded-full bg-action-orange/10 flex items-center justify-center">
                      <ChevronRight size={12} className="text-action-orange" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 font-display uppercase tracking-widest transition-all ${plan.popular ? 'bg-action-orange text-white hover:bg-action-orange-hover' : 'border border-white/20 hover:border-white text-white'}`}>
                Select Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Trainers = () => {
  const trainers = [
    { name: 'Vikram Singh', role: 'Head Coach', img: 'https://images.unsplash.com/photo-1567013127542-490d757e51fe?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Rohan Sharma', role: 'Strength Specialist', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Anjali Verma', role: 'Yoga & Mobility', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Kabir Das', role: 'Bodybuilding Pro', img: 'https://images.unsplash.com/photo-1491752355132-483f4c59cc4a?q=80&w=2070&auto=format&fit=crop' }
  ];

  return (
    <section id="trainers" className="py-24 bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-clamp-section font-bold mb-4">ELITE TRAINERS</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Our certified experts are here to push your limits and ensure you train with perfect form.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {trainers.map((t, i) => (
            <motion.div 
              key={t.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="relative mb-6 mx-auto w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-transparent group-hover:border-action-orange transition-all duration-500 p-2">
                <div className="w-full h-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">{t.name}</h3>
              <p className="text-action-orange font-display text-xs uppercase tracking-widest">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: 'Rahul K.', rating: 5, text: "The best gym in Greater Noida. The two-floor setup is amazing and never feels crowded. The equipment is top-notch!", avatar: 'https://i.pravatar.cc/150?u=rahul' },
    { name: 'Sneha M.', rating: 5, text: "Anchor Fitness changed my perspective on training. The trainers are knowledgeable and the vibe is elite.", avatar: 'https://i.pravatar.cc/150?u=sneha' },
    { name: 'Amit P.', rating: 5, text: "Midnight Elite theme is so cool. Love working out here late evenings. Highly recommended for serious lifters.", avatar: 'https://i.pravatar.cc/150?u=amit' }
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-clamp-section font-bold mb-4">SUCCESS STORIES</h2>
        </div>

        <div className="max-w-4xl mx-auto relative h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={active}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="absolute inset-0 flex flex-col items-center text-center"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(reviews[active].rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-action-orange text-action-orange" />
                ))}
              </div>
              <p className="text-xl md:text-2xl text-gray-300 italic mb-8 leading-relaxed">
                "{reviews[active].text}"
              </p>
              <div className="flex items-center gap-4">
                <img src={reviews[active].avatar} alt={reviews[active].name} className="w-12 h-12 rounded-full border border-action-orange" />
                <span className="font-bold text-lg">{reviews[active].name}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {reviews.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActive(i)}
              className={`w-3 h-3 rounded-full transition-all ${active === i ? 'bg-action-orange w-8' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-clamp-section font-bold mb-8">GET IN TOUCH</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-display">Full Name</label>
                  <input type="text" className="w-full bg-black/40 border border-white/10 p-4 focus:border-action-orange outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-display">Email Address</label>
                  <input type="email" className="w-full bg-black/40 border border-white/10 p-4 focus:border-action-orange outline-none transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-display">Message</label>
                <textarea rows={5} className="w-full bg-black/40 border border-white/10 p-4 focus:border-action-orange outline-none transition-colors" placeholder="Tell us about your fitness goals..." />
              </div>
              <button className="bg-action-orange hover:bg-action-orange-hover text-white px-12 py-4 font-display uppercase tracking-widest transition-all w-full md:w-auto">
                Send Message
              </button>
            </form>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-action-orange/10 p-3 rounded-sm">
                  <MapPin className="text-action-orange" size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Our Location</h4>
                  <p className="text-gray-400 text-sm">Delta 1, 3rd & 4th floor, Shivam Plaza, Greater Noida, UP 201308</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-action-orange/10 p-3 rounded-sm">
                  <Phone className="text-action-orange" size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Call Us</h4>
                  <p className="text-gray-400 text-sm">+91 9798544288</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[500px] lg:h-auto rounded-sm overflow-hidden border border-white/10"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.828859345266!2d77.5147!3d28.4544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1d9e0000001%3A0x8b4c2b8b8b8b8b8b!2sShivam%20Plaza!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
              allowFullScreen={true} 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-action-orange flex items-center justify-center rounded-sm rotate-45">
              <Dumbbell className="text-white -rotate-45" size={18} />
            </div>
            <span className="font-display text-xl font-bold tracking-tighter">ANCHOR <span className="text-action-orange">FITNESS</span></span>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter size={20} /></a>
          </div>

          <p className="text-gray-600 text-xs uppercase tracking-widest">
            © 2026 Anchor Fitness Club. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppFAB = () => {
  return (
    <motion.a
      href="https://wa.me/919798544288"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ 
        scale: [1, 1.05, 1],
      }}
      transition={{
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        default: { duration: 0.5 }
      }}
      whileHover="hover"
      whileTap={{ scale: 0.9, rotate: -5 }}
      className="fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center group"
    >
      <MessageCircle size={28} />
      
      {/* Tooltip */}
      <motion.span 
        variants={{
          initial: { opacity: 0, x: 20, scale: 0.8 },
          hover: { opacity: 1, x: 0, scale: 1 }
        }}
        initial="initial"
        className="absolute right-full mr-5 bg-white text-black text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm shadow-2xl pointer-events-none whitespace-nowrap flex items-center"
      >
        Chat with us
        {/* Tooltip Arrow */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-white rotate-45" />
      </motion.span>

      <motion.div 
        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 bg-[#25D366] rounded-full -z-10"
      />
    </motion.a>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FloorShowcase />
      
      {/* Stats Section */}
      <section className="py-20 bg-action-orange text-white">
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl md:text-6xl font-display font-bold mb-2">10K+</div>
            <div className="text-xs uppercase tracking-[0.3em] font-medium opacity-80">Sq Ft Space</div>
          </div>
          <div>
            <div className="text-4xl md:text-6xl font-display font-bold mb-2">500+</div>
            <div className="text-xs uppercase tracking-[0.3em] font-medium opacity-80">Active Members</div>
          </div>
          <div>
            <div className="text-4xl md:text-6xl font-display font-bold mb-2">15+</div>
            <div className="text-xs uppercase tracking-[0.3em] font-medium opacity-80">Expert Trainers</div>
          </div>
          <div>
            <div className="text-4xl md:text-6xl font-display font-bold mb-2">24/7</div>
            <div className="text-xs uppercase tracking-[0.3em] font-medium opacity-80">CCTV Security</div>
          </div>
        </div>
      </section>

      <Membership />
      <Trainers />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
