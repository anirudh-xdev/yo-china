"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import type { Mesh } from "three";

function MomoShape({ position }: { position: [number, number, number] }) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.25;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
      <Sphere ref={ref} args={[0.55, 32, 32]} position={position}>
        <MeshDistortMaterial
          color="#f5d78e"
          roughness={0.25}
          metalness={0.15}
          distort={0.2}
          speed={1.2}
        />
      </Sphere>
    </Float>
  );
}

function NoodleRing() {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.12;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={ref} position={[1.1, -0.2, -0.4]}>
        <torusGeometry args={[0.65, 0.07, 16, 48]} />
        <meshStandardMaterial color="#b91c3c" roughness={0.35} metalness={0.2} />
      </mesh>
    </Float>
  );
}

function SteamParticle({ position }: { position: [number, number, number] }) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.12;
    ref.current.scale.setScalar(0.07 + Math.sin(t * 2) * 0.015);
  });

  return (
    <Sphere ref={ref} args={[1, 8, 8]} position={position}>
      <meshBasicMaterial color="#faf7f2" transparent opacity={0.35} />
    </Sphere>
  );
}

function Scene() {
  const steamPositions = useMemo(
    () =>
      [
        [-0.7, 0.85, 0],
        [-0.4, 1.05, 0.15],
        [-0.1, 0.8, -0.05],
      ] as [number, number, number][],
    []
  );

  return (
    <>
      <color attach="background" args={["#fffdfb"]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 4, 2]} intensity={1} color="#fff8ee" />
      <pointLight position={[-2, 1, 2]} intensity={0.45} color="#fce8e4" />
      <MomoShape position={[-0.25, 0, 0]} />
      <NoodleRing />
      {steamPositions.map((pos, i) => (
        <SteamParticle key={i} position={pos} />
      ))}
    </>
  );
}

export function Hero3D() {
  return (
    <div className="h-full w-full" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
