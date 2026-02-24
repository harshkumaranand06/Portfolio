import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            const sections = ['about', 'skills', 'projects', 'contact'];
            const scrollPos = window.scrollY + 100;

            let current = 'home';
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && scrollPos >= element.offsetTop) {
                    current = section;
                }
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        setIsDark(!isDark);
    };

    const scrollToSection = (e: React.MouseEvent, id: string) => {
        console.log(`Navbar.tsx: Nav link clicked for ${id}`);
        e.preventDefault();
        const element = id === 'home' ? document.body : document.getElementById(id);
        if (element) {
            console.log(`Navbar.tsx: Element found for ${id}, scrolling...`);
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error(`Navbar.tsx: Element NOT found for ${id}`);
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container nav-content">
                <a href="#" className="nav-logo" onClick={(e) => scrollToSection(e, 'home')}>PORTFOLIO</a>

                <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'about')}>About</a>
                    <a href="#skills" className={activeSection === 'skills' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'skills')}>Skills</a>
                    <a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'projects')}>Projects</a>
                    <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
                    <button className="theme-toggle" onClick={toggleTheme}>
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                <div className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
