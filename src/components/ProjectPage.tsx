import { useParams, Link } from "react-router-dom";
import projects from "../data/projects.json";
import AIChatbot from "./AIChatbot";
import Navbar from "./Navbar";
import "./styles/ProjectPage.css";

interface Project {
  slug: string;
  title: string;
  category: string;
  techStack: string;
  problem: string;
  result: string;
  mediaType: string;
  mediaPlaceholder: string | string[];
  video?: string;
}

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = (projects as Project[]).find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="project-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "72px", fontWeight: 600, margin: 0 }}>404</h1>
          <p style={{ color: "#666", marginTop: 12 }}>Project not found.</p>
          <Link to="/" style={{ color: "var(--accentColor)", textDecoration: "underline", marginTop: 20, display: "inline-block" }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const techTags = project.techStack.split(", ");

  return (
    <div className="project-page-container">
      <Navbar />
      <div className="project-page" style={{ isolation: "isolate", position: "relative", paddingTop: "140px" }}>
      {/* Back Button */}
      <div style={{ padding: "0 5%", marginBottom: "24px", display: "flex" }}>
        <Link to="/projects" className="project-back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Projects
        </Link>
      </div>

      {/* Media Hero */}
      <div className="project-media-hero" style={{ width: "90%", margin: "0 auto 80px auto", height: "auto", position: "relative", overflow: "hidden", borderRadius: "40px", backgroundColor: "#0b080c", border: "1px solid #222" }}>
        {project.mediaType === "video" && project.video ? (
          <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "20px", boxSizing: "border-box" }}>
            <video 
              src={project.video} 
              controls 
              autoPlay 
              muted 
              loop 
              style={{ maxWidth: "100%", height: "auto", maxHeight: "85vh", borderRadius: "20px", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
            />
          </div>
        ) : Array.isArray(project.mediaPlaceholder) ? (
          <div style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", width: "100%", height: "auto", scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}>
            {project.mediaPlaceholder.map((img, i) => (
              <img key={i} src={img} alt={`${project.title} - ${i + 1}`} style={{ flex: "0 0 100%", width: "100%", height: "auto", maxHeight: "80vh", objectFit: "contain", scrollSnapAlign: "start", padding: "40px", boxSizing: "border-box" }} />
            ))}
          </div>
        ) : (
          <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "40px", boxSizing: "border-box" }}>
            <img src={project.mediaPlaceholder || "/images/placeholder.webp"} alt={project.title} style={{ maxWidth: "100%", height: "auto", maxHeight: "80vh", objectFit: "contain", borderRadius: "12px" }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="project-content">
        {/* Left Column */}
        <div className="project-left">
          <span className="project-category">{project.category}</span>
          <h1 className="project-title">{project.title}</h1>

          <div>
            <p className="project-tech-label">Tech Stack</p>
            <div className="project-tech-tags">
              {techTags.map((tag, i) => (
                <span className="project-tech-tag" key={i}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="project-right">
          <div>
            <p className="project-section-label problem">The Problem</p>
            <p className="project-section-text">{project.problem}</p>
          </div>

          <hr className="project-divider" />

          <div>
            <p className="project-section-label result">The Result</p>
            <p className="project-section-text">{project.result}</p>
          </div>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot
        projectTitle={project.title}
        techStack={project.techStack}
        problem={project.problem}
        result={project.result}
      />
    </div>
    </div>
  );
};

export default ProjectPage;
