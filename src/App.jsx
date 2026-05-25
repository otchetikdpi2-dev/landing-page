import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Centralized Translations
const translations = {
  en: {
    hero: {
      title: "AI in Business Summit 2026",
      subtitle: "March 15, 2026 / EPAM Office, Minsk",
      register: "Register Now",
      started: "Event Started!"
    },
    timer: {
      days: "days",
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds"
    },
    about: {
      title: "About the Event",
      p1: "The AI in Business Summit 2026 is the premier gathering for executives and tech leaders exploring the transformative power of Artificial Intelligence in the corporate world.",
      p2: "Join us for a day of strategic insights, practical case studies, and high-level networking to understand how AI is reshaping industries and driving competitive advantage in 2026 and beyond."
    },
    program: {
      title: "Program Schedule",
      items: [
        { time: "09:00 AM", title: "Opening Keynote: The AI-First Enterprise" },
        { time: "10:30 AM", title: "Panel: Ethical Governance in Automated Decision Making" },
        { time: "12:00 PM", title: "Executive Networking Lunch" },
        { time: "01:30 PM", title: "Case Study: Scaling Generative AI across Global Teams" },
        { time: "03:00 PM", title: "Workshop: Building Your 2027 AI Roadmap" },
      ]
    },
    gallery: {
      title: "Past Events Gallery"
    },
    speakers: {
      title: "Featured Speakers",
      more: "Click for more",
      talks: "Talks at this Summit:",
      list: [
        { 
          name: "Elena Petrova", 
          title: "Chief Innovation Officer", 
          company: "DataStream AI", 
          bio: "Elena is a pioneer in implementing large-scale AI solutions for Fortune 500 companies. She has over 15 years of experience in data strategy and digital transformation.",
          talks: ["The AI-First Enterprise", "Scaling AI Teams"]
        },
        { 
          name: "Dr. Marc Chen", 
          title: "Head of AI Research", 
          company: "FutureLogic", 
          bio: "Dr. Chen leads cutting-edge research in neural network architectures. His work focuses on making AI models more efficient and interpretable for business applications.",
          talks: ["The Future of Neural Networks", "AI Efficiency Workshop"]
        },
        { 
          name: "Sarah Jenkins", 
          title: "VP of Digital Strategy", 
          company: "Global Tech Solutions", 
          bio: "Sarah specializes in the intersection of business value and emerging technologies. She has successfully led multiple AI-driven product launches across three continents.",
          talks: ["Building Your 2027 AI Roadmap", "AI Product Strategy"]
        },
        { 
          name: "Alex Volkov", 
          title: "Lead Data Ethicist", 
          company: "Ethos AI", 
          bio: "Alex is a renowned expert in AI ethics and governance. He advises governments and corporations on building responsible and transparent automated systems.",
          talks: ["Ethical Governance", "Responsible AI Frameworks"]
        },
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Who should attend this summit?", a: "The summit is designed for C-level executives, department heads, and tech leads who are responsible for AI strategy and implementation in their organizations." },
        { q: "Will sessions be available on-demand?", a: "Yes, all registered attendees will receive exclusive access to the session recordings and presentation decks one week after the event." },
        { q: "Is there a group discount for teams?", a: "Absolutely. We offer a 20% discount for registrations of 5 or more people from the same organization. Please contact our support team for a promo code." },
        { q: "What is the dress code for the event?", a: "The dress code for the summit is business casual. We recommend comfortable attire suitable for a professional conference environment." },
        { q: "How can I apply to be a sponsor?", a: "We have various sponsorship packages available. Please visit our 'Sponsors' page or reach out to our partnership team at partners@aisummit.com." }
      ]
    },
    reg: {
      title: "Reserve Your Executive Pass",
      name: "Full Name *",
      name_p: "Enter your full name",
      email: "Work Email *",
      email_p: "email@company.com",
      company: "Company Name",
      company_p: "Your organization",
      submit: "Complete Registration",
      success: "🎉 You're registered!",
      success_p: "Welcome to the AI in Business Summit 2026. A confirmation email with event details has been sent to your inbox."
    }
  },
  uk: {
    hero: {
      title: "Саміт AI у бізнесі 2026",
      subtitle: "15 березня 2026 / Офіс EPAM, Мінськ",
      register: "Зареєструватися",
      started: "Подія розпочалася!"
    },
    timer: {
      days: "днів",
      hours: "годин",
      minutes: "хвилин",
      seconds: "секунд"
    },
    about: {
      title: "Про подію",
      p1: "Саміт AI у бізнесі 2026 — це головна подія для керівників та технічних лідерів, які досліджують трансформаційну силу штучного інтелекту в корпоративному світі.",
      p2: "Приєднуйтесь до нас для отримання стратегічних інсайтів, вивчення практичних кейсів та нетворкінгу високого рівня, щоб зрозуміти, як AI змінює галузі та забезпечує конкурентну перевагу у 2026 році та надалі."
    },
    program: {
      title: "Програма",
      items: [
        { time: "09:00", title: "Відкриття: AI-First Enterprise" },
        { time: "10:30", title: "Панель: Етичне управління в автоматизованих рішеннях" },
        { time: "12:00", title: "Обід для керівників та нетворкинг" },
        { time: "13:30", title: "Кейс: Масштабування Generative AI у глобальних командах" },
        { time: "15:00", title: "Воркшоп: Створення дорожньої карти AI на 2027 рік" },
      ]
    },
    gallery: {
      title: "Галерея минулих подій"
    },
    speakers: {
      title: "Наші спікеры",
      more: "Детальніше",
      talks: "Доповіді на саміті:",
      list: [
        { 
          name: "Олена Петрова", 
          title: "Директор з інновацій", 
          company: "DataStream AI", 
          bio: "Олена — піонер у впровадженні масштабних AI-рішень для компаній зі списку Fortune 500. У неї понад 15 років досвіду в галузі стратегії даних та цифрової трансформації.",
          talks: ["Підприємство, орієнтоване на AI", "Масштабування AI-команд"]
        },
        { 
          name: "Д-р Марк Чен", 
          title: "Керівник досліджень AI", 
          company: "FutureLogic", 
          bio: "Доктор Чен керує передовими дослідженнями в галузі архітектури нейронних мереж. Його робота зосереджена на підвищенні ефективності та інтерпретованості AI-моделей.",
          talks: ["Майбутнє нейронних мереж", "Воркшоп з ефективності AI"]
        },
        { 
          name: "Сара Дженкінс", 
          title: "Віце-президент зі стратегії", 
          company: "Global Tech Solutions", 
          bio: "Сара спеціалізується на перетині бізнес-цінності та нових технологій. Вона успішно керувала запуском кількох продуктів на базі AI на трьох континентах.",
          talks: ["Дорожня карта AI на 2027 рік", "Продуктова стратегія AI"]
        },
        { 
          name: "Олекс Волков", 
          title: "Провідний етик даних", 
          company: "Ethos AI", 
          bio: "Олекс — визнаний експерт у галузі етики та управління AI. Він консультує уряди та корпорації з питань створення відповідальних та прозорих систем.",
          talks: ["Етичне управління", "Фреймворки відповідального AI"]
        },
      ]
    },
    faq: {
      title: "Часті запитання",
      items: [
        { q: "Кому варто відвідати цей саміт?", a: "Саміт призначений для керівників вищої ланки, голів департаментів та техлідів, які відповідають за стратегію та впровадження AI у своїх організаціях." },
        { q: "Чи будуть записи сесій?", a: "Так, усі зареєстровані учасники отримають ексклюзивний доступ к записам та презентаціям через тиждень після заходу." },
        { q: "Чи є знижки для груп?", a: "Звичайно. Ми пропонуємо знижку 20% при реєстрації від 5 осіб з однієї організації. Будь ласка, зв'яжіться з нашою службою підтримки для отримання промокоду." },
        { q: "Який дрес-код?", a: "Дрес-код саміту — бізнес-кежуал. Ми рекомендуємо зручне вбрання, що відповідає професійній конференції." },
        { q: "Як стати спонсором?", a: "У нас є різні спонсорські пакеты. Відвідайте нашу сторінку 'Спонсори' або напишіть нашій команді з партнерства на partners@aisummit.com." }
      ]
    },
    reg: {
      title: "Забронювати перепустку",
      name: "Повне ім'я *",
      name_p: "Введіть ваше повне ім'я",
      email: "Робочий email *",
      email_p: "email@company.com",
      company: "Назва компанії",
      company_p: "Ваша організація",
      submit: "Завершити реєстрацію",
      success: "🎉 Ви зареєстровані!",
      success_p: "Ласкаво просимо на Саміт AI у бізнесі 2026. Лист-підтвердження з деталями події було надіслано на вашу пошту."
    }
  }
};

