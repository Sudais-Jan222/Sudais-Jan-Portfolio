import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          BUILD TIMELINE: <span>FROM</span>
          <br /> CONCEPT TO EXECUTION
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Ecom Creative Agent</h4>
                <h5>Independent Project Build</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Built an AI pipeline that turns raw product images into high-performing, studio-quality ad creatives in seconds.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Airtable Ad Agency Suite</h4>
                <h5>Independent Workflow Build</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Eliminated manual creative research. Built an n8n pipeline that researches products, writes VSL scripts, and tracks FB library trends automatically.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Voice OPS (EU Restaurant)</h4>
                <h5>Advanced Proof of Concept</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Resolved 24/7 order intake by building a Voiceflow-Make-Printer integration. Automatically takes orders and prints them for the staff.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
