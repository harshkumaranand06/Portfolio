import React, { useMemo } from 'react';
import { Text, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StationProps {
    position: [number, number, number];
    title: string;
    color: string;
    active?: boolean;
    onClick?: () => void;
}

const Station: React.FC<StationProps> = ({ position, title, color, active, onClick }) => {
    const meshRef = React.useRef<THREE.Mesh>(null);
    const ringRef = React.useRef<THREE.Mesh>(null);
    const glowRef = React.useRef<THREE.Mesh>(null);

    const handleInteraction = (e: any) => {
        console.log(`Station.tsx: Clicked on ${title}`);
        e.stopPropagation();
        if (onClick) {
            console.log(`Station.tsx: Calling onClick for ${title}`);
            onClick();
        } else {
            console.warn(`Station.tsx: No onClick handler for ${title}`);
        }
    };

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = time * 0.5;
            meshRef.current.position.y = Math.sin(time) * 0.1;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z = -time * 0.8;
            ringRef.current.rotation.x = time * 0.3;
        }
        if (glowRef.current) {
            glowRef.current.scale.setScalar(active ? 1.5 + Math.sin(time * 3) * 0.2 : 1);
        }
    });

    return (
        <group position={position} onClick={handleInteraction}>
            {/* Invisible large hit-box for easier clicking */}
            <mesh
                onClick={handleInteraction}
                onPointerOver={() => (document.body.style.cursor = 'pointer')}
                onPointerOut={() => (document.body.style.cursor = 'auto')}
            >
                <sphereGeometry args={[2.5, 16, 16]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Central Diamond/Core */}
                <mesh ref={meshRef}>
                    <octahedronGeometry args={[1.4, 0]} />
                    <meshStandardMaterial
                        color={color}
                        metalness={1}
                        roughness={0.1}
                        emissive={color}
                        emissiveIntensity={active ? 2 : 0.5}
                    />
                </mesh>

                {/* Rotating Outer Ring */}
                <mesh ref={ringRef}>
                    <torusGeometry args={[2.0, 0.05, 16, 100]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.6} />
                </mesh>

                <Text
                    position={[0, 2.5, 0]}
                    fontSize={0.8}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    font={undefined} // Use default font to rule out loading hangs
                >
                    {title}
                </Text>
            </Float>

            {/* Selection/Floor Glow */}
            <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} ref={glowRef}>
                <ringGeometry args={[0, 3, 32]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={active ? 0.4 : 0.1}
                />
            </mesh>
        </group>
    );
};

export default Station;
