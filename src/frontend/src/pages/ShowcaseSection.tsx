import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  OrbitControls,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import type * as THREE from "three";

/* ─── Static orbit node positions ─── */
const ORBIT_NODES = Array.from({ length: 8 }, (_, i) => {
  const angle = (i / 8) * Math.PI * 2;
  const r = 1.9;
  return {
    id: `orbit-${i}`,
    position: [Math.cos(angle) * r, 0, Math.sin(angle) * r] as [
      number,
      number,
      number,
    ],
  };
});

/* ─── 3D Showcase Sculpture ─── */
function DataSphere() {
  const group = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.3;
      ring2Ref.current.rotation.z = -t * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={group}>
        {/* Core sphere */}
        <mesh>
          <sphereGeometry args={[1.2, 64, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.05}
            anisotropy={0.3}
            distortion={0.3}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#00e5ff"
            attenuationColor="#a855f7"
            attenuationDistance={2}
          />
        </mesh>

        {/* Outer ring */}
        <mesh
          ref={ringRef as React.Ref<THREE.Mesh>}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[1.9, 0.04, 16, 80]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Inner ring */}
        <mesh ref={ring2Ref as React.Ref<THREE.Mesh>} rotation={[0.8, 0.4, 0]}>
          <torusGeometry args={[1.6, 0.025, 12, 60]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.5}
            metalness={0.7}
            roughness={0.15}
          />
        </mesh>

        {/* Orbiting nodes */}
        {ORBIT_NODES.map(({ id, position }) => (
          <mesh key={id} position={position}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial
              color="#00e5ff"
              emissive="#00e5ff"
              emissiveIntensity={1}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

/* ─── Benefits list ─── */
const BENEFITS = [
  "24/7 proactive monitoring with sub-5-minute incident response",
  "Dedicated account management and strategic IT advisory",
  "100% transparent SLA reporting with real-time dashboards",
  "Seamless scalability from SMB to enterprise without re-platforming",
  "Certified engineers across Microsoft, AWS, Cisco, and VMware",
  "Headquartered in Bangalore with pan-India service delivery",
];

export default function ShowcaseSection() {
  return (
    <section
      id="about"
      data-ocid="showcase.section"
      className="relative py-28 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 0% 50%, oklch(0.65 0.24 295 / 0.06) 0%, transparent 60%), oklch(0.15 0.022 265)",
      }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.95 0.008 265) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: 3D visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            data-ocid="showcase.visual"
            className="relative h-[480px] lg:h-[560px]"
          >
            {/* Glow behind canvas */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/5" />
            <div className="absolute inset-4 rounded-2xl glow-primary opacity-20 blur-2xl" />

            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.4} />
              <pointLight position={[3, 4, 3]} intensity={80} color="#00e5ff" />
              <pointLight
                position={[-3, -2, 2]}
                intensity={50}
                color="#a855f7"
              />
              <spotLight
                position={[0, 6, 0]}
                intensity={60}
                color="#ffffff"
                angle={0.4}
                penumbra={0.5}
              />
              <Environment preset="night" />
              <DataSphere />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.4}
                maxPolarAngle={Math.PI * 0.65}
                minPolarAngle={Math.PI * 0.35}
              />
            </Canvas>

            {/* Floating stat badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute top-8 right-4 glass rounded-xl px-4 py-3 text-center"
            >
              <div className="font-display font-bold text-2xl text-primary">
                99.9%
              </div>
              <div className="font-body text-xs text-muted-foreground">
                Uptime SLA
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-12 left-4 glass rounded-xl px-4 py-3 text-center"
            >
              <div className="font-display font-bold text-2xl gradient-text-accent">
                15+
              </div>
              <div className="font-body text-xs text-muted-foreground">
                Years of Excellence
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/25 text-xs font-body font-medium text-accent tracking-widest uppercase mb-5">
              <span className="w-1 h-1 rounded-full bg-accent" />
              Why Terait Technologies
            </span>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Optimize. <span className="gradient-text-primary">Secure.</span>{" "}
              Scale.
            </h2>

            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              Choosing Terait Technologies means entrusting your infrastructure
              to a team that has managed thousands of enterprise environments.
              We bring deep domain expertise across cloud, security, and managed
              services.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              We enable you to focus on your core business while Terait manages
              and network-engineers your solutions — from in-engineering
              solution procurement to client evaluations, deployment, and
              optimization.
            </p>

            {/* Benefits */}
            <ul data-ocid="showcase.benefits_list" className="space-y-3">
              {BENEFITS.map((benefit, i) => (
                <motion.li
                  key={benefit.slice(0, 30)}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  data-ocid={`showcase.benefit.${i + 1}`}
                  className="flex items-start gap-3 text-sm font-body text-muted-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="section-divider mt-28" />
    </section>
  );
}
