"use client";
import { useState } from "react";


export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("✅ Email sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus(`❌ Failed: ${data.error}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <button
          onClick={onClose}
          style={{ float: "right", border: "none", background: "none", fontSize: "18px" }}
        >
          ✖
        </button>
        <h2>Contact Me</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name" value={form.name} onChange={handleChange} placeholder="Name"
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <input
           name="email" type="email" value={form.email} placeholder="email" onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <textarea
           name="message" value={form.message} onChange={handleChange} placeholder="Message"
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <button
            type="submit"
            
            style={{
              background: "cyan",
              border: "none",
              padding: "10px",
              width: "100%",
              cursor: "pointer",
            }}
          >
           send 
          </button>
        </form>
        {status && <p style={{ marginTop: "10px" }}>{status}</p>}
      </div>
    </div>
  );
}
