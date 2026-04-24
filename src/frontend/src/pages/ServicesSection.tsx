import { Float, MeshWobbleMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Cloud,
  Cpu,
  HeadphonesIcon,
  Lock,
  Network,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import type * as THREE from "three";

/* ─── 3D accent for services ─── */
function ServiceOrb({ color, index }: { color: string; index: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = clock.elapsedTime * 0.3 + index;
    mesh.current.rotation.y = clock.elapsedTime * 0.4 + index * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={mesh} scale={0.55}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshWobbleMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.1}
          factor={0.3}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

function Monitor2(props: React.SVGProps<SVGSVGElement>) {
  return <Cpu {...props} />;
}

/* ─── Service data ─── */
const SERVICES = [
  {
    icon: Monitor2,
    threeDColor: "#00e5ff",
    title: "Managed IT Services",
    desc: "Proactive monitoring, maintenance, and support for your entire IT infrastructure — 24/7/365.",
    features: ["Remote monitoring", "Helpdesk support", "Patch management"],
    accent: "primary",
  },
  {
    icon: Shield,
    threeDColor: "#a855f7",
    title: "Cybersecurity & Compliance",
    desc: "Comprehensive security strategies to protect data and ensure regulatory compliance across frameworks.",
    features: [
      "Threat detection",
      "ISO 27001 compliance",
      "Penetration testing",
    ],
    accent: "accent",
  },
  {
    icon: Cloud,
    threeDColor: "#00bcd4",
    title: "Cloud Solutions",
    desc: "Expert cloud migration, management, and optimization for agility, scalability, and cost efficiency.",
    features: ["Azure / AWS / GCP", "Cloud migration", "Cost optimization"],
    accent: "primary",
  },
  {
    icon: Network,
    threeDColor: "#7c3aed",
    title: "Network Infrastructure",
    desc: "Design and deployment of resilient enterprise networks — WAN, LAN, SD-WAN and zero-trust networking.",
    features: ["SD-WAN deployment", "Network security", "NOC services"],
    accent: "accent",
  },
  {
    icon: Cpu,
    threeDColor: "#00e5ff",
    title: "Data Center Services",
    desc: "End-to-end data center management — from hardware procurement to virtualization and DR planning.",
    features: ["Virtualization", "Disaster recovery", "Colocation support"],
    accent: "primary",
  },
  {
    icon: HeadphonesIcon,
    threeDColor: "#a855f7",
    title: "IT Consulting & Strategy",
    desc: "Align technology investments with business goals through expert advisory and digital transformation roadmaps.",
    features: ["IT roadmapping", "Digital transformation", "Vendor management"],
    accent: "accent",
  },
] as const;

/* ─── Service Card ─── */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const Icon = service.icon;
  const isPrimary = service.accent === "primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      data-ocid={`services.card.${index + 1}`}
      className="relative group rounded-2xl border border-border/50 bg-card card-hover overflow-hidden"
    >
      {/* Top accent line */}
      <div
        className={`absolute top-0 left-6 right-6 h-px ${
          isPrimary
            ? "bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            : "bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        }`}
      />

      {/* 3D mini canvas */}
      <div className="absolute top-4 right-4 w-16 h-16 opacity-80">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <pointLight
            position={[2, 2, 2]}
            intensity={20}
            color={service.threeDColor}
          />
          <ServiceOrb color={service.threeDColor} index={index} />
        </Canvas>
      </div>

      <div className="p-7 pt-8">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
            isPrimary
              ? "bg-primary/15 border border-primary/25"
              : "bg-accent/15 border border-accent/25"
          }`}
        >
          <Icon
            className={`w-5 h-5 ${isPrimary ? "text-primary" : "text-accent"}`}
          />
        </div>

        <h3 className="font-display font-bold text-xl text-foreground mb-3 leading-tight">
          {service.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
          {service.desc}
        </p>

        <ul className="space-y-2">
          {service.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-2 text-xs font-body text-muted-foreground"
            >
              <span
                className={`w-1 h-1 rounded-full flex-shrink-0 ${
                  isPrimary ? "bg-primary" : "bg-accent"
                }`}
              />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom bar on hover */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
          isPrimary
            ? "bg-gradient-to-r from-primary/80 to-primary/20"
            : "bg-gradient-to-r from-accent/80 to-accent/20"
        }`}
      />
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      data-ocid="services.section"
      className="relative py-28 bg-background overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.95 0.008 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.95 0.008 265) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 text-xs font-body font-medium text-primary tracking-widest uppercase mb-4">
            <span className="w-1 h-1 rounded-full bg-primary" />
            What We Offer
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Core <span className="gradient-text-primary">Services</span>
          </h2>
          <p className="max-w-xl mx-auto font-body text-muted-foreground text-base leading-relaxed">
            Choosing Terait Technologies means partnering with experts who
            deliver measurable outcomes, guaranteed uptime, and enterprise-grade
            security.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          data-ocid="services.list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>

      <div className="section-divider mt-28" />
    </section>
  );
}
