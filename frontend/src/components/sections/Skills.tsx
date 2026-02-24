import React from 'react';
import { motion } from 'framer-motion';
import { Skill as SkillType } from '../../types';
import './Skills.css';

interface SkillsProps {
    skills: SkillType[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
    return (
        <section id="skills" className="container">
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-grid">
                {skills.map((skillGroup, index) => (
                    <motion.div
                        key={index}
                        className="glass-card skill-group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <h3>{skillGroup.category}</h3>
                        <div className="skill-tags">
                            {skillGroup.items.map((skill, sIndex) => (
                                <span key={sIndex} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
