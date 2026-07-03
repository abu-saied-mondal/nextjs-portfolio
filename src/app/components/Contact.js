"use client";
import React, { useState } from "react";
import { Mail, Github, Linkedin, MapPin, Send, MessageSquare } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        alert(data.error || "Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitSuccess(null), 4000);
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const contacts = [
    {
      icon: <Mail className="w-5 h-5 text-[#00f2fe]" />,
      label: "Email Me",
      value: "abumondal990@gmail.com",
      href: "mailto:abumondal990@gmail.com"
    },
    {
      icon: <Github className="w-5 h-5 text-[#7000ff]" />,
      label: "GitHub Profile",
      value: "github.com/abu-saied-mondal",
      href: "https://github.com/abu-saied-mondal"
    },
    {
      icon: <Linkedin className="w-5 h-5 text-[#ff7b00]" />,
      label: "LinkedIn Connect",
      value: "linkedin.com/in/abusaied990",
      href: "https://www.linkedin.com/in/abusaied990/"
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#ff007b]" />,
      label: "Location",
      value: "Kolkata, West Bengal",
      href: "#"
    }
  ];

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 bg-[#03030f]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Text & Links */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left">
          <span className="text-xs font-bold tracking-widest text-[#ff007b] uppercase mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Let&apos;s build something beautiful
          </h2>
          <p className="text-slate-400 font-light leading-relaxed mb-8">
            Have a project idea, want to collaborate, or just want to say hi? Fill out the form or drop me a line via email or social links. I&apos;m always open to talking about new opportunities, innovative designs, or backend scaling.
          </p>

          <div className="flex flex-col gap-6">
            {contacts.map((contact, idx) => (
              <a
                key={idx}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 no-underline group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#03030f] border border-white/10 flex items-center justify-center flex-shrink-0">
                  {contact.icon}
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                    {contact.label}
                  </div>
                  <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {contact.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-7">
          <div className="glow-card p-8 md:p-10 text-left">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <MessageSquare className="w-5 h-5 text-[#00f2fe]" />
              </div>
              <h3 className="text-lg font-bold text-white">Send Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe] transition-all"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder="johndoe@example.com"
                  className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe] transition-all"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                  className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe] transition-all resize-none"
                />
              </div>

              {/* Submit Success Message */}
              {submitSuccess && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold">
                  Thank you! Your message was sent successfully. I&apos;ll get back to you shortly.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 w-full py-4 text-xs font-semibold tracking-wider text-black bg-[#00f2fe] hover:bg-white rounded-xl shadow-[0_10px_20px_-5px_rgba(0,242,254,0.3)] hover:shadow-[0_12px_24px_-5px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    SEND MESSAGE <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
