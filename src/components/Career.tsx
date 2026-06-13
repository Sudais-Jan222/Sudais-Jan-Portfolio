import "./styles/Career.css";

const Career = () => {
  return (
    <section className="career-section section-container" aria-label="Build Timeline and Career Experience">
      <div className="career-container">
        <h2>
          BUILD TIMELINE: <span>FROM</span>
          <br /> CONCEPT TO EXECUTION
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <article className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Ecom Creative Agent (AI Automation)</h4>
                <h5>Independent Project Build</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Built a custom AI automation pipeline that turns raw product images into high-performing, studio-quality ad creatives in seconds using LLM integrations and image APIs.
            </p>
          </article>
          <article className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Airtable Ad Agency Suite (n8n Workflows)</h4>
                <h5>Independent Workflow Build</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Eliminated manual creative research. Built an n8n enterprise workflow pipeline that researches products, writes VSL scripts using advanced LLM prompts, and tracks ad trends automatically.
            </p>
          </article>
          <article className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Voice OPS (Voiceflow & Make.com)</h4>
                <h5>Advanced Proof of Concept</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Resolved 24/7 order intake by building a Voiceflow agent integrated with Make.com automation and restaurant printer APIs. Automatically takes phone orders, structures data, and prints tickets.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Career;
