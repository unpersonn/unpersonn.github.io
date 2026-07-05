"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const particleCount = 4000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorObj = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const randColor = Math.random();
      if (randColor > 0.6) colorObj.setHex(0x38bdf8);
      else if (randColor > 0.2) colorObj.setHex(0x8b5cf6);
      else colorObj.setHex(0xfbbf24);

      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += 0.05 * delta;
      ref.current.rotation.y += 0.08 * delta;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial 
        transparent 
        vertexColors 
        size={0.06} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.8} 
      />
    </Points>
  );
}

function CameraController() {
  const { camera } = useThree();
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = (e.clientX - window.innerWidth / 2) * 0.005;
      targetMouse.current.y = (e.clientY - window.innerHeight / 2) * 0.005;
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame(() => {
    currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.05;
    currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.05;
    
    camera.position.x += (currentMouse.current.x - camera.position.x) * 0.05;
    camera.position.y += (-currentMouse.current.y - camera.position.y) * 0.05;

    // Fly through Z space on scroll
    const targetZ = 10 - (scrollY.current * 0.015); 
    camera.position.z += (targetZ - camera.position.z) * 0.08;
  });

  return null;
}

export default function BackgroundScene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-transparent pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <fog attach="fog" args={['#000000', 5, 30]} />
        <ParticleSwarm />
        <CameraController />
      </Canvas>
    </div>
  );
}
