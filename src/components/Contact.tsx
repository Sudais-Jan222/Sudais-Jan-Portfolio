import { useState } from "react";
import "./styles/Contact.css";
import { FaLinkedinIn, FaXTwitter, FaGithub } from "react-icons/fa6";

const services = [
  "AI Automation & Workflows",
  "Vibe Coding (Web Apps & Interfaces)",
  "Enterprise LLM Integration",
  "AI Team Leadership / Fractional CTO",
  "Custom AI Consultation"
];

const contactMethods = ["Email", "Video Call", "Phone"];

const Contact = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [budget, setBudget] = useState<number>(5000);
  const [preferredContact, setPreferredContact] = useState<string>("Email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const formatBudget = (val: number) => {
    if (val >= 50000) return "£50,000+";
    return `£${val.toLocaleString()}`;
  };

  const handleSend = async () => {
    if (!email || !selectedService || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const payload = {
      name: name || "Anonymous",
      email,
      service: selectedService,
      budget: formatBudget(budget),
      preferredContact,
      submittedAt: new Date().toISOString(),
      source: "Portfolio Website Contact Form"
    };

    try {
      const response = await fetch("https://hook.eu2.make.com/1b4jtb7pgmavouu8vga9j1k45muxvu0r", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form after success
        setName("");
        setEmail("");
        setSelectedService(null);
        setBudget(5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-main" id="contact">
      <div className="contact-header">
        <h2 className="contact-heading">Ready for your next build?</h2>
        <p className="contact-subheading">Let's connect. Select your project details below.</p>
      </div>

      <div className="contact-interactive-grid">
        {/* Left Column: Inputs */}
        <div className="contact-inputs-column">
          <div className="form-group row-group">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="std-input"
            />
            <input 
              type="email" 
              placeholder="Your Email (Required)" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="std-input"
            />
          </div>

          <div className="form-group">
            <label className="section-label">Select a Service</label>
            <div className="pills-container">
              {services.map(srv => (
                <button 
                  key={srv}
                  className={`pill-btn ${selectedService === srv ? 'active' : ''}`}
                  onClick={() => setSelectedService(srv)}
                >
                  {srv}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="section-label">Estimated Budget</label>
            <div className="slider-container">
              <input 
                type="range" 
                min="2000" 
                max="50000" 
                step="1000" 
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="budget-slider"
                style={{
                   background: `linear-gradient(to right, #FF6B35 ${(budget - 2000) / (50000 - 2000) * 100}%, #333 ${(budget - 2000) / (50000 - 2000) * 100}%)`
                }}
              />
              <div className="slider-labels">
                <span>£2k</span>
                <span className="current-val">{formatBudget(budget)}</span>
                <span>£50k+</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="section-label">Preferred Contact Method</label>
            <div className="pills-container contact-methods">
              {contactMethods.map(method => (
                <button 
                  key={method}
                  className={`pill-btn ${preferredContact === method ? 'active' : ''}`}
                  onClick={() => setPreferredContact(method)}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Summary */}
        <div className="contact-summary-column">
          <div className="summary-card">
            <h3>Project Quick-Start Summary</h3>
            <p className="summary-greeting">
              {name ? `Hi ${name}!` : "Hi there!"} Based on your selection...
            </p>
            
            <div className="summary-item">
              <span className="summary-icon">🎯</span>
              <div className="summary-text-box">
                <span className="summary-label">EXPERT DOMAIN</span>
                <span className="summary-value">
                  {selectedService ? selectedService : "Select a service to begin..."}
                </span>
              </div>
            </div>

            <div className="summary-item">
              <span className="summary-icon">💰</span>
              <div className="summary-text-box">
                <span className="summary-label">ESTIMATED BUDGET</span>
                <span className="summary-value">
                   {formatBudget(budget)}
                </span>
              </div>
            </div>

            <div className="summary-item">
              <span className="summary-icon">🤝</span>
              <div className="summary-text-box">
                <span className="summary-label">STRATEGY SESSION</span>
                <span className="summary-value">
                  Via {preferredContact}
                </span>
              </div>
            </div>

            <button 
              className={`send-btn ${isSubmitting ? 'loading' : ''} ${submitStatus}`} 
              onClick={handleSend} 
              disabled={!email || !selectedService || isSubmitting}
            >
              {isSubmitting ? "Sending..." : submitStatus === "success" ? "Message Sent!" : submitStatus === "error" ? "Try Again" : "Send Message & Start Build"}
            </button>
            {submitStatus === "success" && <p className="status-msg success">Got it! I'll be in touch soon.</p>}
            {submitStatus === "error" && <p className="status-msg error">Something went wrong. Please try again.</p>}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="contact-bottom-bar">
        <div className="bottom-left">
          © 2026 Sudais Jan. Built with AI.
        </div>
        <div className="bottom-right">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaLinkedinIn />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaXTwitter />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaGithub />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
