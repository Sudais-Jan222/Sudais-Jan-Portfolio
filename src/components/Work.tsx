import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import projectsData from "../data/projects.json";

gsap.registerPlugin(useGSAP);

const Work = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !flexRef.current || !spacerRef.current) return;

    // 1. Calculate the exact horizontal movement to perfectly flush the 6th card.
    // Get the exact rendered width of one card (respecting CSS media queries dynamically)
    const firstCard = flexRef.current.firstElementChild as HTMLElement;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const numCards = flexRef.current.children.length; 
    const totalCardWidths = numCards * cardWidth; 
    
    // Calculate where the left edge of the container sits right now
    const flexLeft = flexRef.current.getBoundingClientRect().left;
    
    // Where the right edge of the 6th card is currently positioned off-screen
    const absoluteRightEdge = flexLeft + totalCardWidths;

    // The exact pixel distance to translate so 'absoluteRightEdge' perfectly equals the window's right edge
    const translateX = absoluteRightEdge - window.innerWidth;

    // 2. Explicitly set height of wrapper to push next sections down manually!
    spacerRef.current.style.height = `${translateX + window.innerHeight}px`;

    // 3. Create the timeline
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${translateX}`,
        scrub: 1,
        pin: true,
        pinSpacing: false, // Turn OFF GSAP padding bug
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    }).to(flexRef.current, {
      x: -translateX,
      ease: "none",
    });

  }, { scope: containerRef });
  
  const homepageProjects = projectsData.slice(0, 6);

  return (
    <div ref={spacerRef} className="work-manual-spacer" style={{ position: "relative" }}>
      <div className="work-section" id="work" ref={containerRef}>
        <div className="work-container section-container">
          <h2>
            MY <span>WORK</span>
          </h2>
          <div className="work-flex" ref={flexRef}>
            {homepageProjects.map((project, index) => {
              const imageSrc = Array.isArray(project.mediaPlaceholder) ? project.mediaPlaceholder[0] : project.mediaPlaceholder;
              return (
              <Link to={`/projects/${project.slug}`} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="work-box">
                  <div className="work-info">
                    <div className="work-title">
                      <h3>0{index + 1}</h3>

                      <div>
                        <h4>{project.title}</h4>
                        <p>{project.category}</p>
                      </div>
                    </div>
                    <h4>Tools and features</h4>
                    <p>{project.techStack}</p>
                  </div>
                  <WorkImage image={imageSrc || "/images/placeholder.webp"} alt={project.title} video={(project as any).video} />
                </div>
              </Link>
            )})}
          </div>
          
          <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center' }}>
             <Link to="/projects" style={{
                padding: '16px 40px',
                backgroundColor: 'transparent',
                border: '1px solid #FF6B35',
                color: '#FF6B35',
                borderRadius: '100px',
                fontSize: '18px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
             }} 
             onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FF6B35'; e.currentTarget.style.color = '#000'; }}
             onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#FF6B35'; }}
             >
                View All Projects
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
