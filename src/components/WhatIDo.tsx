import { useState } from "react";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="whatIDO">
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
          <div
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
              <h3>Custom AI Systems</h3>
              <h4>Description</h4>
              <p>
                I build AI that handles your boring, repetitive tasks so you don't have to.
                The goal is simple: save your team hundreds of hours of manual work and cut
                down your operating costs.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">n8n</div>
                <div className="what-tags">make.com</div>
                <div className="what-tags">airtable</div>
                <div className="what-tags">zapier</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
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
              <h3>Vibe-Coded Apps</h3>
              <h4>Description</h4>
              <p>
                I build custom web apps, clean interfaces, and automated workflows at lightning
                speed. You get premium, fully functional software without the traditional
                months-long wait times.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">antigravity</div>
                <div className="what-tags">lovable</div>
                <div className="what-tags">github</div>
                <div className="what-tags">netlify</div>
                <div className="what-tags">supabase</div>
                <div className="what-tags">firebase</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;