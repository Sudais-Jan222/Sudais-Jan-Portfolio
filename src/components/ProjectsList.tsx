import { useState } from "react";
import { Link } from "react-router-dom";
import projectsData from "../data/projects.json";
import Navbar from "./Navbar";

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#0b080c", minHeight: "100vh", paddingTop: "120px", paddingBottom: "80px", color: "#fff", isolation: "isolate" }}>
        <div className="section-container" style={{ margin: "auto", width: "1300px", maxWidth: "90%" }}>
          <h1 style={{ fontSize: "70px", fontWeight: 500, marginBottom: "60px" }}>
            ALL <span style={{ color: "#FF6B35" }}>PROJECTS</span>
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "40px" }}>
            {projectsData.map((project, index) => {
              const imageSrc = Array.isArray(project.mediaPlaceholder) ? project.mediaPlaceholder[0] : project.mediaPlaceholder;
              const videoSrc = (project as any).video;

              return (
                <Link to={`/projects/${project.slug}`} key={index} style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}>
                  <div style={{ width: "100%", padding: "40px", backgroundColor: "#111", border: "1px solid #363636", borderRadius: "20px", display: "flex", flexDirection: "column", gap: "30px", transition: "transform 0.3s ease, borderColor 0.3s ease", cursor: "pointer", flex: 1, position: "relative" }} 
                       onMouseEnter={(e) => { 
                         e.currentTarget.style.transform = "translateY(-10px)"; 
                         e.currentTarget.style.borderColor = "var(--accentColor)";
                         setHoveredIndex(index);
                       }}
                       onMouseLeave={(e) => { 
                         e.currentTarget.style.transform = "translateY(0px)"; 
                         e.currentTarget.style.borderColor = "#363636";
                         setHoveredIndex(null);
                       }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <h3 style={{ fontSize: "36px", color: "#FF6B35", margin: 0, fontWeight: 600 }}>{(index + 1).toString().padStart(2, '0')}</h3>
                        <div style={{ textAlign: "right" }}>
                          <h4 style={{ fontSize: "22px", margin: "0 0 10px 0", fontWeight: 500 }}>{project.title}</h4>
                          <p style={{ color: "#8b8b8b", margin: 0, fontSize: "14px" }}>{project.category}</p>
                        </div>
                      </div>
                      <div>
                        <h4 style={{ fontSize: "14px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px", color: "#666" }}>Tools and features</h4>
                        <p style={{ color: "#d1d1d1", margin: 0, fontSize: "15px", lineHeight: "1.5" }}>{project.techStack}</p>
                      </div>
                    </div>
                    <div style={{ width: "100%", height: "250px", borderRadius: "12px", overflow: "hidden", backgroundColor: "#000", position: "relative" }}>
                      <img src={imageSrc || "/images/placeholder.webp"} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                           onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                           onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"} />
                      {hoveredIndex === index && videoSrc && (
                        <video 
                          src={videoSrc} 
                          autoPlay 
                          muted 
                          playsInline 
                          loop 
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsList;
