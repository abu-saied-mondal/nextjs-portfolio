"use client";
import { useEffect, useState, useRef } from "react";

export default function VoiceControl() {
  const [listening, setListening] = useState(false);
  const [activated, setActivated] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser doesn't support speech recognition");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript
          .toLowerCase()
          .trim();
      console.log("Heard:", transcript);

      if (!activated && transcript.includes("hey jarvis")) {
        speak("Welcome home, sir.");
        setActivated(true);
        return;
      }

      if (activated) {
        handleCommand(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
  };

  const handleCommand = async (text) => {
    let action = null;

    if (text.includes("recycle bin")) action = "open_recycle_bin";
    else if (text.includes("search")) action = "open_search";
    else if (text.includes("notepad")) action = "open_notepad";
    else if (text.includes("select all") || text.includes("delete"))
      action = "select_all_delete";
    else {
      speak("I did not understand that, sir.");
      return;
    }

    try {
      await fetch("http://localhost:3001/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      speak("Done, sir.");
      setActivated(false); // Reset after execution
    } catch (error) {
      console.error("API error:", error);
      speak("Something went wrong, sir.");
    }
  };

  return (
    <div className="text-center my-5">
      <button
        className="btn btn-danger"
        onClick={() => {
          setListening((prev) => {
            const next = !prev;

            if (next && recognitionRef.current) {
              recognitionRef.current.start();
              console.log("Recognition started");
            } else if (!next && recognitionRef.current) {
              recognitionRef.current.stop();
              console.log("Recognition stopped");
            }

            return next;
          });

          setActivated(false); // Reset hotword
        }}
      >
        {listening ? "🛑 Stop Jarvis" : "🎙️ Activate Jarvis"}
      </button>
      <p className="mt-2 text-white small">
        Say <strong>Hey Jarvis</strong> to begin.
      </p>
    </div>
  );
}
