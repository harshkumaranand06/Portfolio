import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import ChatWidget from './components/chat/ChatWidget';
import Experience from './components/3d/Experience';
import { getResumeData } from './services/api';
import { ResumeData } from './types';

function App() {
  console.log("App.tsx: rendering App component");
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8005/api';
      console.log("App.tsx: Fetching from", API_URL);

      // Timeout fallback
      const timeout = setTimeout(() => {
        if (loading) {
          console.error("App.tsx: Fetching timed out after 10s");
          setLoading(false);
        }
      }, 10000);

      try {
        const resumeData = await getResumeData();
        console.log("App.tsx: Data received successfully");
        setData(resumeData);
      } catch (error) {
        console.error("App.tsx: Error fetching resume data", error);
      } finally {
        clearTimeout(timeout);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!data) return <div className="error-screen">Error loading data. Make sure backend is running!</div>;

  return (
    <>
      <Experience />
      <div className="app">
        <Navbar />
        <Hero name={data.name} tagline={data.tagline} />
        <main>
          <About about={data.about} />
          <Skills skills={data.skills} />
          <Projects projects={data.projects} />
          <section id="contact" className="container">
            <h2 className="section-title">Get In Touch</h2>
            <div className="glass-card contact-card">
              <p>I'm always open to new opportunities and collaborations.</p>
              <div className="contact-links">
                <a href={`mailto:${data.contact.email}`} className="btn btn-primary">Email Me</a>
                <div className="social-links">
                  <a href={`https://${data.contact.github}`} target="_blank">GitHub</a>
                  <a href={`https://${data.contact.linkedin}`} target="_blank">LinkedIn</a>
                </div>
              </div>
            </div>
          </section>
        </main>
        <ChatWidget />
        <footer className="footer">
          <p>© {new Date().getFullYear()} {data.name}. Built with React & FastAPI.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
