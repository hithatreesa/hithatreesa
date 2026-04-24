import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./index-Dc2kdjSL.js";
import { u as useFrame, b as MeshStandardMaterial, C as Canvas } from "./react-three-fiber.esm-wCchHkT3.js";
import { m as motion } from "./proxy-BVFPtn7P.js";
import { S as Shield, C as Cloud } from "./shield-TgbHrLeg.js";
import { F as Float } from "./Float-DcuE9zfz.js";
import { _ as _extends } from "./extends-BwmuZ0dU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
];
const Cpu = createLucideIcon("cpu", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
      key: "1xhozi"
    }
  ]
];
const Headphones = createLucideIcon("headphones", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
];
const Network = createLucideIcon("network", __iconNode);
class WobbleMaterialImpl extends MeshStandardMaterial {
  constructor(parameters = {}) {
    super(parameters);
    this.setValues(parameters);
    this._time = {
      value: 0
    };
    this._factor = {
      value: 1
    };
  }
  // FIXME Use `THREE.WebGLProgramParametersWithUniforms` type when able to target @types/three@0.160.0
  onBeforeCompile(shader) {
    shader.uniforms.time = this._time;
    shader.uniforms.factor = this._factor;
    shader.vertexShader = `
      uniform float time;
      uniform float factor;
      ${shader.vertexShader}
    `;
    shader.vertexShader = shader.vertexShader.replace("#include <begin_vertex>", `float theta = sin( time + position.y ) / 2.0 * factor;
        float c = cos( theta );
        float s = sin( theta );
        mat3 m = mat3( c, 0, s, 0, 1, 0, -s, 0, c );
        vec3 transformed = vec3( position ) * m;
        vNormal = vNormal * m;`);
  }
  get time() {
    return this._time.value;
  }
  set time(v) {
    this._time.value = v;
  }
  get factor() {
    return this._factor.value;
  }
  set factor(v) {
    this._factor.value = v;
  }
}
const MeshWobbleMaterial = /* @__PURE__ */ reactExports.forwardRef(({
  speed = 1,
  ...props
}, ref) => {
  const [material] = reactExports.useState(() => new WobbleMaterialImpl());
  useFrame((state) => material && (material.time = state.clock.elapsedTime * speed));
  return /* @__PURE__ */ reactExports.createElement("primitive", _extends({
    object: material,
    ref,
    attach: "material"
  }, props));
});
function ServiceOrb({ color, index }) {
  const mesh = reactExports.useRef(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = clock.elapsedTime * 0.3 + index;
    mesh.current.rotation.y = clock.elapsedTime * 0.4 + index * 0.5;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Float, { speed: 2, rotationIntensity: 0.4, floatIntensity: 0.6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: mesh, scale: 0.55, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("icosahedronGeometry", { args: [1, 1] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MeshWobbleMaterial,
      {
        color,
        emissive: color,
        emissiveIntensity: 0.3,
        metalness: 0.7,
        roughness: 0.1,
        factor: 0.3,
        speed: 1.5
      }
    )
  ] }) });
}
function Monitor2(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { ...props });
}
const SERVICES = [
  {
    icon: Monitor2,
    threeDColor: "#00e5ff",
    title: "Managed IT Services",
    desc: "Proactive monitoring, maintenance, and support for your entire IT infrastructure — 24/7/365.",
    features: ["Remote monitoring", "Helpdesk support", "Patch management"],
    accent: "primary"
  },
  {
    icon: Shield,
    threeDColor: "#a855f7",
    title: "Cybersecurity & Compliance",
    desc: "Comprehensive security strategies to protect data and ensure regulatory compliance across frameworks.",
    features: [
      "Threat detection",
      "ISO 27001 compliance",
      "Penetration testing"
    ],
    accent: "accent"
  },
  {
    icon: Cloud,
    threeDColor: "#00bcd4",
    title: "Cloud Solutions",
    desc: "Expert cloud migration, management, and optimization for agility, scalability, and cost efficiency.",
    features: ["Azure / AWS / GCP", "Cloud migration", "Cost optimization"],
    accent: "primary"
  },
  {
    icon: Network,
    threeDColor: "#7c3aed",
    title: "Network Infrastructure",
    desc: "Design and deployment of resilient enterprise networks — WAN, LAN, SD-WAN and zero-trust networking.",
    features: ["SD-WAN deployment", "Network security", "NOC services"],
    accent: "accent"
  },
  {
    icon: Cpu,
    threeDColor: "#00e5ff",
    title: "Data Center Services",
    desc: "End-to-end data center management — from hardware procurement to virtualization and DR planning.",
    features: ["Virtualization", "Disaster recovery", "Colocation support"],
    accent: "primary"
  },
  {
    icon: Headphones,
    threeDColor: "#a855f7",
    title: "IT Consulting & Strategy",
    desc: "Align technology investments with business goals through expert advisory and digital transformation roadmaps.",
    features: ["IT roadmapping", "Digital transformation", "Vendor management"],
    accent: "accent"
  }
];
function ServiceCard({
  service,
  index
}) {
  const Icon = service.icon;
  const isPrimary = service.accent === "primary";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      },
      "data-ocid": `services.card.${index + 1}`,
      className: "relative group rounded-2xl border border-border/50 bg-card card-hover overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute top-0 left-6 right-6 h-px ${isPrimary ? "bg-gradient-to-r from-transparent via-primary/60 to-transparent" : "bg-gradient-to-r from-transparent via-accent/60 to-transparent"}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 w-16 h-16 opacity-80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Canvas,
          {
            camera: { position: [0, 0, 3], fov: 45 },
            gl: { antialias: true, alpha: true },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.5 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "pointLight",
                {
                  position: [2, 2, 2],
                  intensity: 20,
                  color: service.threeDColor
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceOrb, { color: service.threeDColor, index })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-7 pt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${isPrimary ? "bg-primary/15 border border-primary/25" : "bg-accent/15 border border-accent/25"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Icon,
                {
                  className: `w-5 h-5 ${isPrimary ? "text-primary" : "text-accent"}`
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-3 leading-tight", children: service.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed mb-5", children: service.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: service.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-center gap-2 text-xs font-body text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `w-1 h-1 rounded-full flex-shrink-0 ${isPrimary ? "bg-primary" : "bg-accent"}`
                  }
                ),
                f
              ]
            },
            f
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${isPrimary ? "bg-gradient-to-r from-primary/80 to-primary/20" : "bg-gradient-to-r from-accent/80 to-accent/20"}`
          }
        )
      ]
    }
  );
}
function ServicesSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "services",
      "data-ocid": "services.section",
      className: "relative py-28 bg-background overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-[0.03]",
            style: {
              backgroundImage: "linear-gradient(oklch(0.95 0.008 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.95 0.008 265) 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-80px" },
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              className: "text-center mb-16",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 text-xs font-body font-medium text-primary tracking-widest uppercase mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-primary" }),
                  "What We Offer"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-4", children: [
                  "Our Core ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-primary", children: "Services" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-xl mx-auto font-body text-muted-foreground text-base leading-relaxed", children: "Choosing Terait Technologies means partnering with experts who deliver measurable outcomes, guaranteed uptime, and enterprise-grade security." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "services.list",
              className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
              children: SERVICES.map((service, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceCard, { service, index: i }, service.title))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider mt-28" })
      ]
    }
  );
}
export {
  ServicesSection as default
};
