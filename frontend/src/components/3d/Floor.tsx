import React from 'react';
import { MeshReflectorMaterial, Grid } from '@react-three/drei';

const Floor: React.FC = () => {
    return (
        <group position={[0, -0.01, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={2048}
                    mixBlur={1}
                    mixStrength={40}
                    roughness={1}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#101010"
                    metalness={0.5}
                    mirror={1}
                />
            </mesh>
            <Grid
                args={[100, 100]}
                sectionSize={5}
                sectionThickness={1.5}
                sectionColor="#202020"
                fadeDistance={50}
            />
        </group>
    );
};

export default Floor;
