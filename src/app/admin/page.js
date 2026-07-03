"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  FolderGit2, MessageSquare, FileText, Plus, Trash2, Edit3, 
  Save, LogOut, Check, Mail, ExternalLink, RefreshCw, X, ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const router = useRouter();

  // Active tab: 'messages' | 'projects' | 'content'
  const [activeTab, setActiveTab] = useState("messages");

  // State arrays from API
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [content, setContent] = useState({ about: { stats: [] }, skills: [], experience: [] });

  // Loading/saving feedback states
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ type: "", message: "" });

  // Modal / Form Edit States for Projects
  const [projectForm, setProjectForm] = useState({
    id: "", title: "", desc: "", tech: "", image: "", demoLink: "", gitLink: "", color: "#00f2fe"
  });
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [isProjectEditing, setIsProjectEditing] = useState(false);

  // Load all dashboard components
  const loadDashboardData = useCallback(async () => {
    setIsDataLoading(true);
    try {
      // 1. Fetch messages
      const msgsRes = await fetch("/api/messages");
      const msgsData = await msgsRes.json();
      if (msgsData.success) setMessages(msgsData.messages);

      // 2. Fetch projects
      const projsRes = await fetch("/api/projects");
      const projsData = await projsRes.json();
      if (projsData.success) setProjects(projsData.projects);

      // 3. Fetch content
      const contentRes = await fetch("/api/content");
      const contentData = await contentRes.json();
      if (contentData.success) {
        setContent({
          about: contentData.about || { stats: [] },
          skills: contentData.skills || [],
          experience: contentData.experience || []
        });
      }
    } catch (error) {
      showFeedback("error", "Failed to load dashboard data.");
    } finally {
      setIsDataLoading(false);
    }
  }, []);

  // Authentication check on load
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth");
        const data = await res.json();
        if (data.success) {
          setIsAuthenticated(true);
          loadDashboardData();
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        console.error("Auth check error:", err);
        router.push("/admin/login");
      } finally {
        setIsLoadingAuth(false);
      }
    }
    checkAuth();
  }, [router, loadDashboardData]);

  const showFeedback = (type, text) => {
    setSaveStatus({ type, message: text });
    setTimeout(() => setSaveStatus({ type: "", message: "" }), 4000);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // --- CRUD: Messages ---
  const handleDeleteMessage = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessages(messages.filter(m => m.id !== id));
        showFeedback("success", "Message deleted successfully.");
      } else {
        showFeedback("error", data.error || "Failed to delete message.");
      }
    } catch (err) {
      showFeedback("error", "Error deleting message.");
    }
  };

  // --- CRUD: Projects ---
  const handleOpenAddProject = () => {
    setProjectForm({
      id: "", title: "", desc: "", tech: "", image: "", demoLink: "", gitLink: "", color: "#00f2fe"
    });
    setIsProjectEditing(false);
    setShowProjectModal(true);
  };

  const handleOpenEditProject = (p) => {
    setProjectForm({
      id: p.id,
      title: p.title,
      desc: p.desc,
      tech: p.tech.join(", "),
      image: p.image,
      demoLink: p.demoLink,
      gitLink: p.gitLink,
      color: p.color
    });
    setIsProjectEditing(true);
    setShowProjectModal(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    const payload = {
      ...projectForm,
      tech: projectForm.tech.split(",").map(t => t.trim()).filter(Boolean)
    };

    const method = isProjectEditing ? "PUT" : "POST";

    try {
      const res = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (data.success) {
        if (isProjectEditing) {
          setProjects(projects.map(p => p.id === data.project.id ? data.project : p));
          showFeedback("success", "Project updated successfully.");
        } else {
          setProjects([...projects, data.project]);
          showFeedback("success", "Project added successfully.");
        }
        setShowProjectModal(false);
      } else {
        showFeedback("error", data.error || "Failed to save project.");
      }
    } catch (err) {
      showFeedback("error", "Error saving project.");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProjects(projects.filter(p => p.id !== id));
        showFeedback("success", "Project deleted successfully.");
      } else {
        showFeedback("error", data.error || "Failed to delete project.");
      }
    } catch (err) {
      showFeedback("error", "Error deleting project.");
    }
  };

  // --- CRUD: Site Content (About, Stats, Skills, Experience) ---
  const handleSaveContent = async () => {
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
      });
      const data = await res.json();
      if (data.success) {
        showFeedback("success", "Site content saved successfully!");
      } else {
        showFeedback("error", data.error || "Failed to save site content.");
      }
    } catch (err) {
      showFeedback("error", "Error saving content.");
    }
  };

  // Nested form content updates helpers
  const handleAboutTextChange = (field, val) => {
    setContent({
      ...content,
      about: { ...content.about, [field]: val }
    });
  };

  const handleStatChange = (idx, field, val) => {
    const updatedStats = [...content.about.stats];
    updatedStats[idx] = { ...updatedStats[idx], [field]: val };
    setContent({
      ...content,
      about: { ...content.about, stats: updatedStats }
    });
  };

  // Experience changes
  const handleExperienceChange = (idx, field, val) => {
    const updatedExp = [...content.experience];
    updatedExp[idx] = { ...updatedExp[idx], [field]: val };
    setContent({ ...content, experience: updatedExp });
  };

  const handleExperienceBulletChange = (expIdx, bulletIdx, val) => {
    const updatedExp = [...content.experience];
    const updatedBullets = [...updatedExp[expIdx].bullets];
    updatedBullets[bulletIdx] = val;
    updatedExp[expIdx] = { ...updatedExp[expIdx], bullets: updatedBullets };
    setContent({ ...content, experience: updatedExp });
  };

  const handleAddExperienceBullet = (expIdx) => {
    const updatedExp = [...content.experience];
    updatedExp[expIdx].bullets = [...(updatedExp[expIdx].bullets || []), ""];
    setContent({ ...content, experience: updatedExp });
  };

  const handleRemoveExperienceBullet = (expIdx, bulletIdx) => {
    const updatedExp = [...content.experience];
    updatedExp[expIdx].bullets = updatedExp[expIdx].bullets.filter((_, bIdx) => bIdx !== bulletIdx);
    setContent({ ...content, experience: updatedExp });
  };

  const handleAddExperience = () => {
    const newExp = {
      role: "New Role", company: "Company", period: "Dates", desc: "Brief summary description.", bullets: [], accent: "#ff7b00"
    };
    setContent({ ...content, experience: [...content.experience, newExp] });
  };

  const handleRemoveExperience = (idx) => {
    if (!confirm("Remove this experience milestone?")) return;
    setContent({ ...content, experience: content.experience.filter((_, i) => i !== idx) });
  };

  // Skills changes
  const handleSkillCategoryChange = (catIdx, field, val) => {
    const updatedSkills = [...content.skills];
    updatedSkills[catIdx] = { ...updatedSkills[catIdx], [field]: val };
    setContent({ ...content, skills: updatedSkills });
  };

  const handleSubSkillChange = (catIdx, skillIdx, field, val) => {
    const updatedSkills = [...content.skills];
    const updatedSub = [...updatedSkills[catIdx].skills];
    updatedSub[skillIdx] = { ...updatedSub[skillIdx], [field]: val };
    updatedSkills[catIdx] = { ...updatedSkills[catIdx], skills: updatedSub };
    setContent({ ...content, skills: updatedSkills });
  };

  const handleAddSubSkill = (catIdx) => {
    const updatedSkills = [...content.skills];
    updatedSkills[catIdx].skills = [...(updatedSkills[catIdx].skills || []), { name: "New Skill", level: "80%" }];
    setContent({ ...content, skills: updatedSkills });
  };

  const handleRemoveSubSkill = (catIdx, skillIdx) => {
    const updatedSkills = [...content.skills];
    updatedSkills[catIdx].skills = updatedSkills[catIdx].skills.filter((_, sIdx) => sIdx !== skillIdx);
    setContent({ ...content, skills: updatedSkills });
  };

  const handleAddSkillCategory = () => {
    const newCat = { title: "New Skill Category", icon: "Cpu", accent: "#00f2fe", skills: [] };
    setContent({ ...content, skills: [...content.skills, newCat] });
  };

  const handleRemoveSkillCategory = (idx) => {
    if (!confirm("Remove this entire skill category?")) return;
    setContent({ ...content, skills: content.skills.filter((_, i) => i !== idx) });
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-[#03030f] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#00f2fe] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#03030f] text-slate-300 font-sans flex flex-col">
      {/* Glow Ambient background */}
      <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] rounded-full bg-[#00f2fe]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[40rem] h-[40rem] rounded-full bg-[#7000ff]/3 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#03030f]/80 backdrop-blur-md px-6 md:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00f2fe] to-[#7000ff] flex items-center justify-center font-bold text-black text-lg shadow-md shadow-[#00f2fe]/20">
            D
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-none">DevSki</h1>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Portfolio Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors border border-white/5 bg-white/5 px-3 py-2 rounded-lg"
          >
            View Live <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-white hover:bg-rose-500/20 transition-all border border-rose-500/10 bg-rose-500/5 px-3 py-2 rounded-lg"
          >
            Log Out <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Dashboard Grid Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 flex flex-col gap-2">
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 px-3 mb-2">
            Workspace
          </div>
          
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center justify-between px-4 py-3.5 rounded-xl border text-sm font-medium transition-all group ${
              activeTab === "messages"
                ? "bg-white/5 border-white/10 text-white shadow-[0_4px_12px_rgba(0,242,254,0.05)]"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/3"
            }`}
          >
            <span className="flex items-center gap-3">
              <MessageSquare className={`w-4 h-4 ${activeTab === "messages" ? "text-[#00f2fe]" : "text-slate-500 group-hover:text-slate-400"}`} />
              Messages Inbox
            </span>
            {messages.length > 0 && (
              <span className="bg-[#00f2fe]/20 text-[#00f2fe] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-[#00f2fe]/30">
                {messages.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center justify-between px-4 py-3.5 rounded-xl border text-sm font-medium transition-all group ${
              activeTab === "projects"
                ? "bg-white/5 border-white/10 text-white shadow-[0_4px_12px_rgba(112,0,255,0.05)]"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/3"
            }`}
          >
            <span className="flex items-center gap-3">
              <FolderGit2 className={`w-4 h-4 ${activeTab === "projects" ? "text-[#7000ff]" : "text-slate-500 group-hover:text-slate-400"}`} />
              Projects
            </span>
            <span className="bg-white/10 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("content")}
            className={`flex items-center justify-between px-4 py-3.5 rounded-xl border text-sm font-medium transition-all group ${
              activeTab === "content"
                ? "bg-white/5 border-white/10 text-white shadow-[0_4px_12px_rgba(255,123,0,0.05)]"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/3"
            }`}
          >
            <span className="flex items-center gap-3">
              <FileText className={`w-4 h-4 ${activeTab === "content" ? "text-[#ff7b00]" : "text-slate-500 group-hover:text-slate-400"}`} />
              Site Content
            </span>
            <ChevronRight className="w-3.5 h-3.5 opacity-45" />
          </button>

          <div className="mt-8 border-t border-white/5 pt-6 px-3 flex flex-col gap-4">
            <button
              onClick={loadDashboardData}
              disabled={isDataLoading}
              className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-wider"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isDataLoading ? "animate-spin text-[#00f2fe]" : ""}`} /> 
              {isDataLoading ? "Refreshing..." : "Refresh Data"}
            </button>
          </div>
        </aside>

        {/* Dashboard Main Workspace */}
        <main className="lg:col-span-9 flex flex-col gap-6">
          
          {/* Action/Save Status Feedbacks */}
          {saveStatus.message && (
            <div className={`p-4 rounded-xl border flex items-center gap-3 animate-fade-in text-sm font-semibold leading-relaxed ${
              saveStatus.type === "success" 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/20 text-rose-400"
            }`}>
              {saveStatus.type === "success" ? <Check className="w-5 h-5 flex-shrink-0" /> : <X className="w-5 h-5 flex-shrink-0" />}
              <span>{saveStatus.message}</span>
            </div>
          )}

          {/* TAB 1: MESSAGES INBOX */}
          {activeTab === "messages" && (
            <div className="glow-card p-6 md:p-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Contact Submissions</h2>
                  <p className="text-xs text-slate-500 font-light mt-1">
                    Inbox of messages sent by visitors through the contact form.
                  </p>
                </div>
              </div>

              {messages.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  <MessageSquare className="w-10 h-10 mx-auto opacity-20 mb-4" />
                  <p className="text-sm font-medium">No messages found</p>
                  <p className="text-xs font-light mt-1">When someone writes to you, it will appear here.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className="p-5 rounded-2xl border border-white/5 bg-[#03030f]/60 hover:bg-[#03030f] hover:border-white/10 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-200 text-sm">{msg.name}</span>
                          <a 
                            href={`mailto:${msg.email}`}
                            className="text-xs text-slate-500 hover:text-[#00f2fe] flex items-center gap-1 font-mono transition-colors"
                          >
                            {msg.email} <Mail className="w-3 h-3" />
                          </a>
                        </div>
                        <p className="text-slate-400 font-light text-sm leading-relaxed whitespace-pre-wrap">
                          {msg.message}
                        </p>
                        <span className="text-[10px] text-slate-600 font-mono mt-1">
                          {new Date(msg.date).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex md:flex-col items-center gap-2 justify-end self-end md:self-start">
                        <a
                          href={`mailto:${msg.email}?subject=Reply to your portfolio message&body=Hi ${msg.name},`}
                          className="flex items-center justify-center p-2 rounded-lg border border-[#00f2fe]/20 hover:border-[#00f2fe]/50 bg-[#00f2fe]/5 text-[#00f2fe] hover:bg-[#00f2fe]/10 transition-all"
                          title="Reply via Email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="flex items-center justify-center p-2 rounded-lg border border-rose-500/20 hover:border-rose-500/50 bg-rose-500/5 text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROJECTS MANAGEMENT */}
          {activeTab === "projects" && (
            <div className="glow-card p-6 md:p-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Manage Projects</h2>
                  <p className="text-xs text-slate-500 font-light mt-1">
                    Add, edit, or delete items displayed in your portfolio walkthrough.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddProject}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#00f2fe] text-black text-xs font-bold hover:bg-white transition-all shadow-[0_5px_15px_-5px_rgba(0,242,254,0.3)] transform active:scale-95"
                >
                  <Plus className="w-4 h-4" /> ADD PROJECT
                </button>
              </div>

              {projects.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  <FolderGit2 className="w-10 h-10 mx-auto opacity-20 mb-4" />
                  <p className="text-sm font-medium">No projects added yet</p>
                  <button 
                    onClick={handleOpenAddProject} 
                    className="text-xs text-[#00f2fe] hover:underline mt-1 cursor-pointer"
                  >
                    Click here to add your first project
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((proj) => (
                    <div 
                      key={proj.id}
                      className="p-5 rounded-2xl border bg-[#03030f]/60 hover:bg-[#03030f] transition-all flex flex-col justify-between gap-4"
                      style={{ borderColor: `${proj.color}25` }}
                    >
                      <div className="flex flex-col gap-2.5">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-slate-200 text-sm">{proj.title}</h3>
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm flex-shrink-0"
                            style={{ backgroundColor: proj.color }}
                          />
                        </div>
                        <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-3">
                          {proj.desc}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {proj.tech.map((t, idx) => (
                            <span 
                              key={idx} 
                              className="text-[9px] font-mono uppercase bg-white/5 border border-white/5 text-slate-400 px-2 py-0.5 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-1">
                        <div className="flex gap-2 text-[10px] text-slate-500 font-light">
                          {proj.demoLink && proj.demoLink !== "#" && (
                            <span className="flex items-center gap-0.5">Demo <ExternalLink className="w-2.5 h-2.5" /></span>
                          )}
                          {proj.gitLink && (
                            <span className="flex items-center gap-0.5">Git <ExternalLink className="w-2.5 h-2.5" /></span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenEditProject(proj)}
                            className="flex items-center justify-center p-2 rounded-lg border border-white/5 bg-white/5 text-slate-400 hover:text-[#00f2fe] hover:bg-[#00f2fe]/5 transition-all cursor-pointer"
                            title="Edit project"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="flex items-center justify-center p-2 rounded-lg border border-rose-500/10 bg-rose-500/5 text-rose-400 hover:text-white hover:bg-rose-500/10 transition-all cursor-pointer"
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SITE CONTENT EDITING */}
          {activeTab === "content" && (
            <div className="flex flex-col gap-6">
              
              {/* Save All floating banner */}
              <div className="glow-card p-4 flex items-center justify-between border-l-4 border-l-[#ff7b00]">
                <div className="text-left">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Dynamic Layout Editor</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Modify your profile text, stats, work milestones, or skill metrics.</p>
                </div>
                <button
                  onClick={handleSaveContent}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#ff7b00] hover:bg-white text-black text-xs font-bold transition-all shadow-[0_5px_15px_-5px_rgba(255,123,0,0.3)] cursor-pointer transform active:scale-95"
                >
                  <Save className="w-4 h-4" /> SAVE CHANGES
                </button>
              </div>

              {/* SECTION: ABOUT SECTION CODES */}
              <div className="glow-card p-6 md:p-8 text-left">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-3 mb-5">
                  About Me & Bio
                </h3>
                
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Heading Title</label>
                    <input
                      type="text"
                      value={content.about.title || ""}
                      onChange={(e) => handleAboutTextChange("title", e.target.value)}
                      className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff7b00] text-sm"
                    />
                    <p className="text-[10px] text-slate-500 font-light mt-0.5">
                      HTML tags allowed. (e.g. use <code>&lt;span class=&quot;text-gradient-cyan-purple&quot;&gt;text&lt;/span&gt;</code> for gradients)
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Paragraph 1</label>
                    <textarea
                      rows="3"
                      value={content.about.description1 || ""}
                      onChange={(e) => handleAboutTextChange("description1", e.target.value)}
                      className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff7b00] text-sm resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Paragraph 2</label>
                    <textarea
                      rows="3"
                      value={content.about.description2 || ""}
                      onChange={(e) => handleAboutTextChange("description2", e.target.value)}
                      className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff7b00] text-sm resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: ABOUT STATISTICS */}
              <div className="glow-card p-6 md:p-8 text-left">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-3 mb-5">
                  About Statistics Cards (4 items max)
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.about.stats && content.about.stats.map((stat, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl border border-white/5 bg-[#03030f]/60 flex flex-col gap-4 relative"
                    >
                      <div className="absolute top-4 right-4 text-[10px] text-slate-500 font-mono font-bold">
                        Card #{idx + 1}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Value (Text)</label>
                          <input
                            type="text"
                            value={stat.value || ""}
                            onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                            className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff7b00] text-xs"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Accent Color</label>
                          <input
                            type="text"
                            value={stat.accent || ""}
                            onChange={(e) => handleStatChange(idx, "accent", e.target.value)}
                            className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff7b00] text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Label Title</label>
                        <input
                          type="text"
                          value={stat.label || ""}
                          onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                          className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff7b00] text-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Description</label>
                        <textarea
                          rows="2"
                          value={stat.desc || ""}
                          onChange={(e) => handleStatChange(idx, "desc", e.target.value)}
                          className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff7b00] text-xs resize-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Lucide Icon name</label>
                        <select
                          value={stat.icon || "Briefcase"}
                          onChange={(e) => handleStatChange(idx, "icon", e.target.value)}
                          className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff7b00] text-xs bg-[#03030f]"
                        >
                          <option value="Briefcase">Briefcase</option>
                          <option value="Award">Award</option>
                          <option value="Smile">Smile</option>
                          <option value="Heart">Heart</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: SKILLS TECHNOLOGIES EDITOR */}
              <div className="glow-card p-6 md:p-8 text-left">
                <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-5">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Skills Categories
                  </h3>
                  <button
                    onClick={handleAddSkillCategory}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-[#00f2fe] transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> ADD CATEGORY
                  </button>
                </div>

                <div className="flex flex-col gap-8">
                  {content.skills && content.skills.map((cat, catIdx) => (
                    <div 
                      key={catIdx}
                      className="p-6 rounded-2xl border border-white/5 bg-[#03030f]/60 flex flex-col gap-5 relative"
                      style={{ borderLeft: `3px solid ${cat.accent}` }}
                    >
                      <button
                        onClick={() => handleRemoveSkillCategory(catIdx)}
                        className="absolute top-4 right-4 text-rose-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Remove category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Header input fields */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Category Title</label>
                          <input
                            type="text"
                            value={cat.title || ""}
                            onChange={(e) => handleSkillCategoryChange(catIdx, "title", e.target.value)}
                            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff7b00] text-xs font-semibold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Accent Color</label>
                          <input
                            type="text"
                            value={cat.accent || ""}
                            onChange={(e) => handleSkillCategoryChange(catIdx, "accent", e.target.value)}
                            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff7b00] text-xs font-mono"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Icon</label>
                          <select
                            value={cat.icon || "Cpu"}
                            onChange={(e) => handleSkillCategoryChange(catIdx, "icon", e.target.value)}
                            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff7b00] text-xs bg-[#03030f]"
                          >
                            <option value="Layout">Layout (Frontend)</option>
                            <option value="Cpu">Cpu (Backend)</option>
                            <option value="Database">Database (DB)</option>
                            <option value="Settings">Settings (Tools)</option>
                          </select>
                        </div>
                      </div>

                      {/* Sub-skills visual rows */}
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wide border-b border-white/5 pb-1">
                          <span>Sub-Skills List</span>
                          <button
                            onClick={() => handleAddSubSkill(catIdx)}
                            className="text-[#00f2fe] hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            + Add Skill
                          </button>
                        </div>

                        {cat.skills && cat.skills.map((sub, subIdx) => (
                          <div key={subIdx} className="flex items-center gap-4">
                            <input
                              type="text"
                              value={sub.name || ""}
                              placeholder="Skill name"
                              onChange={(e) => handleSubSkillChange(catIdx, subIdx, "name", e.target.value)}
                              className="flex-1 px-3 py-1.5 rounded bg-white/5 border border-white/5 text-xs text-white focus:outline-none focus:border-[#ff7b00]"
                            />
                            <input
                              type="text"
                              value={sub.level || ""}
                              placeholder="Level (e.g. 85%)"
                              onChange={(e) => handleSubSkillChange(catIdx, subIdx, "level", e.target.value)}
                              className="w-24 px-3 py-1.5 rounded bg-white/5 border border-white/5 text-xs text-white text-center focus:outline-none focus:border-[#ff7b00]"
                            />
                            <button
                              onClick={() => handleRemoveSubSkill(catIdx, subIdx)}
                              className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                              title="Delete sub skill"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: EXPERIENCE TIMELINE WORK HISTORY */}
              <div className="glow-card p-6 md:p-8 text-left">
                <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-5">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Experience Timeline
                  </h3>
                  <button
                    onClick={handleAddExperience}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-[#ff7b00] transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> ADD EVENT
                  </button>
                </div>

                <div className="flex flex-col gap-8">
                  {content.experience && content.experience.map((exp, expIdx) => (
                    <div 
                      key={expIdx}
                      className="p-6 rounded-2xl border border-white/5 bg-[#03030f]/60 flex flex-col gap-4 relative"
                      style={{ borderLeft: `3px solid ${exp.accent}` }}
                    >
                      <button
                        onClick={() => handleRemoveExperience(expIdx)}
                        className="absolute top-4 right-4 text-rose-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Remove milestone"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Header detail values */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Role / Job Title</label>
                          <input
                            type="text"
                            value={exp.role || ""}
                            onChange={(e) => handleExperienceChange(expIdx, "role", e.target.value)}
                            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff7b00] text-xs font-semibold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Company Name</label>
                          <input
                            type="text"
                            value={exp.company || ""}
                            onChange={(e) => handleExperienceChange(expIdx, "company", e.target.value)}
                            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff7b00] text-xs font-semibold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Period (Dates string)</label>
                          <input
                            type="text"
                            value={exp.period || ""}
                            onChange={(e) => handleExperienceChange(expIdx, "period", e.target.value)}
                            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff7b00] text-xs"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Timeline Accent Color</label>
                          <input
                            type="text"
                            value={exp.accent || ""}
                            onChange={(e) => handleExperienceChange(expIdx, "accent", e.target.value)}
                            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff7b00] text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Brief Description</label>
                        <textarea
                          rows="2"
                          value={exp.desc || ""}
                          onChange={(e) => handleExperienceChange(expIdx, "desc", e.target.value)}
                          className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff7b00] text-xs resize-none"
                        />
                      </div>

                      {/* Bullets List */}
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wide border-b border-white/5 pb-1">
                          <span>Bullets List (Key Achievements)</span>
                          <button
                            onClick={() => handleAddExperienceBullet(expIdx)}
                            className="text-[#ff7b00] hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            + Add Bullet
                          </button>
                        </div>

                        {exp.bullets && exp.bullets.map((bullet, bulletIdx) => (
                          <div key={bulletIdx} className="flex items-center gap-3">
                            <input
                              type="text"
                              value={bullet || ""}
                              placeholder="Achievement bullet point..."
                              onChange={(e) => handleExperienceBulletChange(expIdx, bulletIdx, e.target.value)}
                              className="flex-1 px-3 py-1.5 rounded bg-white/5 border border-white/5 text-xs text-white focus:outline-none focus:border-[#ff7b00]"
                            />
                            <button
                              onClick={() => handleRemoveExperienceBullet(expIdx, bulletIdx)}
                              className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                              title="Delete bullet"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- ADD / EDIT PROJECT MODAL DIALOG --- */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
          <div 
            className="w-full max-w-lg rounded-3xl relative overflow-hidden text-left"
            style={{
              background: "rgba(9,9,21,0.9)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 30px 60px -15px rgba(0,0,0,0.9)",
            }}
          >
            {/* Modal Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: projectForm.color }} />

            <div className="p-6 md:p-8 flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h3 className="text-base font-bold text-white">
                  {isProjectEditing ? "Edit Portfolio Project" : "Add Portfolio Project"}
                </h3>
                <button 
                  onClick={() => setShowProjectModal(false)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="flex flex-col gap-4">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Title</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    required
                    placeholder="E.g. ZTS India Corporate Portal"
                    className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00f2fe] text-xs"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Summary</label>
                  <textarea
                    rows="3"
                    value={projectForm.desc}
                    onChange={(e) => setProjectForm({ ...projectForm, desc: e.target.value })}
                    required
                    placeholder="Describe the application features and milestones..."
                    className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00f2fe] text-xs resize-none"
                  />
                </div>

                {/* Tech Stack */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    value={projectForm.tech}
                    onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                    placeholder="Next.js, Laravel, Tailwind, MySQL"
                    className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00f2fe] text-xs"
                  />
                </div>

                {/* Grid inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accent Color</label>
                    <input
                      type="text"
                      value={projectForm.color}
                      onChange={(e) => setProjectForm({ ...projectForm, color: e.target.value })}
                      className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00f2fe] text-xs font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mockup Image URL</label>
                    <input
                      type="text"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      placeholder="/zts_mockup.png"
                      className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00f2fe] text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Demo Link</label>
                    <input
                      type="text"
                      value={projectForm.demoLink}
                      onChange={(e) => setProjectForm({ ...projectForm, demoLink: e.target.value })}
                      placeholder="https://..."
                      className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00f2fe] text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">GitHub Link</label>
                    <input
                      type="text"
                      value={projectForm.gitLink}
                      onChange={(e) => setProjectForm({ ...projectForm, gitLink: e.target.value })}
                      placeholder="https://github.com/..."
                      className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00f2fe] text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full py-3.5 text-xs font-bold tracking-wider text-black bg-[#00f2fe] hover:bg-white rounded-xl shadow-md transition-all duration-300 mt-4 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> SAVE PROJECT DETAILS
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
