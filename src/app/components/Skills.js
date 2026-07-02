"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Database, Layout, Settings } from "lucide-react";

export default function Skills() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const categories = gridRef.current.querySelectorAll(".skill-category-card");

    const ctx = gsap.context(() => {
      // Fade in and translate cards from bottom
      gsap.fromTo(
        categories,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate progress bars once cards appear
      const progressBars = gridRef.current.querySelectorAll(".progress-bar-fill");
      gsap.fromTo(
        progressBars,
        { width: "0%" },
        {
          width: (i, target) => target.dataset.percent,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.05,
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

  const skillsData = [
    {
      title: "Frontend Engineering",
      icon: <Layout className="w-5 h-5 text-[#00f2fe]" />,
      skills: [
        { name: "React / Next.js", level: "95%" },
        { name: "JavaScript / TypeScript", level: "90%" },
        { name: "Tailwind CSS v4 / Sass", level: "95%" },
        { name: "GSAP / Framer Motion", level: "85%" },
      ],
    },
    {
      title: "Backend Development",
      icon: <Cpu className="w-5 h-5 text-[#7000ff]" />,
      skills: [
        { name: "Node.js / Express", level: "90%" },
        { name: "GraphQL / REST APIs", level: "85%" },
        { name: "Python / Django", level: "75%" },
        { name: "WebSockets / Realtime", level: "80%" },
      ],
    },
    {
      title: "Databases & DevOps",
      icon: <Database className="w-5 h-5 text-[#ff7b00]" />,
      skills: [
        { name: "PostgreSQL / Prisma", level: "90%" },
        { name: "MongoDB / Mongoose", level: "85%" },
        { name: "Docker / Containerization", level: "75%" },
        { name: "AWS (S3, EC2, Lambda)", level: "80%" },
      ],
    },
    {
      title: "Tools & Architectures",
      icon: <Settings className="w-5 h-5 text-[#ff007b]" />,
      skills: [
        { name: "Git / CI/CD Pipelines", level: "90%" },
        { name: "System Design / Microservices", level: "80%" },
        { name: "Jest / Cypress (Testing)", level: "75%" },
        { name: "Performance Optimization", level: "85%" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 bg-[#03030f]"
    >
      <div className="text-center mb-16">
        <span className="text-xs font-bold tracking-widest text-[#7000ff] uppercase mb-3 block">
          Skills & Technologies
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          My Technical Arsenal
        </h2>
        <p className="text-slate-400 font-light max-w-xl mx-auto mt-4 leading-relaxed">
          A comprehensive suite of modern front-end design tools, back-end development environments, databases, and continuous delivery flows.
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {skillsData.map((category, idx) => (
          <div
            key={idx}
            className="skill-category-card glow-card-orange p-8 flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                {category.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{category.title}</h3>
            </div>

            {/* List */}
            <div className="flex flex-col gap-5">
              {category.skills.map((skill, sIdx) => (
                <div key={sIdx} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-slate-300">{skill.name}</span>
                    <span className="font-mono text-slate-400 text-xs font-medium">{skill.level}</span>
                  </div>
                  {/* Progress track */}
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="progress-bar-fill h-full rounded-full bg-gradient-to-r from-[#ff7b00] to-[#ff007b]"
                      data-percent={skill.level}
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
