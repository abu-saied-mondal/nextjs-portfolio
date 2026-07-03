"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

export default function Projects() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = gridRef.current.querySelectorAll(".project-card");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: "ZTS India - Dynamic Corporate Portal",
      desc: "A fully dynamic corporate website developed from scratch for a major company in Kolkata. Features a custom CMS (similar to WordPress) built with Laravel that lets admins manage pages, posts, media assets, navigation menus, and SEO metadata.",
      tech: ["Laravel", "PHP", "MySQL", "Custom CMS", "SEO Management"],
      image: "/zts_mockup.png",
      demoLink: "https://ztsindia.com/",
      gitLink: "https://github.com/abu-saied-mondal",
    },
    {
      title: "Enterprise HRM Ecosystem",
      desc: "An all-in-one Human Resource Management System to automate, manage, and empower the entire workforce. Features include HR Core, Recruitment & ATS (with AI Resume screening), Biometric/GPS Attendance, Leave Management, and Payroll.",
      tech: ["Laravel", "MySQL", "PostgreSQL", "AI Features", "Real-time Analytics"],
      image: "/hrm_system.jpg",
      demoLink: "https://ascinate.in/demo/hrm_system",
      gitLink: "https://github.com/abu-saied-mondal",
    },
    {
      title: "HerCompass - AI Health Companion",
      desc: "A personalized AI-powered health companion designed specifically for women 45+. It tracks symptoms, mood, sleep, and energy, then transforms logs into predictive, actionable wellness insights using modern full-stack architecture.",
      tech: ["MERN Stack", "Node.js", "MongoDB", "AI Processing", "Predictive Analytics"],
      image: "/hercompass.jpg",
      demoLink: "https://newhercompass.vercel.app/",
      gitLink: "https://github.com/abu-saied-mondal",
    },
    {
      title: "IconsGeek",
      desc: "A subscription-based icon platform with dynamic SVG rendering, real-time customization, dynamic downloads (PNG/JPG), and Stripe checkout payments. Independently developed and deployed.",
      tech: ["Next.js", "Laravel", "MySQL", "Stripe API", "REST APIs"],
      image: "/dashboard_mockup.png",
      demoLink: "https://www.iconsgeek.com/",
      gitLink: "https://github.com/abu-saied-mondal",
    },
    {
      title: "SnapHive - Photo Sharing App",
      desc: "A full-stack mobile social application allowing users to share public/private media hives, chat, apply filters, send email invites, and generate AI-based images using Firebase storage.",
      tech: ["React Native CLI", "Node.js", "Express", "Firebase", "AI APIs"],
      image: "/workspace_mockup.png",
      demoLink: "#",
      gitLink: "https://github.com/abu-saied-mondal",
    },
    {
      title: "Louis - Video Dating App",
      desc: "A Tinder-style matchmaking platform featuring video profile previews, swipe gesture interactions, and real-time messaging via Socket.IO. Optimized video rendering and load times.",
      tech: ["React Native Expo", "Node.js", "Socket.IO", "MongoDB", "Video Rendering"],
      image: "/ecommerce_mockup.png",
      demoLink: "https://apps.apple.com/in/app/louis-dating/id6472041327",
      gitLink: "https://github.com/abu-saied-mondal",
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 bg-[#03030f]"
    >
      <div className="text-center mb-16">
        <span className="text-xs font-bold tracking-widest text-[#00f2fe] uppercase mb-3 block">
          Portfolio Case Studies
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Featured Projects
        </h2>
        <p className="text-slate-400 font-light max-w-xl mx-auto mt-4 leading-relaxed">
          A selection of recent full-stack applications showcasing complex data structures, integrations, and clean interface designs.
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="project-card glow-card overflow-hidden flex flex-col h-full group"
          >
            {/* Image Wrap */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-900 border-b border-white/5">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03030f]/60 to-transparent pointer-events-none" />
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col justify-between flex-grow gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold text-white group-hover:text-[#00f2fe] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  {project.desc}
                </p>
              </div>

              <div className="flex flex-col gap-5 mt-auto">
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] font-bold text-slate-400 bg-white/5 border border-white/5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#00f2fe] hover:text-white transition-colors duration-300 no-underline"
                  >
                    LIVE DEMO <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={project.gitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-400 hover:text-white transition-colors duration-300 no-underline"
                  >
                    GITHUB <Github className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
