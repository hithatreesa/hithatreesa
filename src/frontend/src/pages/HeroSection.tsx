import { Button } from "@/components/ui/button";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";
import { MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ArrowRight, ChevronDown, Cloud, Monitor, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─── 3D Scene Components ─── */

function FloatingCrystal({
  position,
  scale,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const baseY = position[1];

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.position.y =
      baseY + Math.sin(clock.elapsedTime * speed * 0.8) * 0.3;
    mesh.current.rotation.x += 0.004 * speed;
    mesh.current.rotation.y += 0.006 * speed;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale} castShadow>
      <octahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.6}
        roughness={0.1}
        transmission={0.5}
        thickness={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function GlowOrb({
  position,
  color,
}: { position: [number, number, number]; color: string }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;
    mesh.current.position.x = position[0] + Math.sin(t * 0.5) * 0.5;
    mesh.current.position.y = position[1] + Math.cos(t * 0.4) * 0.4;
  });

  return (
    <Sphere
      ref={mesh as React.Ref<THREE.Mesh>}
      args={[0.6, 32, 32]}
      position={position}
    >
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        distort={0.45}
        speed={2}
        transparent
        opacity={0.7}
      />
    </Sphere>
  );
}

function NetworkMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  useEffect(() => {
    if (!linesRef.current) return;
    const points: THREE.Vector3[] = [];
    const nodeCount = 12;
    const nodes = Array.from(
      { length: nodeCount },
      () =>
        new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2,
        ),
    );
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 3) {
          points.push(nodes[i], nodes[j]);
        }
      }
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    linesRef.current.geometry = geo;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments ref={linesRef as React.Ref<THREE.LineSegments>}>
        <bufferGeometry />
        <lineBasicMaterial color="#00e5ff" transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}

function CameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (mouseY * -0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function HeroCanvas({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={60} color="#00e5ff" />
      <pointLight position={[-5, -3, 3]} intensity={40} color="#a855f7" />
      <pointLight position={[0, 8, -4]} intensity={30} color="#ffffff" />

      <Stars radius={80} depth={40} count={1200} factor={3} fade speed={0.5} />
      <NetworkMesh />

      <FloatingCrystal
        position={[-3.5, 1.5, 0]}
        scale={0.55}
        color="#00e5ff"
        speed={0.9}
      />
      <FloatingCrystal
        position={[3.8, 0.8, -1]}
        scale={0.65}
        color="#a855f7"
        speed={1.1}
      />
      <FloatingCrystal
        position={[-2.5, -1.8, 1]}
        scale={0.4}
        color="#00e5ff"
        speed={0.7}
      />
      <FloatingCrystal
        position={[2.2, -1.2, 0.5]}
        scale={0.45}
        color="#7c3aed"
        speed={1.3}
      />
      <FloatingCrystal
        position={[0.5, 2.8, -2]}
        scale={0.35}
        color="#00bcd4"
        speed={0.8}
      />
      <FloatingCrystal
        position={[-4.2, -0.5, -1]}
        scale={0.5}
        color="#8b5cf6"
        speed={1.0}
      />

      <GlowOrb position={[-1.5, 0.5, 1]} color="#00e5ff" />
      <GlowOrb position={[2.5, 1, -1]} color="#a855f7" />

      <CameraRig mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  );
}

/* ─── Stat chip ─── */
const STATS = [
  { icon: Monitor, label: "Uptime SLA", value: "99.9%" },
  { icon: Shield, label: "Security Incidents Resolved", value: "10,000+" },
  { icon: Cloud, label: "Cloud Migrations", value: "500+" },
];

/* ─── Hero Section ─── */
export default function HeroSection() {
  const { x: mouseX, y: mouseY } = useMouseParallax(1);

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-gradient"
    >
      {/* 3D Canvas — full bleed background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <HeroCanvas mouseX={mouseX} mouseY={mouseY} />
      </div>

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      <div
        className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, transparent 30%, oklch(0.13 0.022 265 / 0.5) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-24 pb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/25 text-xs font-body font-medium text-primary tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          Enterprise IT Managed Services · Bangalore
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
        >
          Enterprise IT{" "}
          <span className="gradient-text-primary">Managed Services.</span>
          <br />
          <span className="text-foreground">Redefined.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-10"
        >
          Terait Technologies delivers seamless infrastructure management,
          robust cybersecurity, and scalable cloud solutions for modern
          enterprises across India.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button
            data-ocid="hero.explore_button"
            size="lg"
            onClick={() =>
              document
                .querySelector("#services")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-primary text-primary-foreground glow-primary hover:bg-primary/90 font-display font-semibold text-base px-8 py-6 transition-smooth"
          >
            Explore Our Solutions
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            data-ocid="hero.case_studies_button"
            size="lg"
            variant="outline"
            onClick={() =>
              document
                .querySelector("#showcase")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border-border/60 text-foreground hover:bg-muted/30 font-display font-semibold text-base px-8 py-6 transition-smooth"
          >
            View Case Studies
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {STATS.map(({ icon: Icon, label, value }, i) => (
            <div
              key={label}
              data-ocid={`hero.stat.${i + 1}`}
              className="glass rounded-xl px-6 py-4 flex items-center gap-3 min-w-[180px]"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-display font-bold text-xl text-foreground leading-none">
                  {value}
                </div>
                <div className="font-body text-xs text-muted-foreground mt-0.5">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-muted-foreground"
      >
        <span className="text-xs tracking-widest uppercase font-body">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
