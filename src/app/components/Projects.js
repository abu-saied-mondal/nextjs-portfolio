"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Projects() {
  const wrapperRef = useRef(null);   // Tall scroll container
  const sectionRef = useRef(null);   // Sticky view viewport
  const progressRef = useRef(null);
  const counterRef = useRef(null);

  const [projects, setProjects] = useState([
    {
      id: "1",
      title: "ZTS India — Dynamic Corporate Portal",
      desc: "A fully dynamic corporate website built from scratch for a major Kolkata company. Features a custom WordPress-like CMS in Laravel — admins control pages, blogs, media, navigation, and SEO metadata entirely from a dashboard.",
      tech: ["Laravel", "PHP", "MySQL", "Custom CMS", "SEO Management"],
      image: "/zts_mockup.png",
      demoLink: "https://ztsindia.com/",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#00f2fe",
    },
    {
      id: "2",
      title: "Enterprise HRM Ecosystem",
      desc: "All-in-one HRM System with 25+ modules: HR Core, AI Resume Screening, Biometric/GPS Attendance, Leave Management, Payroll with Bank Transfer, LMS Training Portal, and Advanced Analytics.",
      tech: ["Laravel", "MySQL", "PostgreSQL", "AI Features", "Real-time Analytics"],
      image: "/hrm_system.jpg",
      demoLink: "https://ascinate.in/demo/hrm_system",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#7000ff",
    },
    {
      id: "3",
      title: "HerCompass — AI Health Companion",
      desc: "Personalized AI-powered health companion for women 45+. Tracks mood, symptoms, sleep, and energy — transforms daily logs into predictive, actionable wellness insights using intelligent AI pattern analysis.",
      tech: ["MERN Stack", "Node.js", "MongoDB", "AI Processing", "Predictive Analytics"],
      image: "/hercompass.jpg",
      demoLink: "https://newhercompass.vercel.app/",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#ff007b",
    },
    {
      id: "4",
      title: "IconsGeek",
      desc: "Subscription-based icon marketplace with dynamic SVG rendering, real-time color/size customization, downloadable PNG/JPG exports, and a full Stripe checkout flow. Independently architected and deployed.",
      tech: ["Next.js", "Laravel", "MySQL", "Stripe API", "REST APIs"],
      image: "/dashboard_mockup.png",
      demoLink: "https://www.iconsgeek.com/",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#00f2fe",
    },
    {
      id: "5",
      title: "SnapHive — Photo Sharing App",
      desc: "Full-stack mobile social platform: public/private photo hives, in-app camera filters, one-tap email invites, Firebase cloud storage, real-time chat, and AI-based image generation built into the creator flow.",
      tech: ["React Native CLI", "Node.js", "Express", "Firebase", "AI APIs"],
      image: "/workspace_mockup.png",
      demoLink: "#",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#ff7b00",
    },
    {
      id: "6",
      title: "Louis — Video Dating App",
      desc: "Tinder-style matchmaking with vertical video profiles, swipe gesture UX, and real-time Socket.IO messaging. Engineered performant video loading pipelines. Published live on the iOS App Store.",
      tech: ["React Native Expo", "Node.js", "Socket.IO", "MongoDB", "Video Rendering"],
      image: "/ecommerce_mockup.png",
      demoLink: "https://apps.apple.com/in/app/louis-dating/id6472041327",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#7000ff",
    },
  ]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (data.success && data.projects) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error("Failed to load projects dynamic content:", err);
      }
    }
    loadProjects();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const cards = section.querySelectorAll(".proj-card-3d");
    if (!wrapper || !section || !cards.length) return;

    // Define Z-spacing depth between cards in the hallway
    const cardSpacing = 750;
    const totalDepth = cards.length * cardSpacing;
    const scrollDistance = totalDepth + 600; // Additional space to fly the last card past viewport

    // Set height dynamically
    wrapper.style.height = `${scrollDistance + window.innerHeight}px`;

    const camera = { z: 0 };

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.0,
      onUpdate: (self) => {
        const currentCameraZ = self.progress * scrollDistance;
        
        cards.forEach((card, i) => {
          const isEven = i % 2 === 0;
          const initialZ = -i * cardSpacing;
          const currentZ = initialZ + currentCameraZ;

          // Base positions
          let x = isEven ? -280 : 280;
          let rotateY = isEven ? 20 : -20;
          let opacity = 1;

          if (currentZ > 150) {
            // Card is getting extremely close and flying past camera
            const fadeFactor = Math.min((currentZ - 150) / 450, 1);
            x += isEven ? -fadeFactor * 420 : fadeFactor * 420;
            rotateY += isEven ? -fadeFactor * 35 : fadeFactor * 35;
            opacity = 1 - fadeFactor;
          } else if (currentZ < -1500) {
            // Fog fade for cards deep in the background
            const fadeFactor = Math.min((currentZ + 1500) / -600, 1);
            opacity = 1 - fadeFactor;
          }

          // Dynamically compute z-index so closer cards are sorted on top and clickable
          const depthZIndex = Math.round(10000 + currentZ);

          // Apply styles via GSAP
          gsap.set(card, {
            z: currentZ,
            x: x,
            rotateY: rotateY,
            opacity: opacity,
            zIndex: depthZIndex,
            pointerEvents: (currentZ > 300 || currentZ < -1000) ? "none" : "auto",
            visibility: opacity <= 0 ? "hidden" : "visible",
          });
        });

        // Update progress bar
        if (progressRef.current) {
          progressRef.current.style.width = `${self.progress * 100}%`;
        }

        // Update active index counter
        if (counterRef.current) {
          const idx = Math.min(
            Math.round(self.progress * (cards.length - 1)),
            cards.length - 1
          );
          counterRef.current.textContent = `0${idx + 1}`;
        }
      }
    });

    const handleResize = () => {
      wrapper.style.height = `${scrollDistance + window.innerHeight}px`;
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      st.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, [projects]);

  return (
    <>
      {/* ── Desktop View (3D Hallway Walkthrough) ───────────────────── */}
      <div className="hidden md:block" ref={wrapperRef} style={{ position: "relative" }}>
        
        {/* Sticky viewport panel */}
        <div
          ref={sectionRef}
          className="sticky top-0 w-full overflow-hidden bg-[#03030f]"
          style={{ height: "100vh" }}
        >
          {/* Neon Grid Floor */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "200vw",
              height: "200vh",
              top: "35%",
              left: "-50%",
              background: `
                linear-gradient(to top, rgba(3,3,15,1) 15%, transparent 60%),
                repeating-linear-gradient(90deg, rgba(0,242,254,0.05) 0px, rgba(0,242,254,0.05) 1px, transparent 1px, transparent 40px),
                repeating-linear-gradient(0deg, rgba(0,242,254,0.05) 0px, rgba(0,242,254,0.05) 1px, transparent 1px, transparent 40px)
              `,
              transform: "rotateX(82deg) translateY(-15%)",
              transformOrigin: "center top",
              transformStyle: "preserve-3d",
              opacity: 0.9,
            }}
          />

          {/* Neon Grid Ceiling */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "200vw",
              height: "200vh",
              bottom: "65%",
              left: "-50%",
              background: `
                linear-gradient(to bottom, rgba(3,3,15,1) 15%, transparent 60%),
                repeating-linear-gradient(90deg, rgba(112,0,255,0.03) 0px, rgba(112,0,255,0.03) 1px, transparent 1px, transparent 40px),
                repeating-linear-gradient(0deg, rgba(112,0,255,0.03) 0px, rgba(112,0,255,0.03) 1px, transparent 1px, transparent 40px)
              `,
              transform: "rotateX(-82deg) translateY(15%)",
              transformOrigin: "center bottom",
              transformStyle: "preserve-3d",
              opacity: 0.9,
            }}
          />

          {/* Ambient bg gradient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle, transparent 20%, rgba(3,3,15,0.95) 100%)",
              zIndex: 3,
            }}
          />

          {/* Header Panel */}
          <div
            className="relative flex items-end justify-between border-b border-white/5 bg-transparent"
            style={{
              zIndex: 10,
              padding: "2rem 4rem 1.25rem",
            }}
          >
            <div>
              <span className="text-xs font-bold tracking-widest text-[#00f2fe] uppercase mb-2 block">
                Portfolio Case Studies
              </span>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight m-0">
                Featured Projects
              </h2>
            </div>

            {/* Scroll Hint */}
            <div className="flex items-center gap-2 text-slate-500 text-xs font-mono tracking-widest uppercase">
              <ArrowRight className="w-4 h-4 animate-pulse text-[#00f2fe]" />
              Scroll to explore
            </div>

            {/* Counter */}
            <div className="flex items-baseline gap-1">
              <span
                ref={counterRef}
                className="text-4xl font-extrabold text-[#00f2fe] tabular-nums"
              >
                01
              </span>
              <span className="text-slate-600 font-mono text-lg">
                / 0{projects.length}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-[2px] bg-white/5 mx-[4rem]" style={{ zIndex: 10 }}>
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-[#00f2fe] via-[#7000ff] to-[#ff007b] transition-none"
              style={{ width: "0%" }}
            />
          </div>

          {/* 3D Viewport Area */}
          <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{
              height: "calc(100vh - 110px)",
              perspective: "1100px",
              perspectiveOrigin: "50% 35%",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="proj-card-3d absolute flex flex-col overflow-hidden shadow-2xl"
                  style={{
                    width: "360px",
                    height: "490px",
                    top: "50%",
                    left: "50%",
                    transform: "translate3d(-50%, -50%, -2000px) rotateY(20deg)",
                    background: "rgba(9,9,21,0.85)",
                    border: `1px solid ${project.color}30`,
                    borderRadius: "1.5rem",
                    backdropFilter: "blur(20px)",
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                    transition: "box-shadow 0.4s ease, border-color 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${project.color}60`;
                    e.currentTarget.style.boxShadow = `0 30px 80px -15px ${project.color}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${project.color}30`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Image Container */}
                  <div className="relative h-[42%] w-full overflow-hidden flex-shrink-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="360px"
                      className="object-cover"
                      priority={idx < 2}
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090915] to-transparent pointer-events-none" />
                    {/* Badge count */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-400">
                      {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-6 flex flex-col flex-1 gap-3 overflow-hidden">
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-4">
                      {project.desc}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tech.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[9px] font-bold tracking-wider"
                          style={{
                            color: project.color,
                            background: `${project.color}15`,
                            border: `1px solid ${project.color}25`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-4 pt-3 mt-1 border-t border-white/5">
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-black no-underline transition-all duration-300"
                        style={{
                          backgroundColor: project.color,
                          boxShadow: `0 4px 14px ${project.color}40`,
                        }}
                      >
                        Demo <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href={project.gitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white no-underline transition-colors duration-300"
                      >
                        <Github className="w-3.5 h-3.5" /> GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile View (Vertical Grid) ────────────────────────────── */}
      <div className="block md:hidden py-20 px-6 bg-[#03030f] border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-[#00f2fe] uppercase mb-2 block">
            Portfolio Case Studies
          </span>
          <h2 className="text-3xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xs text-slate-400 font-light max-w-sm mx-auto leading-relaxed">
            A selection of recent full-stack applications showcasing complex data structures, integrations, and clean interface designs.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="glow-card overflow-hidden flex flex-col h-full group"
              style={{
                borderColor: `${project.color}20`,
                background: "rgba(9, 9, 21, 0.7)",
              }}
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900 border-b border-white/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03030f]/60 to-transparent pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-grow gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                <div className="flex flex-col gap-4 mt-auto">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[8px] font-bold tracking-wider"
                        style={{
                          color: project.color,
                          background: `${project.color}15`,
                          border: `1px solid ${project.color}25`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider no-underline uppercase"
                      style={{ color: project.color }}
                    >
                      LIVE DEMO <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={project.gitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-slate-400 hover:text-white no-underline uppercase"
                    >
                      GITHUB <Github className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
