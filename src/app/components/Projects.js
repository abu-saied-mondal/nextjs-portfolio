"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const counterRef = useRef(null);

  const projects = [
    {
      title: "ZTS India - Dynamic Corporate Portal",
      desc: "A fully dynamic corporate website built from scratch for a major Kolkata company. Features a custom WordPress-like CMS in Laravel — admins control pages, blogs, media, navigation, and SEO metadata entirely from a dashboard.",
      tech: ["Laravel", "PHP", "MySQL", "Custom CMS", "SEO Management"],
      image: "/zts_mockup.png",
      demoLink: "https://ztsindia.com/",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#00f2fe",
    },
    {
      title: "Enterprise HRM Ecosystem",
      desc: "All-in-one Human Resource Management System: HR Core, AI Resume Screening, Biometric/GPS Attendance, Leave Management, Payroll with Bank Transfer, LMS Training Portal, and Advanced Analytics — 25+ integrated modules.",
      tech: ["Laravel", "MySQL", "PostgreSQL", "AI Features", "Real-time Analytics"],
      image: "/hrm_system.jpg",
      demoLink: "https://ascinate.in/demo/hrm_system",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#7000ff",
    },
    {
      title: "HerCompass — AI Health Companion",
      desc: "A personalized AI-powered health companion for women 45+. Tracks mood, symptoms, sleep, and energy — then transforms raw daily logs into predictive, actionable wellness insights using intelligent AI pattern analysis.",
      tech: ["MERN Stack", "Node.js", "MongoDB", "AI Processing", "Predictive Analytics"],
      image: "/hercompass.jpg",
      demoLink: "https://newhercompass.vercel.app/",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#ff007b",
    },
    {
      title: "IconsGeek",
      desc: "A subscription-based icon marketplace with dynamic SVG rendering, real-time colour/size customisation, downloadable PNG/JPG exports, and a full Stripe checkout flow. Independently architected and deployed at scale.",
      tech: ["Next.js", "Laravel", "MySQL", "Stripe API", "REST APIs"],
      image: "/dashboard_mockup.png",
      demoLink: "https://www.iconsgeek.com/",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#00f2fe",
    },
    {
      title: "SnapHive — Photo Sharing App",
      desc: "Full-stack mobile social platform: public/private photo hives, in-app camera filters, one-tap email invites, Firebase cloud storage, real-time chat, and AI-based image generation built into the creator flow.",
      tech: ["React Native CLI", "Node.js", "Express", "Firebase", "AI APIs"],
      image: "/workspace_mockup.png",
      demoLink: "#",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#ff7b00",
    },
    {
      title: "Louis — Video Dating App",
      desc: "Tinder-style matchmaking platform with vertical video profiles, swipe gesture UX, and real-time Socket.IO messaging. Engineered performant video loading pipelines. Published live on the iOS App Store.",
      tech: ["React Native Expo", "Node.js", "Socket.IO", "MongoDB", "Video Rendering"],
      image: "/ecommerce_mockup.png",
      demoLink: "https://apps.apple.com/in/app/louis-dating/id6472041327",
      gitLink: "https://github.com/abu-saied-mondal",
      color: "#7000ff",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const cards = trackRef.current.querySelectorAll(".proj-card");
    const totalCards = cards.length;
    const cardWidth = 520;
    const gap = 32;
    const totalTrackWidth = totalCards * (cardWidth + gap);
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalTrackWidth - viewportWidth + 200;

    const ctx = gsap.context(() => {
      // Pin the section and drive horizontal scrolling from vertical scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Update progress bar
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
            // Update counter
            if (counterRef.current) {
              const activeIdx = Math.min(
                Math.round(self.progress * (totalCards - 1)),
                totalCards - 1
              );
              counterRef.current.textContent = `0${activeIdx + 1}`;
            }
          },
        },
      });

      tl.to(trackRef.current, {
        x: -scrollDistance,
        ease: "none",
      });

      // 3D card entrance animation — each card rotates in as it enters viewport
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { rotateY: 22, opacity: 0.3, scale: 0.92 },
          {
            rotateY: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () =>
                `top+=${(scrollDistance / totalCards) * i * 0.8} top`,
              end: () =>
                `top+=${(scrollDistance / totalCards) * (i + 0.7) * 0.8} top`,
              scrub: 0.8,
              containerAnimation: tl,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section relative w-full overflow-hidden bg-[#03030f]"
      style={{ height: "100svh" }}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#7000ff]/5 blur-[120px]" />
      </div>

      {/* Header row */}
      <div className="relative z-10 flex items-end justify-between px-8 md:px-16 pt-10 pb-6 border-b border-white/5">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#00f2fe] uppercase mb-2 block">
            Portfolio Case Studies
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Featured Projects
          </h2>
        </div>
        {/* Scroll hint */}
        <div className="hidden md:flex items-center gap-2 text-slate-500 text-xs font-mono tracking-widest">
          <ArrowRight className="w-4 h-4 animate-pulse text-[#00f2fe]" />
          SCROLL TO EXPLORE
        </div>
        {/* Counter */}
        <div className="flex items-baseline gap-1 text-white">
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

      {/* Progress bar */}
      <div className="relative h-[2px] bg-white/5 mx-8 md:mx-16">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-[#00f2fe] via-[#7000ff] to-[#ff007b] transition-none"
          style={{ width: "0%" }}
        />
      </div>

      {/* Horizontal track */}
      <div
        className="relative flex-1 flex items-center overflow-visible"
        style={{ height: "calc(100svh - 120px)" }}
      >
        <div
          ref={trackRef}
          className="flex gap-8 pl-8 md:pl-16 will-change-transform"
          style={{ perspective: "1200px" }}
        >
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="proj-card flex-shrink-0 flex flex-col overflow-hidden"
              style={{
                width: "clamp(320px, 36vw, 520px)",
                height: "calc(100svh - 180px)",
                background: "rgba(9,9,21,0.8)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "1.25rem",
                backdropFilter: "blur(20px)",
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
                willChange: "transform, opacity",
              }}
            >
              {/* Image */}
              <div
                className="relative w-full flex-shrink-0 overflow-hidden group"
                style={{ height: "42%" }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="520px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={idx === 0}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 40%, rgba(9,9,21,0.95) 100%)",
                  }}
                />
                {/* Index chip */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-400">
                  {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </div>
                {/* Color accent dot */}
                <div
                  className="absolute bottom-4 right-4 w-3 h-3 rounded-full blur-[1px]"
                  style={{ backgroundColor: project.color, boxShadow: `0 0 12px ${project.color}` }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-7 gap-4 overflow-hidden">
                <h3
                  className="text-xl md:text-2xl font-bold text-white leading-snug"
                  style={{ textShadow: `0 0 40px ${project.color}30` }}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-light line-clamp-4">
                  {project.desc}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md"
                      style={{
                        color: project.color,
                        background: `${project.color}12`,
                        border: `1px solid ${project.color}25`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA row */}
                <div
                  className="flex items-center gap-5 pt-4 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest text-black transition-all duration-300 hover:scale-105 no-underline"
                    style={{
                      backgroundColor: project.color,
                      boxShadow: `0 4px 20px ${project.color}40`,
                    }}
                  >
                    LIVE DEMO <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={project.gitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-400 hover:text-white transition-colors duration-300 no-underline"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* End spacer */}
          <div className="flex-shrink-0 w-16 md:w-24" />
        </div>
      </div>

      {/* Mobile fallback grid — shown only on small screens */}
      <style>{`
        @media (max-width: 767px) {
          .projects-section { height: auto !important; overflow: visible !important; }
          .projects-section .flex.gap-8 { flex-direction: column; padding: 1.5rem; }
          .proj-card { width: 100% !important; height: auto !important; flex-shrink: unset !important; }
          .proj-card > div:first-child { height: 220px !important; }
        }
      `}</style>
    </section>
  );
}
