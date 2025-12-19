import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

const ToyModel3D = ({ position = [0, 0, 0], scale = 1, color = '#ff6b6b' }) => {
    const meshRef = useRef();

    // Animate rotation
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
        >
            <mesh ref={meshRef} position={position} scale={scale}>
                {/* Simple toy block shape */}
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.3}
                    metalness={0.6}
                />
            </mesh>
        </Float>
    );
};

// Teddy Bear Shape (simplified)
export const TeddyBear = ({ position = [0, 0, 0], scale = 1 }) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <group ref={groupRef} position={position} scale={scale}>
                {/* Body */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.6, 32, 32]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.8} />
                </mesh>

                {/* Head */}
                <mesh position={[0, 0.8, 0]}>
                    <sphereGeometry args={[0.4, 32, 32]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.8} />
                </mesh>

                {/* Ears */}
                <mesh position={[-0.3, 1.1, 0]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.8} />
                </mesh>
                <mesh position={[0.3, 1.1, 0]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.8} />
                </mesh>

                {/* Arms */}
                <mesh position={[-0.6, 0.2, 0]}>
                    <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.8} />
                </mesh>
                <mesh position={[0.6, 0.2, 0]}>
                    <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.8} />
                </mesh>
            </group>
        </Float>
    );
};

// Building Block
export const BuildingBlock = ({ position = [0, 0, 0], scale = 1, color = '#ff6b6b' }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <boxGeometry args={[1, 0.6, 0.5]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.4}
                    metalness={0.3}
                />
            </mesh>
        </Float>
    );
};

// Ball
export const Ball = ({ position = [0, 0, 0], scale = 1, color = '#4ecdc4' }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial
                color={color}
                roughness={0.2}
                metalness={0.8}
            />
        </mesh>
    );
};

export default ToyModel3D;
