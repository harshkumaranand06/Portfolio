import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Project as ProjectType } from '../../types';
import './Projects.css';

interface ProjectsProps {
    projects: ProjectType[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    return (
        <section id="projects" className="container">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        className="glass-card project-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="project-info">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="tech-stack">
                                {project.tech_stack.map((tech, tIndex) => (
                                    <span key={tIndex} className="tech-item">{tech}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                                        <Github size={20} />
                                    </a>
                                )}
                                <a href="#"><ExternalLink size={20} /></a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
