import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiDownload, FiArrowLeft } from "react-icons/fi";
import "./styles/Resume.css";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const techGroups = [
  {
    label: "AI & LLMs",
    items: [
      "Gemini", "GPT-4", "Gemini Vision", "Relevance AI", "LangChain concepts",
    ],
  },
  {
    label: "Automation & Orchestration",
    items: [
      "n8n (Advanced Multi-Node)", "Make.com", "Voiceflow", "Zapier",
    ],
  },
  {
    label: "Full-Stack & Data",
    items: [
      "React", "Airtable", "Google Sheets / Apps Script",
      "API Integrations (Twilio, Shopify, HubSpot)",
    ],
  },
  {
    label: "Development Style",
    items: ["Vibe Coding", "Rapid Prototyping (Anti-gravity / Cursor)"],
  },
];

const projects = [
  {
    title: "Autonomous Content Marketing Engine",
    tech: "n8n, Multi-Agent LLMs, HubSpot, Airtable",
    details:
      "Architected a 39-node enterprise system that analyzes real-time search trends, coordinates specialized AI writing agents, and automatically distributes optimized content across 6 social platforms simultaneously with built-in error handling and CRM tracking.",
  },
  {
    title: "Live AI Voice OPS System",
    tech: "Voiceflow, Make.com, POS/Printer API",
    details:
      "Engineered a live voice agent for high-volume retail/restaurant use to handle simultaneous inbound calls during rush hour, successfully integrating hardware APIs to automatically print orders directly to staff.",
  },
  {
    title: "Autonomous B2B Outreach Engine",
    tech: "Relevance AI, n8n, Gmail API",
    details:
      "Developed an outbound pipeline that autonomously scrapes lead databases, analyzes company data via Relevance AI, and executes highly personalized cold email campaigns at scale in the background.",
  },
  {
    title: "Ecom Abandoned Cart Closer",
    tech: "Voiceflow, Twilio, Shopify API",
    details:
      "Built an outbound AI sales agent that calls customers who abandoned carts, dynamically negotiates price objections, generates valid discount codes via API, and texts direct checkout links.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
const Resume = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    if (!printRef.current || generating) return;
    setGenerating(true);

    try {
      // Dynamic import keeps the bundle lean
      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: [0, 0, 0, 0],
        filename: "Sudais_Jan_Resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#000000",
          logging: false,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait" as const,
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(opt).from(printRef.current).save();
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="resume-page">
      {/* ---- Chrome: back link & download FAB ---- */}
      <Link to="/" className="resume-back-link">
        <FiArrowLeft /> Portfolio
      </Link>

      <button
        className={`resume-download-fab ${generating ? "generating" : ""}`}
        onClick={handleDownload}
      >
        <FiDownload />
        {generating ? "Generating…" : "Download PDF"}
      </button>

      {/* ---- Printable Content ---- */}
      <div className="resume-container" ref={printRef}>
        {/* Header */}
        <header className="resume-header">
          <h1 className="resume-name">Sudais Jan</h1>
          <p className="resume-title">
            Independent AI Architect &amp; Automation Engineer
          </p>
          <div className="resume-contact-row">
            <span>
              <a href="mailto:sudais.jan@innoecome.com">
                sudais.jan@innoecome.com
              </a>
            </span>
            <span className="resume-contact-divider">|</span>
            <span>
              <a href="https://sudaisjan.co.uk" target="_blank" rel="noopener noreferrer">
                sudaisjan.co.uk
              </a>
            </span>
            <span className="resume-contact-divider">|</span>
            <span>Mardan, PK / Remote</span>
          </div>
        </header>

        {/* Profile */}
        <section className="resume-section">
          <h2 className="resume-section-heading">Profile</h2>
          <p className="resume-profile-text">
            I do not just talk about AI; I build the systems that put it to
            work. I am a rapid-execution developer specializing in &lsquo;vibe
            coding&rsquo; and AI architecture. I transform raw LLM capabilities
            into scalable, revenue-generating engines, autonomous outbound
            pipelines, and full-stack web applications. I solve complex
            operational bottlenecks for B2B and Ecom teams at lightning speed.
          </p>
        </section>

        {/* Core Technologies */}
        <section className="resume-section">
          <h2 className="resume-section-heading">Core Technologies</h2>
          {techGroups.map((group) => (
            <div className="resume-tech-group" key={group.label}>
              <div className="resume-tech-label">{group.label}</div>
              <div className="resume-pills">
                {group.items.map((item) => (
                  <span className="resume-pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="resume-section">
          <h2 className="resume-section-heading">
            Proof of Work &amp; System Architecture
          </h2>
          {projects.map((proj) => (
            <div className="resume-project" key={proj.title}>
              <div className="resume-project-header">
                <h3 className="resume-project-title">{proj.title}</h3>
                <span className="resume-project-tech">{proj.tech}</span>
              </div>
              <p className="resume-project-details">{proj.details}</p>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="resume-section">
          <h2 className="resume-section-heading">
            Education &amp; Trajectory
          </h2>
          <p className="resume-education-text">
            D.Com Candidate &amp; Self-Taught AI Automation Specialist. Proven
            ability to rapidly assimilate emerging tech frameworks, master
            complex orchestration tools (n8n), and deploy production-ready
            software significantly faster than traditional development cycles.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Resume;
