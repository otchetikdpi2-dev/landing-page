import React, { useState, useEffect } from 'react';
import './App.css';

// Countdown Timer Component
function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) {
      return;
    }

    timerComponents.push(
      <div className="countdown-item" key={interval}>
        <span className="countdown-value">{timeLeft[interval]}</span>
        <span className="countdown-label">{interval}</span>
      </div>
    );
  });

  return (
    <div className="countdown">
      {timerComponents.length ? timerComponents : <span className="event-started">Event Started!</span>}
    </div>
  );
}

function Hero() {
  const scrollToRegister = () => {
    document.getElementById('registration').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className="container">
        <h1>AI in Business Summit 2026</h1>
        <p className="subtitle">March 15, 2026 / EPAM Office, Minsk</p>
        <Countdown targetDate="2026-03-15T09:00:00" />
        <button onClick={scrollToRegister} className="btn-primary">Register Now</button>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About the Event</h2>
        <div className="about-content">
          <p>The AI in Business Summit 2026 is the premier gathering for executives and tech leaders exploring the transformative power of Artificial Intelligence in the corporate world.</p>
          <p>Join us for a day of strategic insights, practical case studies, and high-level networking to understand how AI is reshaping industries and driving competitive advantage in 2026 and beyond.</p>
        </div>
      </div>
    </section>
  );
}

function Program() {
  const schedule = [
    { time: "09:00 AM", title: "Opening Keynote: The AI-First Enterprise" },
    { time: "10:30 AM", title: "Panel: Ethical Governance in Automated Decision Making" },
    { time: "12:00 PM", title: "Executive Networking Lunch" },
    { time: "01:30 PM", title: "Case Study: Scaling Generative AI across Global Teams" },
    { time: "03:00 PM", title: "Workshop: Building Your 2027 AI Roadmap" },
  ];

  return (
    <section id="program" className="program alt-bg">
      <div className="container">
        <h2>Program Schedule</h2>
        <div className="timeline">
          {schedule.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="time">{item.time}</div>
              <div className="content">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Speakers() {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const speakers = [
    { 
      name: "Elena Petrova", 
      title: "Chief Innovation Officer", 
      company: "DataStream AI", 
      avatar: "https://i.pravatar.cc/150?img=47",
      bio: "Elena is a pioneer in implementing large-scale AI solutions for Fortune 500 companies. She has over 15 years of experience in data strategy and digital transformation.",
      talks: ["The AI-First Enterprise", "Scaling AI Teams"]
    },
    { 
      name: "Dr. Marc Chen", 
      title: "Head of AI Research", 
      company: "FutureLogic", 
      avatar: "https://i.pravatar.cc/150?img=11",
      bio: "Dr. Chen leads cutting-edge research in neural network architectures. His work focuses on making AI models more efficient and interpretable for business applications.",
      talks: ["The Future of Neural Networks", "AI Efficiency Workshop"]
    },
    { 
      name: "Sarah Jenkins", 
      title: "VP of Digital Strategy", 
      company: "Global Tech Solutions", 
      avatar: "https://i.pravatar.cc/150?img=5",
      bio: "Sarah specializes in the intersection of business value and emerging technologies. She has successfully led multiple AI-driven product launches across three continents.",
      talks: ["Building Your 2027 AI Roadmap", "AI Product Strategy"]
    },
    { 
      name: "Alex Volkov", 
      title: "Lead Data Ethicist", 
      company: "Ethos AI", 
      avatar: "https://i.pravatar.cc/150?img=33",
      bio: "Alex is a renowned expert in AI ethics and governance. He advises governments and corporations on building responsible and transparent automated systems.",
      talks: ["Ethical Governance", "Responsible AI Frameworks"]
    },
  ];

  return (
    <section id="speakers" className="speakers">
      <div className="container">
        <h2>Featured Speakers</h2>
        <div className="speaker-grid">
          {speakers.map((s, index) => (
            <div key={index} className="speaker-card" onClick={() => setSelectedSpeaker(s)}>
              <img src={s.avatar} alt={s.name} className="avatar" />
              <h3>{s.name}</h3>
              <p className="title">{s.title}</p>
              <p className="company">{s.company}</p>
              <div className="social-icons">
                <a href="#linkedin" onClick={(e) => e.stopPropagation()}>LinkedIn</a>
                <a href="#twitter" onClick={(e) => e.stopPropagation()}>Twitter</a>
              </div>
              <div className="speaker-bio-overlay">
                <p>{s.bio.substring(0, 100)}...</p>
                <span>Click for more</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedSpeaker && (
        <div className="modal-overlay" onClick={() => setSelectedSpeaker(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedSpeaker(null)}>&times;</button>
            <div className="modal-body">
              <h3>{selectedSpeaker.name}</h3>
              <p className="title">{selectedSpeaker.title} @ {selectedSpeaker.company}</p>
              <p className="bio">{selectedSpeaker.bio}</p>
              <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />
              <h4>Talks at this Summit:</h4>
              <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                {selectedSpeaker.talks.map((talk, i) => <li key={i}>{talk}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Who should attend this summit?", a: "The summit is designed for C-level executives, department heads, and tech leads who are responsible for AI strategy and implementation in their organizations." },
    { q: "Will sessions be available on-demand?", a: "Yes, all registered attendees will receive exclusive access to the session recordings and presentation decks one week after the event." },
    { q: "Is there a group discount for teams?", a: "Absolutely. We offer a 20% discount for registrations of 5 or more people from the same organization. Please contact our support team for a promo code." },
    { q: "What is the dress code for the event?", a: "The dress code for the summit is business casual. We recommend comfortable attire suitable for a professional conference environment." },
    { q: "How can I apply to be a sponsor?", a: "We have various sponsorship packages available. Please visit our 'Sponsors' page or reach out to our partnership team at partners@aisummit.com." }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq alt-bg">
      <div className="container">
        <h2>Frequently Asked Questions</h2>
        <div className="accordion">
          {faqs.map((faq, index) => (
            <div key={index} className={`accordion-item ${openIndex === index ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => toggle(index)}>
                {faq.q}
                <span className="icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="accordion-content">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Registration() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="registration" className="registration">
      <div className="container">
        <h2>Reserve Your Executive Pass</h2>
        {submitted ? (
          <div className="success-message">
            <h3>🎉 You're registered!</h3>
            <p>Welcome to the AI in Business Summit 2026. A confirmation email with event details has been sent to your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reg-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input type="text" id="name" name="name" placeholder="Enter your full name" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Work Email *</label>
              <input type="email" id="email" name="email" placeholder="email@company.com" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input type="text" id="company" name="company" placeholder="Your organization" value={formData.company} onChange={handleChange} />
            </div>
            <button type="submit" className="btn-primary">Complete Registration</button>
          </form>
        )}
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="app">
      <Hero />
      <About />
      <Program />
      <Speakers />
      <FAQ />
      <Registration />
      <footer>
        <p>&copy; 2026 AI in Business Summit. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
