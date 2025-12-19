import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { TeddyBear, BuildingBlock, Ball } from './ToyModel3D';

const HeroScene = () => {
    return (
        <div className="w-full h-[500px] md:h-[600px]">
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 2, 8]} />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 2}
                    autoRotate
                    autoRotateSpeed={0.5}
                />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
                <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ff6b6b" />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#4ecdc4" />

                {/* Environment */}
                <Environment preset="sunset" />

                {/* 3D Models */}
                <TeddyBear position={[0, 0, 0]} scale={1.5} />
                <BuildingBlock position={[-3, 0, -1]} scale={1.2} color="#ff6b6b" />
                <BuildingBlock position={[3, 0.5, -1]} scale={1} color="#4ecdc4" />
                <Ball position={[-2, 2, 1]} scale={0.8} color="#ffd93d" />
                <Ball position={[2.5, 1.5, 1]} scale={0.6} color="#6bcf7f" />

                {/* Ground */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial color="#f0f0f0" roughness={0.8} />
                </mesh>
            </Canvas>
        </div>
    );
};

export default HeroScene;
