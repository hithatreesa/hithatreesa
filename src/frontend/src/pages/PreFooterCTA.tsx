import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import { useState } from "react";
import { toast } from "sonner";
import type * as THREE from "three";

/* ─── Background 3D ─── */
function CTAParticles() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={60} depth={30} count={600} factor={2} fade speed={0.3} />
    </group>
  );
}

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "hello@terait.in" },
  { icon: Phone, label: "Phone", value: "+91 80 4567 8900" },
  { icon: MapPin, label: "Office", value: "Bangalore, Karnataka, India" },
];

export default function PreFooterCTA() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !company) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you! Our team will reach out within 24 hours.");
    setEmail("");
    setCompany("");
  };

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="relative py-28 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 100%, oklch(0.72 0.22 185 / 0.08) 0%, transparent 60%), oklch(0.13 0.022 265)",
      }}
    >
      {/* 3D stars bg */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: false, alpha: true }}
        >
          <CTAParticles />
        </Canvas>
      </div>

      {/* Glowing line top */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: CTA copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 text-xs font-body font-medium text-primary tracking-widest uppercase mb-6">
                <span className="w-1 h-1 rounded-full bg-primary animate-pulse-glow" />
                Get Started Today
              </span>

              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Ready to Transform{" "}
                <span className="gradient-text-primary">Your IT?</span>
              </h2>

              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                Join hundreds of enterprises across India who trust Terait
                Technologies to manage their critical IT infrastructure. Request
                a free consultation and let our experts design the perfect
                solution for your business.
              </p>

              {/* Contact info */}
              <div className="space-y-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-body text-xs text-muted-foreground">
                        {label}
                      </div>
                      <div className="font-body text-sm font-medium text-foreground">
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="glass rounded-2xl p-8 border border-primary/10">
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  Request a Consultation
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  Free, no-obligation discovery call with our enterprise team.
                </p>

                {submitted ? (
                  <div
                    data-ocid="contact.success_state"
                    className="text-center py-8"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4 glow-primary">
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                    <p className="font-display font-semibold text-foreground text-lg mb-1">
                      We'll be in touch!
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      Expect a response within 24 business hours.
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 text-primary"
                      onClick={() => setSubmitted(false)}
                    >
                      Submit another request
                    </Button>
                  </div>
                ) : (
                  <form
                    data-ocid="contact.form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-company"
                        className="font-body text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        Company Name
                      </label>
                      <Input
                        id="contact-company"
                        data-ocid="contact.company_input"
                        placeholder="Acme Corporation"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="bg-muted/30 border-border/60 focus:border-primary/50 font-body"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-email"
                        className="font-body text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        Business Email
                      </label>
                      <Input
                        id="contact-email"
                        data-ocid="contact.email_input"
                        type="email"
                        placeholder="cto@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-muted/30 border-border/60 focus:border-primary/50 font-body"
                      />
                    </div>
                    <Button
                      data-ocid="contact.submit_button"
                      type="submit"
                      size="lg"
                      className="w-full bg-primary text-primary-foreground glow-primary hover:bg-primary/90 font-display font-semibold transition-smooth"
                    >
                      Request Free Consultation
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <p className="font-body text-xs text-muted-foreground text-center">
                      No spam, ever. We respect your privacy.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
