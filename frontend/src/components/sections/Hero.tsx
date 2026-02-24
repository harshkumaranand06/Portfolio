import React from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronDown } from 'lucide-react';
import './Hero.css';

interface HeroProps {
    name: string;
    tagline: string;
}

const Hero: React.FC<HeroProps> = ({ name, tagline }) => {
    return (
        <section id="home" className="hero">
            <div className="container hero-content">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Hi, I'm <span className="highlight">{name}</span>
                    </motion.h1>
                    <motion.p
                        className="hero-tagline"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        {tagline}
                    </motion.p>

                    <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <a href="#projects" className="btn btn-primary btn-lg">Explore Projects</a>
                        <a href="#about" className="btn btn-outline btn-lg">Learn More</a>
                    </motion.div>

                    <motion.p
                        className="interaction-hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ delay: 1.5, duration: 4, repeat: Infinity }}
                    >
                        Drag to explore the 3D universe or scroll to dive in
                    </motion.p>
                </motion.div>
            </div>

            <motion.div
                className="scroll-indicator"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="mouse-icon">
                    <div className="wheel" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
