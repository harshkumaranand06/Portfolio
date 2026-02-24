import React from 'react';
import { motion } from 'framer-motion';

interface AboutProps {
    about: string;
}

const About: React.FC<AboutProps> = ({ about }) => {
    return (
        <section id="about" className="container">
            <h2 className="section-title">About Me</h2>
            <div className="about-content">
                <motion.div
                    className="glass-card about-card"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p>{about}</p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
