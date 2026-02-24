import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import Floor from './Floor';
import Station from './stations/Station';

const Rig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const groupRef = React.useRef<THREE.Group>(null);
    useFrame((state) => {
        if (groupRef.current) {
            // Subtle rotation parallax on the scene group
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.mouse.x * Math.PI) / 30, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (state.mouse.y * Math.PI) / 30, 0.05);
        }
    });
    return <group ref={groupRef}>{children}</group>;
};

const ScrollCamera: React.FC = () => {
    useFrame((state) => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

        // Dynamic camera positioning based on scroll
        // Dynamic camera positioning based on scroll: Move FROM deep space TO focal point
        // 28 is the initial wide view. We move closer (to ~5) as we scroll down.
        const targetZ = 28 - scrollPercent * 23;
        const targetY = 8 - scrollPercent * 4;

        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
        state.camera.lookAt(0, 0, 0);
    });
    return null;
};

const Experience: React.FC = () => {
    console.log("Experience.tsx: rendering Experience component");
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        console.log("Experience.tsx: mounting...");
        const handleScroll = () => {
            const sections = ['about', 'skills', 'projects', 'contact'];
            const scrollPos = window.scrollY + window.innerHeight / 2;

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

    const scrollToSection = (id: string) => {
        console.log(`Experience.tsx: scrollToSection called for ${id}`);
        const element = id === 'home' ? document.body : document.getElementById(id);
        if (element) {
            console.log(`Experience.tsx: Found element for ${id}, scrolling...`);
            // Standard scrollIntoView
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Fallback for immediate scroll if smooth fails or to ensure progress
            setTimeout(() => {
                if (window.scrollY === 0 && id !== 'home') {
                    console.warn(`Experience.tsx: Scroll might have failed, trying absolute position scroll`);
                    window.scrollTo({
                        top: element.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        } else {
            console.error(`Experience.tsx: Could not find element with id ${id}`);
        }
    };

    return (
        <div className="experience-container">
            <Canvas
                shadows
                camera={{ position: [0, 8, 28], fov: 45 }}
                gl={{ antialias: true, alpha: true, stencil: false, depth: true }}
                dpr={[1, 2]}
                style={{ pointerEvents: 'auto' }}
                onCreated={() => console.log("Experience.tsx: Canvas created")}
            >
                <ScrollCamera />
                <OrbitControls
                    enableDamping
                    dampingFactor={0.05}
                    maxPolarAngle={Math.PI / 2.1}
                    minPolarAngle={Math.PI / 6}
                    minDistance={2}
                    maxDistance={150}
                    enableZoom={false} // Disable manual zoom to unify with scroll
                    enablePan={false}
                    makeDefault
                />

                <Suspense fallback={null}>
                    {/* Simplified Lights - removed Environment to rule out remote hangs */}
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    <Rig>
                        <Floor />

                        {/* Section Stations */}
                        <Station
                            position={[0, 0, 0]}
                            title="Home"
                            color="#3b82f6"
                            active={activeSection === 'home'}
                            onClick={() => scrollToSection('home')}
                        />
                        <Station
                            position={[18, 0, -5]}
                            title="About"
                            color="#10b981"
                            active={activeSection === 'about'}
                            onClick={() => scrollToSection('about')}
                        />
                        <Station
                            position={[-18, 0, -5]}
                            title="Skills"
                            color="#8b5cf6"
                            active={activeSection === 'skills'}
                            onClick={() => scrollToSection('skills')}
                        />
                        <Station
                            position={[0, 0, -30]}
                            title="Projects"
                            color="#f59e0b"
                            active={activeSection === 'projects'}
                            onClick={() => scrollToSection('projects')}
                        />
                        <Station
                            position={[0, 0, 18]}
                            title="Contact"
                            color="#ef4444"
                            active={activeSection === 'contact'}
                            onClick={() => scrollToSection('contact')}
                        />
                    </Rig>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Experience;
