import React from 'react';
import { ContactShadows, Environment } from '@react-three/drei';

const Lights: React.FC = () => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
            <Environment preset="city" />
            <ContactShadows
                opacity={0.4}
                scale={20}
                blur={2}
                far={4.5}
                resolution={256}
                color="#000000"
            />
        </>
    );
};

export default Lights;
