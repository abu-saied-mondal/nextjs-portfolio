"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Briefcase, Award } from "lucide-react";

export default function Experience() {
  const sectionRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Timeline scroll progress animation
      gsap.fromTo(
        progressBarRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 65%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );

      // Entrance animation for each timeline item
      const items = sectionRef.current.querySelectorAll(".timeline-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const history = [
    {
      role: "Software Developer",
      company: "Ascinate Technology",
      period: "Aug 2024 - Present",
      desc: "Developing and maintaining scalable full-stack applications. Focused on API architecture, secure database connections, payment checkouts, and real-time messaging services.",
      bullets: [
        "Built full-stack applications utilizing Next.js on the frontend and Laravel RESTful APIs on the backend.",
        "Implemented secure payment integrations with Stripe, dynamic admin panels, and role-based access controls.",
        "Created real-time communication modules, custom API systems, and focused heavily on server performance optimizations."
      ]
    },
    {
      role: "Software Developer Intern",
      company: "Assoft Technology",
      period: "5 Months",
      desc: "Assisted in building custom full-stack features, maintaining web applications, and writing clean, structured code.",
      bullets: [
        "Supported API development and backend routing integrations.",
        "Assisted in database management (MySQL) and frontend responsiveness.",
        "Participated in agile code reviews and team collaboration."
      ]
    },
    {
      role: "Full Stack Development Trainee",
      company: "QSpiders Kolkata",
      period: "Feb 2023 - Jan 2024",
      desc: "Completed intensive, structured training in Java and MERN stack development. Established robust object-oriented programming skills and logical problem-solving methods.",
      bullets: [
        "Mastered Core & Advanced Java programming, MERN stack, and DBMS foundations.",
        "Solved logical programming problems and built data structures and algorithm foundations.",
        "Developed full-stack practice applications, connected custom APIs, and utilized Git and Postman."
      ]
    }
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 bg-[#03030f]"
    >
      <div className="text-center mb-16">
        <span className="text-xs font-bold tracking-widest text-[#ff7b00] uppercase mb-3 block">
          Professional Milestones
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Work Experience
        </h2>
        <p className="text-slate-400 font-light max-w-xl mx-auto mt-4 leading-relaxed">
          My career journey in building performant architectures, leading frontend innovations, and delivering user-oriented business values.
        </p>
      </div>

      <div className="timeline-container relative max-w-4xl mx-auto pl-8 md:pl-12">
        {/* Grey Background Line */}
        <div className="absolute left-[3px] md:left-[5px] top-4 bottom-4 w-[2px] bg-white/5" />

        {/* Scroll Activated Glowing Line */}
        <div
          ref={progressBarRef}
          className="absolute left-[3px] md:left-[5px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#ff7b00] to-[#ff007b] origin-top scale-y-0"
        />

        {/* Timeline Items */}
        <div className="flex flex-col gap-12">
          {history.map((item, idx) => (
            <div key={idx} className="timeline-item relative text-left">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[41px] md:-left-[53px] top-1.5 w-6 h-6 rounded-full bg-[#03030f] border-2 border-[#ff7b00] flex items-center justify-center z-10 shadow-[0_0_10px_rgba(255,123,0,0.4)]">
                <Briefcase className="w-3 h-3 text-[#ff7b00]" />
              </div>

              {/* Item Box */}
              <div className="glow-card-orange p-8 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">{item.role}</h3>
                    <div className="text-sm font-semibold text-[#ff7b00] mt-1">{item.company}</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.period}
                  </div>
                </div>

                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  {item.desc}
                </p>

                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff7b00]/70 mt-1.5 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
