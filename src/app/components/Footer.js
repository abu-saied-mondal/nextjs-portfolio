"use client";
import React from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github className="w-4 h-4" />, href: "https://github.com/abu-saied-mondal", label: "GitHub" },
    { icon: <Linkedin className="w-4 h-4" />, href: "https://www.linkedin.com/in/abusaied990/", label: "LinkedIn" },
    { icon: <Twitter className="w-4 h-4" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Mail className="w-4 h-4" />, href: "mailto:abumondal990@gmail.com", label: "Email" }
  ];

  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-[#03030f]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand/Credits */}
        <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
          <div className="text-sm font-semibold text-slate-200">
            © {currentYear} DevSki. All rights reserved.
          </div>
          <div className="text-xs text-slate-500 font-light">
            Designed & engineered with <span className="text-[#ff007b]">♥</span> using Next.js, Tailwind CSS v4, and GSAP.
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-8 h-8 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#00f2fe] hover:border-[#00f2fe]/40 hover:bg-[#00f2fe]/5 transition-all duration-300"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
