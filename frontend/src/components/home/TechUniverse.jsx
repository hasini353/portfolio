import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Html, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';

const TechNode = ({ position, label, color }) => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} wireframe />
        <Html distanceFactor={15} center>
          <div className="text-white font-mono text-sm font-bold bg-black/50 px-2 py-1 rounded border border-white/20 whitespace-nowrap">
            {label}
          </div>
        </Html>
      </mesh>
    </Float>
  );
};

const AICore = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#e10505"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#f50404"
          emissiveIntensity={2}
        />
        <Html distanceFactor={15} center>
          <div className="text-white font-black font-mono text-xl tracking-widest drop-shadow-[0_0_10px_rgba(255,30,30,0.8)]">
            TECH UNIVERSE
          </div>
        </Html>
      </Sphere>
      {/* Outer rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4, 0.05, 16, 100]} />
        <meshStandardMaterial color="#FF1E1E" emissive="#FF1E1E" emissiveIntensity={0.5} wireframe />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <torusGeometry args={[6, 0.05, 16, 100]} />
        <meshStandardMaterial color="#D90429" emissive="#D90429" emissiveIntensity={0.2} wireframe />
      </mesh>
    </Float>
  );
};

const TechUniverse = () => {
  return (
    <section id="tech-universe" className="h-screen bg-[#050505] relative z-10 border-t border-white/5 overflow-hidden">
      
      {/* Overlay Title */}
      <div className="absolute top-24 left-0 w-full z-20 pointer-events-none px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-[2px] bg-[#FF1E1E]" />
            <h2 className="text-sm font-mono text-[#FF1E1E] tracking-[0.3em] uppercase font-bold">
              Tech Universe
            </h2>
            <div className="w-12 h-[2px] bg-[#FF1E1E]" />
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-md">
            Interactive Ecosystem
          </h3>
        </motion.div>
      </div>

      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#FF1E1E" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#D90429" />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <AICore />

        {/* Orbiting Tech Nodes */}
        <group>
          <TechNode position={[7, 2, -2]} label="Java" color="#FF1E1E" />
          <TechNode position={[-6, -3, 2]} label="AWS" color="#FF9900" />
          <TechNode position={[0, 6, -4]} label="React" color="#61DAFB" />
          <TechNode position={[-5, 4, 3]} label="Node.js" color="#339933" />
          <TechNode position={[4, -5, 4]} label="Python" color="#3776AB" />
          <TechNode position={[0, -7, -3]} label="C++" color="#00599C" />
          <TechNode position={[0, -7, -3]} label="MangoDB" color="#075212" />

        </group>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>
      
      {/* Scroll indicator overlay */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-50 flex flex-col items-center">
        <span className="text-[10px] font-mono text-white tracking-widest uppercase mb-2">Drag to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};

export default TechUniverse;