// Custom Hook for Scroll Reveal
function useScrollReveal() {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return elementRef;
}

// Countdown Timer Component
function Countdown({ targetDate, labels }) {
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
    if (!timeLeft[interval] && timeLeft[interval] !== 0) return;

    timerComponents.push(
      <div className="countdown-item" key={interval}>
        <span className="countdown-value">{timeLeft[interval]}</span>
        <span className="countdown-label">{labels[interval]}</span>
      </div>
    );
  });

  return (
    <div className="countdown">
      {timerComponents.length ? timerComponents : <span className="event-started">Event Started!</span>}
    </div>
  );
}

function Header({ lang, setLang }) {
  return (
    <header className="site-header">
      <div className="container header-container">
        <div className="logo">AI Summit 2026</div>
        <div className="lang-switcher">
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          <button className={lang === 'uk' ? 'active' : ''} onClick={() => setLang('uk')}>UK</button>
        </div>
      </div>
    </header>
  );
}

function Hero({ t, timerT }) {
  const scrollToRegister = () => {
    document.getElementById('registration').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className="container">
        <h1 className="fade-in">{t.title}</h1>
        <p className="subtitle fade-in-delayed">{t.subtitle}</p>
        <Countdown targetDate="2026-03-15T09:00:00" labels={timerT} />
        <button onClick={scrollToRegister} className="btn-primary fade-in-delayed">{t.register}</button>
      </div>
    </section>
  );
}

