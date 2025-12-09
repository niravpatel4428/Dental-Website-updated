import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock, ArrowRight, CheckCircle2, Star, ChevronDown, ChevronUp, Facebook, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';
import * as Icons from 'lucide-react';
import { SERVICES, REVIEWS, FAQS, PRICING, WHY_CHOOSE_US } from './constants';
import { AIChat } from './components/AIChat';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Refs for animation context
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Parallax & Reveal
      gsap.to(".hero-bg-img", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      const tlHero = gsap.timeline({ delay: 0.2 });
      tlHero.from(".hero-content > *", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out"
      });

      // 2. Section Title Reveals (Generic)
      gsap.utils.toArray('.section-header').forEach((header: any) => {
        gsap.from(header.children, {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // 3. About Section: Image Clip-path Reveal
      gsap.fromTo(".about-img-reveal", 
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" },
        { 
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: ".about-img-reveal",
            start: "top 75%"
          }
        }
      );

      gsap.from(".about-content > *", {
        x: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 80%"
        }
      });

      // 4. Services Stagger - Individual Triggers
      gsap.utils.toArray('.services-grid').forEach((card: any, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: (i % 3) * 0.1, // Stagger effect
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 90%", // Trigger when top of card enters bottom 10% of viewport
            toggleActions: "play none none reverse"
          }
        });
      });

      // 5. Gallery Parallax & Reveal - Individual Triggers
      gsap.utils.toArray('.gallery-card').forEach((card: any, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // 6. Why Choose Us (Icon Pop) - Individual Triggers
      gsap.utils.toArray('.features-grid').forEach((item: any, i) => {
        gsap.from(item, {
          scale: 0.9,
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: (i % 2) * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // 7. Reviews Slide - Individual Triggers
      gsap.utils.toArray('.reviews-grid').forEach((card: any, i) => {
        gsap.from(card, {
          x: 50,
          opacity: 0,
          duration: 1,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

       // 8. Pricing Pop - Individual Triggers
       gsap.utils.toArray('.pricing-grid').forEach((card: any, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

    }, mainRef);

    // Refresh ScrollTrigger after a slight delay to ensure layout is settled
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div ref={mainRef} className="font-sans text-slate-800 bg-white overflow-x-hidden selection:bg-primary-200 selection:text-primary-900">
      
      {/* Top Bar */}
      <div className="bg-secondary-900 text-slate-300 py-2.5 text-xs md:text-sm hidden lg:block border-b border-white/5 relative z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-8">
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><Phone size={14} className="text-primary-500" /> (555) 123-4567</span>
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><MapPin size={14} className="text-primary-500" /> 123 Medical Plaza, Suite 400</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Clock size={14} className="text-primary-500" /> Mon - Fri: 9:00 AM - 6:00 PM</span>
            <div className="flex gap-4 border-l border-white/10 pl-6">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="hover:text-primary-400 transition-colors transform hover:scale-110"><Icon size={14}/></a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3 top-0' : 'bg-transparent py-6 top-0 lg:top-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2.5 group">
             <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all duration-300">L</div>
             <span className={`text-2xl font-extrabold tracking-tight ${isScrolled ? 'text-secondary-900' : 'text-secondary-900 lg:text-white'}`}>Lumina<span className="text-primary-500">Dental</span></span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`font-semibold text-sm tracking-wide uppercase hover:text-primary-500 transition-colors relative group py-2 ${isScrolled ? 'text-secondary-600' : 'text-white/90'}`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
            ))}
            <a href="#contact" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-primary-500/40 flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0">
              Book Appointment
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-secondary-900 hover:bg-gray-100' : 'text-secondary-900 lg:text-white hover:bg-white/10'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 transition-all duration-300 origin-top shadow-xl ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col p-6 gap-2">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-lg font-medium text-secondary-700 py-3 border-b border-gray-50 hover:text-primary-600 px-2 rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center group"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"/>
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-primary-600 text-white text-center py-4 rounded-xl font-bold mt-4 shadow-lg active:scale-95 transition-transform"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Appointment
            </a>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section id="home" className="relative h-[110vh] min-h-[800px] flex items-center pt-20 overflow-hidden bg-secondary-900">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0 h-[120%] -top-[10%] hero-bg-img">
          <img 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000" 
            alt="Modern Dental Clinic" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-950 via-secondary-900/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-transparent to-transparent"></div>
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 hero-content">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-primary-300 font-semibold text-sm uppercase tracking-wider">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
              </span>
              Accepting New Patients
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Crafting Smiles, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">Changing Lives.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-lg leading-relaxed font-light">
              Experience world-class dental care where advanced technology meets compassionate treatment. Your journey to a perfect smile begins here.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#contact" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] text-center flex justify-center items-center gap-2 group">
                Book Appointment <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
              </a>
              <a href="#services" className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all text-center hover:border-white/40">
                Explore Services
              </a>
            </div>
            
            <div className="pt-8 border-t border-white/10 flex gap-8">
              {[
                { val: "2k+", label: "Happy Patients" },
                { val: "15+", label: "Years Experience" },
                { val: "4.9", label: "Google Rating", icon: Star }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-white">{stat.val}</div>
                  <div className="text-sm text-slate-400 flex items-center gap-1">
                    {stat.label} {stat.icon && <stat.icon size={12} className="fill-yellow-500 text-yellow-500"/>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <a href="#about" className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce cursor-pointer hover:text-white transition-colors z-20">
           <ChevronDown size={32} />
        </a>
      </section>

      {/* 2. About the Dentist */}
      <section id="about" className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
             {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

            <div className="relative about-img-reveal">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000" 
                alt="Dr. Emily Chen" 
                className="rounded-2xl shadow-2xl w-full object-cover h-[700px] hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 border-[1px] border-white/20 rounded-2xl pointer-events-none"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute bottom-12 -right-6 lg:-right-12 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-xs border border-white/50 about-content">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                  <Icons.Award size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary-900">Top Rated</div>
                  <div className="text-xs font-bold text-primary-600 uppercase tracking-wider">Dentist 2024</div>
                </div>
              </div>
              <p className="text-sm text-slate-500 italic">"Dedicated to excellence in every smile."</p>
            </div>
          </div>
          
          {/* Content Side */}
          <div className="order-1 lg:order-2 about-content">
            <div className="inline-block text-primary-600 font-bold uppercase tracking-widest text-sm mb-4 border-b-2 border-primary-200 pb-1">About The Doctor</div>
            <h2 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-8 leading-[1.1]">Meet Dr. Emily Chen, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Your Smile Architect</span></h2>
            
            <div className="space-y-6 text-lg text-slate-600">
              <p>
                Dr. Chen graduated with honors from Harvard School of Dental Medicine and has dedicated her career to bringing confidence back to her patients' smiles. With a focus on minimally invasive dentistry and aesthetic perfection, she combines art and science to deliver exceptional results.
              </p>
              <p>
                She believes that a visit to the dentist should be a positive, empowering experience. Her clinic is designed to be a sanctuary of calm where cutting-edge technology meets genuine human care.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
              {['ADA Member', 'Invisalign Certified', 'Cosmetic Specialist', 'Painless Certified'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-secondary-800 font-medium bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-primary-200 hover:bg-white hover:shadow-md transition-all">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                    <CheckCircle2 className="text-primary-600" size={14} />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" alt="Signature" className="h-12 opacity-40 hover:opacity-100 transition-opacity" />
              <div className="h-10 w-px bg-slate-200"></div>
              <div className="text-sm font-bold text-secondary-900 uppercase tracking-widest">
                Lead Dentist
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services */}
      <section id="services" className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 section-header">
            <div className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-3">Our Expertise</div>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">Comprehensive Dental Care</h2>
            <p className="text-slate-500 text-lg">From routine hygiene to full mouth reconstruction, we use the latest technology to ensure the best outcomes for your oral health.</p>
          </div>

          <div id="services-grid" className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => {
              const Icon = (Icons as any)[service.iconName] || Icons.Activity;
              return (
                <div key={service.id} className="service-card group p-10 rounded-[2.5rem] bg-white hover:bg-secondary-900 transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-slate-100">
                   {/* Decorative circle */}
                   <div className="absolute -right-20 -top-20 w-60 h-60 bg-primary-50 rounded-full group-hover:bg-white/5 transition-colors duration-500"></div>

                  <div className="w-16 h-16 bg-primary-50 group-hover:bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-primary-600 group-hover:text-primary-400 transition-colors mb-8 relative z-10 shadow-inner">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 group-hover:text-white mb-4 relative z-10 transition-colors">{service.title}</h3>
                  <p className="text-slate-500 group-hover:text-slate-400 mb-8 leading-relaxed relative z-10 transition-colors">{service.description}</p>
                  <a href="#contact" className="inline-flex items-center text-primary-600 group-hover:text-white font-bold tracking-wide relative z-10 text-sm uppercase">
                    Learn More <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Before & After Gallery */}
      <section id="gallery" className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 section-header">
            <div>
              <div className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-3">Real Results</div>
              <h2 className="text-4xl md:text-5xl font-bold text-secondary-900">Transformed Smiles</h2>
            </div>
            <p className="text-slate-500 max-w-md text-lg text-right md:text-left">Witness the life-changing confidence we bring to our patients through our cosmetic and restorative procedures.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              { title: "Complete Smile Makeover", desc: "Porcelain veneers to correct spacing and discoloration.", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800", badge: "Veneers" },
              { title: "Zoom! Whitening", desc: "4 shades whiter in just one 60-minute session.", img: "https://images.unsplash.com/photo-1588776814546-1b936d544c1b?auto=format&fit=crop&q=80&w=800", badge: "Whitening" }
            ].map((item, idx) => (
               <div key={idx} className="gallery-card group cursor-pointer relative">
                  <div className="relative overflow-hidden rounded-[2rem] mb-6 shadow-lg aspect-[4/3] transform transition-transform duration-500 group-hover:shadow-2xl">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-xl border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                       {item.badge}
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                       <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                       <p className="text-white/80 mb-6">{item.desc}</p>
                       <button className="bg-white text-secondary-900 px-6 py-3 rounded-xl font-bold w-full hover:bg-primary-50 transition-colors">View Case Study</button>
                    </div>
                  </div>
                  <div className="group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-2xl font-bold text-secondary-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500">{item.desc}</p>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-32 px-6 bg-secondary-900 text-white relative overflow-hidden">
         {/* Background Pattern */}
         <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2dd4bf 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none"></div>

         <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div className="section-header">
                  <div className="text-primary-400 font-bold uppercase tracking-widest text-sm mb-3">Why Choose Lumina</div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Experience the Difference in <span className="text-primary-400">Modern Dentistry</span></h2>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8">
                     We combine art, science, and technology to provide the highest standard of dental care. Our patient-first approach ensures you feel heard, comfortable, and cared for at every step.
                  </p>
                  <a href="#contact" className="inline-flex items-center gap-2 text-white font-bold border-b border-primary-500 pb-1 hover:text-primary-400 transition-colors">
                    Schedule Your Visit <ArrowRight size={16}/>
                  </a>
               </div>
               <div id="features-grid" className="features-grid grid sm:grid-cols-2 gap-6">
                  {WHY_CHOOSE_US.map((item, idx) => {
                     const Icon = (Icons as any)[item.iconName] || Icons.Check;
                     return (
                        <div key={idx} className="feature-item bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-primary-500/50 hover:bg-white/10 transition-all duration-300 group">
                           <div className="w-12 h-12 bg-secondary-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-primary-400">
                              <Icon size={24} />
                           </div>
                           <h4 className="text-xl font-bold mb-3 text-white">{item.title}</h4>
                           <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                        </div>
                     )
                  })}
               </div>
            </div>
         </div>
      </section>

      {/* 6. Patient Reviews */}
      <section id="reviews" className="py-32 px-6 bg-primary-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 section-header">
            <div className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-3">Testimonials</div>
            <h2 className="text-4xl font-bold text-secondary-900">What Our Patients Say</h2>
          </div>
          <div id="reviews-grid" className="reviews-grid grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div key={review.id} className="review-card bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 relative group border border-slate-100">
                <Icons.Quote className="absolute top-8 right-8 text-primary-100 group-hover:text-primary-200 transition-colors" size={60} />
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 italic mb-8 relative z-10 text-lg leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative">
                    <img src={review.image} alt={review.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                       <Icons.Check size={10} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-secondary-900 text-lg">{review.name}</div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wide">Patient since 2021</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Pricing */}
      <section id="pricing" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 section-header">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">Transparent Pricing</h2>
            <p className="text-slate-600 text-lg">No hidden fees. Just clear, honest pricing for your dental care.</p>
          </div>

          <div id="pricing-grid" className="pricing-grid grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {PRICING.map((item, idx) => (
              <div key={idx} className={`pricing-card rounded-[2.5rem] p-10 transition-all duration-300 relative ${idx === 1 ? 'bg-secondary-900 text-white shadow-2xl scale-110 z-10 border-none ring-4 ring-primary-500/20' : 'bg-white border border-slate-100 text-secondary-900 hover:border-primary-200 shadow-xl hover:shadow-2xl'}`}>
                {idx === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${idx === 1 ? 'text-white' : 'text-secondary-900'}`}>{item.treatment}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                   <span className={`text-5xl font-bold ${idx === 1 ? 'text-primary-400' : 'text-primary-600'}`}>{item.price}</span>
                   <span className={`text-sm ${idx === 1 ? 'text-slate-400' : 'text-slate-500'}`}>/ starting at</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {item.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${idx === 1 ? 'bg-white/10' : 'bg-primary-50'}`}>
                         <CheckCircle2 size={12} className={idx === 1 ? 'text-primary-400' : 'text-primary-600'} /> 
                      </div>
                      <span className={idx === 1 ? 'text-slate-300' : 'text-slate-600'}>{feat}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`block text-center py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 ${idx === 1 ? 'bg-primary-500 text-white hover:bg-primary-600' : 'bg-secondary-50 text-secondary-900 hover:bg-secondary-100'}`}>
                  Select Plan
                </a>
              </div>
            ))}
          </div>

          <div className="mt-24 bg-gradient-to-br from-primary-50 to-white border border-primary-100 p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-10 max-w-5xl mx-auto shadow-sm">
            <div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2 flex items-center gap-2"><Icons.ShieldCheck className="text-primary-600"/> We Accept Insurance</h3>
              <p className="text-slate-600">We work with Delta Dental, Cigna, Aetna, MetLife, and many major providers.</p>
            </div>
            <div className="flex flex-wrap gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="font-black text-2xl text-slate-800 tracking-tighter">DeltaDental</div>
               <div className="font-black text-2xl text-slate-800 tracking-tighter">Cigna</div>
               <div className="font-black text-2xl text-slate-800 tracking-tighter">aetna</div>
               <div className="font-black text-2xl text-slate-800 tracking-tighter">MetLife</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 section-header">
             <div className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-3">Common Questions</div>
             <h2 className="text-4xl font-bold text-secondary-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:border-primary-300 transition-colors duration-300">
                <button 
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                >
                  <span className={`font-bold text-lg transition-colors ${openFaqIndex === idx ? 'text-primary-600' : 'text-secondary-900'}`}>{faq.question}</span>
                  <div className={`transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180' : 'rotate-0'}`}>
                    {openFaqIndex === idx ? <ChevronUp className="text-primary-500" /> : <ChevronDown className="text-slate-400" />}
                  </div>
                </button>
                <div 
                   className={`px-6 text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="leading-relaxed border-t border-slate-100 pt-4 text-slate-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Contact & Map */}
      <section id="contact" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16 section-header">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">Book Your Appointment</h2>
            <p className="text-slate-500 text-lg">We look forward to welcoming you to our clinic.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
            {/* Form Side */}
            <div className="p-10 md:p-16 bg-white order-2 lg:order-1">
              <h3 className="text-2xl font-bold text-secondary-900 mb-8">Send us a Message</h3>
              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">First Name</label>
                     <input type="text" className="w-full px-5 py-4 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all text-secondary-900 placeholder-slate-400 font-medium outline-none" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Last Name</label>
                     <input type="text" className="w-full px-5 py-4 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all text-secondary-900 placeholder-slate-400 font-medium outline-none" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Email</label>
                   <input type="email" className="w-full px-5 py-4 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all text-secondary-900 placeholder-slate-400 font-medium outline-none" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Service</label>
                   <div className="relative">
                      <select className="w-full px-5 py-4 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all text-secondary-900 font-medium appearance-none outline-none cursor-pointer">
                        <option value="">Select a Treatment</option>
                        <option value="checkup">General Checkup</option>
                        <option value="cleaning">Professional Cleaning</option>
                        <option value="whitening">Teeth Whitening</option>
                        <option value="emergency">Emergency Care</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18}/>
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Message</label>
                   <textarea rows={4} className="w-full px-5 py-4 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all text-secondary-900 placeholder-slate-400 font-medium resize-none outline-none" placeholder="Tell us about your needs..."></textarea>
                </div>
                <button type="submit" className="w-full bg-secondary-900 text-white font-bold py-5 rounded-xl hover:bg-primary-600 transition-all shadow-lg mt-6 flex justify-center items-center gap-2 group">
                  Request Appointment <Icons.Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
            
            {/* Info & Map Side */}
            <div className="relative min-h-[500px] lg:min-h-full bg-secondary-900 order-1 lg:order-2 flex flex-col">
               <div className="relative z-10 p-12 lg:p-16 text-white bg-gradient-to-b from-secondary-900/90 to-secondary-900/0">
                  <h3 className="text-3xl font-bold mb-10">Contact Information</h3>
                  <div className="space-y-8">
                     <div className="flex items-start gap-6 group cursor-pointer">
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary-600 transition-colors">
                           <Phone className="text-white" size={24}/>
                        </div>
                        <div>
                           <div className="font-bold text-xl mb-1">Phone</div>
                           <p className="text-slate-300 text-lg group-hover:text-white transition-colors">(555) 123-4567</p>
                           <p className="text-slate-400 text-sm mt-1">Mon-Fri 9am-6pm</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-6 group cursor-pointer">
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary-600 transition-colors">
                           <MapPin className="text-white" size={24}/>
                        </div>
                        <div>
                           <div className="font-bold text-xl mb-1">Location</div>
                           <p className="text-slate-300 text-lg group-hover:text-white transition-colors">123 Medical Plaza, Suite 400</p>
                           <p className="text-slate-300 text-lg group-hover:text-white transition-colors">New York, NY 10001</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-6 group cursor-pointer">
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary-600 transition-colors">
                           <Mail className="text-white" size={24}/>
                        </div>
                        <div>
                           <div className="font-bold text-xl mb-1">Email</div>
                           <p className="text-slate-300 text-lg group-hover:text-white transition-colors">hello@luminadental.com</p>
                        </div>
                     </div>
                  </div>
               </div>
               
               {/* Map Overlay */}
               <div className="absolute inset-0 z-0">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153167!3d-37.817323442021134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sus!4v1642998765432!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(80%)' }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    title="Google Map"
                    className="opacity-40 hover:opacity-100 transition-all duration-700"
                  ></iframe>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-950 text-white pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">L</div>
              <span className="text-2xl font-bold">Lumina<span className="text-primary-600">Dental</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8">
              Pioneering the future of dental care with technology, expertise, and a gentle human touch.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary-600 transition-all hover:scale-110 hover:-translate-y-1">
                   <Icon size={18} />
                 </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-8 text-white">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              {['About Us', 'Services', 'Case Studies', 'Reviews'].map(link => (
                <li key={link}><a href="#" className="hover:text-primary-500 transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-primary-600 group-hover:translate-x-1 transition-transform"/> {link}</a></li>
              ))}
            </ul>
          </div>

          <div>
             <h4 className="text-lg font-bold mb-8 text-white">Services</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-primary-500 transition-colors">Cosmetic Dentistry</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Dental Implants</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Invisalign</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">General Checkups</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 text-white">Newsletter</h4>
            <p className="text-slate-400 mb-4">Subscribe to get the latest dental health tips.</p>
            <form className="flex gap-2">
               <input type="email" placeholder="Your Email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm w-full focus:outline-none focus:border-primary-500 transition-colors" />
               <button className="bg-primary-600 text-white rounded-lg px-4 hover:bg-primary-700 transition-colors"><ArrowRight size={18}/></button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6 gap-4">
          <div>© {new Date().getFullYear()} Lumina Dental Clinic. All rights reserved.</div>
          <div className="flex gap-6">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
      
      {/* AI Chat Widget */}
      <AIChat />
    </div>
  );
};

export default App;