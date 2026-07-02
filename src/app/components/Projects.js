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
      title: "Hyperion SaaS Analytics Dashboard",
      desc: "A premium analytical dashboard featuring real-time financial tracking, customizable telemetry grids, and automated metric forecasts. Optimized for lightning-fast loads and data density.",
      tech: ["Next.js", "Tailwind CSS", "Recharts", "Node.js", "PostgreSQL"],
      image: "/dashboard_mockup.png",
      demoLink: "#",
      gitLink: "https://github.com",
    },
    {
      title: "Veloce E-Commerce Platform",
      desc: "A high-fidelity storefront featuring localized multi-currency support, seamless instant checkout via Stripe, static generation for SEO optimization, and a neat administrative panel.",
      tech: ["React", "GraphQL", "Stripe API", "Node.js", "MongoDB"],
      image: "/ecommerce_mockup.png",
      demoLink: "#",
      gitLink: "https://github.com",
    },
    {
      title: "Aether Cloud Orchestration Hub",
      desc: "An orchestration workspace dashboard that helps developers manage Docker containers, view real-time log aggregates, and oversee multi-region AWS cloud nodes from a single clean viewport.",
      tech: ["Next.js", "TypeScript", "Go", "Docker", "AWS SDK"],
      image: "/workspace_mockup.png",
      demoLink: "#",
      gitLink: "https://github.com",
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
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
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
