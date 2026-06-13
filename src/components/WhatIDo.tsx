import { useState } from "react";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="whatIDO" aria-label="What I Do / Services">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <article
            className={`what-content ${activeIndex === 0 ? "what-content-active" : activeIndex === 1 ? "what-sibling" : ""}`}
            onClick={() => handleClick(0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>Custom AI & Intelligent Agents</h3>
              <h4>Description</h4>
              <p>
                I build custom AI automation, intelligent agents, and n8n enterprise workflows that eliminate manual work. From Voiceflow agents to Make.com integrations, I construct autonomous revenue engines that run 24/7.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">n8n Workflows</div>
                <div className="what-tags">Voiceflow Agents</div>
                <div className="what-tags">Make.com</div>
                <div className="what-tags">LLM Integration</div>
                <div className="what-tags">B2B Outreach</div>
                <div className="what-tags">Airtable</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </article>
          <article
            className={`what-content ${activeIndex === 1 ? "what-content-active" : activeIndex === 0 ? "what-sibling" : ""}`}
            onClick={() => handleClick(1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>Vibe-Coded Web Apps</h3>
              <h4>Description</h4>
              <p>
                I develop custom web applications and intuitive user interfaces at lightning speed using vibe coding. You get premium, responsive, and fully automated software connected to reliable backends without the wait.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Vibe Coding</div>
                <div className="what-tags">React / Vite</div>
                <div className="what-tags">Supabase</div>
                <div className="what-tags">Firebase</div>
                <div className="what-tags">GitHub</div>
                <div className="what-tags">Netlify</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;