import React, { useState } from 'react';
import './App.css';

function Hero() {
  const scrollToRegister = () => {
    document.getElementById('registration').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className="container">
        <h1 className="glitch" data-text="TechFuture Summit 2026">TechFuture Summit 2026</h1>
        <p className="subtitle">October 15-16, 2026 • San Francisco, CA</p>
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
          <p>Welcome to TechFuture Summit, the premier gathering for innovators, developers, and tech enthusiasts. We're bringing together the brightest minds to discuss the technologies shaping our tomorrow.</p>
          <p>Join us for two days of deep-dive workshops, inspiring keynotes, and unparalleled networking opportunities. Whether you're a seasoned professional or just starting your journey, there's something here to elevate your skills and vision.</p>
        </div>
      </div>
    </section>
  );
}

function Program() {
  const schedule = [
    { time: "09:00 AM", title: "Registration & Breakfast" },
    { time: "10:00 AM", title: "Keynote: The Future of AI" },
    { time: "11:30 AM", title: "Workshop: Building Scalable Systems" },
    { time: "01:00 PM", title: "Lunch Break & Networking" },
    { time: "02:30 PM", title: "Panel: Cybersecurity in 2026" },
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
  const speakers = [
    { name: "Dr. Ada Lovelace", title: "Chief AI Scientist", company: "NextGen Tech", avatar: "https://i.pravatar.cc/150?img=47" },
    { name: "Alan Turing", title: "Head of Computing", company: "Logic Corp", avatar: "https://i.pravatar.cc/150?img=11" },
    { name: "Grace Hopper", title: "VP of Engineering", company: "Compiler Inc.", avatar: "https://i.pravatar.cc/150?img=5" },
    { name: "Linus Torvalds", title: "Open Source Advocate", company: "Kernel Systems", avatar: "https://i.pravatar.cc/150?img=33" },
  ];

  return (
    <section id="speakers" className="speakers">
      <div className="container">
        <h2>Featured Speakers</h2>
        <div className="speaker-grid">
          {speakers.map((s, index) => (
            <div key={index} className="speaker-card">
              <img src={s.avatar} alt={s.name} className="avatar" />
              <h3>{s.name}</h3>
              <p className="title">{s.title}</p>
              <p className="company">{s.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Do I need prior experience to attend?", a: "While some workshops are advanced, we have tracks designed for all skill levels, including beginners." },
    { q: "Is lunch provided?", a: "Yes, catered lunch and refreshments are included with your ticket on both days." },
    { q: "Can I get a refund if I can't make it?", a: "Full refunds are available up to 14 days before the event." },
    { q: "Are the sessions recorded?", a: "Yes, all keynotes and panel discussions will be recorded and shared with attendees after the event." }
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
        <h2>Secure Your Spot</h2>
        {submitted ? (
          <div className="success-message">
            <h3>🎉 You're registered!</h3>
            <p>Check your email for further details.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reg-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} />
            </div>
            <button type="submit" className="btn-primary">Submit Registration</button>
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
        <p>&copy; 2026 TechFuture Summit. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;