import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, ProjectData } from "../data/projectData";
import './projectDetail.css';

const ProjectDetail = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<ProjectData | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (projectId) {
            const projectData = getProjectById(projectId);
            if (projectData) {
                setProject(projectData);
                setTimeout(() => setIsVisible(true), 100);
            } else {
                navigate('/');
            }
        }
    }, [projectId, navigate]);

    if (!project) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="project-detail-container">
            {/* Floating particles */}
            <div className="particles-container">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${10 + Math.random() * 20}s`
                        }}
                    />
                ))}
            </div>

            {/* Back button */}
            <button onClick={() => navigate('/')} className="back-button">
                <span className="back-arrow">←</span> Back to Home
            </button>

            {/* Hero Section */}
            <section className={`project-hero ${isVisible ? 'visible' : ''}`}>
                <div className="project-hero-bg">
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                </div>
                <div className="project-hero-content">
                    <div className={`project-hero-emoji ${project.emojiClass}`}>
                        {project.emoji}
                    </div>
                    <h1 className="project-hero-title">{project.title}</h1>
                    <p className="project-hero-tech">{project.tech}</p>
                    <p className="project-hero-desc">{project.desc}</p>
                </div>
            </section>

            {/* Overview Section */}
            <section className={`project-section ${isVisible ? 'visible' : ''}`}>
                <div className="section-content">
                    <h2 className="section-title">
                        <span className="section-icon">📋</span>
                        Project Overview
                    </h2>
                    <div className="overview-card">
                        <p className="overview-text">{project.overview}</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={`project-section ${isVisible ? 'visible' : ''}`}>
                <div className="section-content">
                    <h2 className="section-title">
                        <span className="section-icon">✨</span>
                        Key Features
                    </h2>
                    <div className="features-grid">
                        {project.features.map((feature, idx) => (
                            <div key={idx} className="feature-card">
                                <div className="feature-number">{idx + 1}</div>
                                <p className="feature-text">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Challenges Section */}
            <section className={`project-section ${isVisible ? 'visible' : ''}`}>
                <div className="section-content">
                    <h2 className="section-title">
                        <span className="section-icon">🎯</span>
                        Technical Challenges & Solutions
                    </h2>
                    <div className="challenges-container">
                        {project.challenges.map((challenge, idx) => (
                            <div key={idx} className="challenge-card">
                                <div className="challenge-header">
                                    <span className="challenge-label">Challenge {idx + 1}</span>
                                </div>
                                <div className="challenge-content">
                                    <div className="challenge-problem">
                                        <h4>🔴 Problem</h4>
                                        <p>{challenge.problem}</p>
                                    </div>
                                    <div className="challenge-arrow">→</div>
                                    <div className="challenge-solution">
                                        <h4>🟢 Solution</h4>
                                        <p>{challenge.solution}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className={`project-section ${isVisible ? 'visible' : ''}`}>
                <div className="section-content">
                    <h2 className="section-title">
                        <span className="section-icon">🚀</span>
                        Results & Impact
                    </h2>
                    <div className="results-grid">
                        {project.results.map((result, idx) => (
                            <div key={idx} className="result-card">
                                <div className="result-icon">✓</div>
                                <p className="result-text">{result}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Links Section (if applicable) */}
            {project.links && project.links.length > 0 && (
                <section className={`project-section ${isVisible ? 'visible' : ''}`}>
                    <div className="section-content">
                        <h2 className="section-title">
                            <span className="section-icon">🔗</span>
                            Project Links
                        </h2>
                        <div className="links-container">
                            {project.links.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-link"
                                >
                                    {link.label} →
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer CTA */}
            <section className={`project-footer ${isVisible ? 'visible' : ''}`}>
                <div className="footer-cta-content">
                    <h3>Want to see more?</h3>
                    <button onClick={() => navigate('/')} className="footer-cta-button">
                        Explore Other Projects
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetail;