function About({ t }) {
  const revealRef = useScrollReveal();
  return (
    <section id="about" className="about reveal-section" ref={revealRef}>
      <div className="container">
        <h2>{t.title}</h2>
        <div className="about-content">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
        </div>
      </div>
    </section>
  );
}

function Program({ t }) {
  const revealRef = useScrollReveal();
  return (
    <section id="program" className="program alt-bg reveal-section" ref={revealRef}>
      <div className="container">
        <h2>{t.title}</h2>
        <div className="timeline">
          {t.items.map((item, index) => (
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

function Gallery({ t }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const revealRef = useScrollReveal();
  const images = [
    "https://picsum.photos/id/1/800/600",
    "https://picsum.photos/id/2/800/600",
    "https://picsum.photos/id/3/800/600",
    "https://picsum.photos/id/4/800/600",
    "https://picsum.photos/id/5/800/600",
    "https://picsum.photos/id/6/800/600"
  ];

  return (
    <section id="gallery" className="gallery reveal-section" ref={revealRef}>
      <div className="container">
        <h2>{t.title}</h2>
        <div className="gallery-grid">
          {images.map((img, i) => (
            <div key={i} className="gallery-item" onClick={() => setSelectedImg(img)}>
              <img src={img} alt={`Event ${i+1}`} />
            </div>
          ))}
        </div>
      </div>
      {selectedImg && (
        <div className="lightbox-overlay" onClick={() => setSelectedImg(null)}>
          <button className="lightbox-close">&times;</button>
          <img src={selectedImg} alt="Enlarged" />
        </div>
      )}
    </section>
  );
}

function Speakers({ t }) {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const revealRef = useScrollReveal();

  const avatars = [
    "https://i.pravatar.cc/150?img=47",
    "https://i.pravatar.cc/150?img=11",
    "https://i.pravatar.cc/150?img=5",
    "https://i.pravatar.cc/150?img=33"
  ];

  return (
    <section id="speakers" className="speakers alt-bg reveal-section" ref={revealRef}>
      <div className="container">
        <h2>{t.title}</h2>
        <div className="speaker-grid">
          {t.list.map((s, index) => (
            <div key={index} className="speaker-card" onClick={() => setSelectedSpeaker({...s, avatar: avatars[index]})}>
              <img src={avatars[index]} alt={s.name} className="avatar" />
              <h3>{s.name}</h3>
              <p className="title">{s.title}</p>
              <p className="company">{s.company}</p>
              <div className="social-icons">
                <a href="#linkedin" onClick={(e) => e.stopPropagation()}>LinkedIn</a>
                <a href="#twitter" onClick={(e) => e.stopPropagation()}>Twitter</a>
              </div>
              <div className="speaker-bio-overlay">
                <p>{s.bio.substring(0, 100)}...</p>
                <span>{t.more}</span>
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
              <h4>{t.talks}</h4>
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

function FAQ({ t }) {
  const [openIndex, setOpenIndex] = useState(null);
  const revealRef = useScrollReveal();

  return (
    <section id="faq" className="faq reveal-section" ref={revealRef}>
      <div className="container">
        <h2>{t.title}</h2>
        <div className="accordion">
          {t.items.map((faq, index) => (
            <div key={index} className={`accordion-item ${openIndex === index ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
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

function Registration({ t }) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [submitted, setSubmitted] = useState(false);
  const revealRef = useScrollReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) setSubmitted(true);
  };

  return (
    <section id="registration" className="registration alt-bg reveal-section" ref={revealRef}>
      <div className="container">
        <h2>{t.title}</h2>
        {submitted ? (
          <div className="success-message">
            <h3>{t.success}</h3>
            <p>{t.success_p}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reg-form">
            <div className="form-group">
              <label>{t.name}</label>
              <input type="text" placeholder={t.name_p} required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>{t.email}</label>
              <input type="email" placeholder={t.email_p} required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="form-group">
              <label>{t.company}</label>
              <input type="text" placeholder={t.company_p} value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
            </div>
            <button type="submit" className="btn-primary">{t.submit}</button>
          </form>
        )}
      </div>
    </section>
  );
}

function App() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  return (
    <div className="app">
      <Header lang={lang} setLang={setLang} />
      <Hero t={t.hero} timerT={t.timer} />
      <About t={t.about} />
      <Program t={t.program} />
      <Gallery t={t.gallery} />
      <Speakers t={t.speakers} />
      <FAQ t={t.faq} />
      <Registration t={t.reg} />
      <footer>
        <p>&copy; 2026 AI in Business Summit. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
