import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-Dc2kdjSL.js";
import { u as useFrame, M as MeshPhysicalMaterial, C as Canvas, V as Vector3, B as BufferGeometry, a as useThree } from "./react-three-fiber.esm-wCchHkT3.js";
import { m as motion } from "./proxy-BVFPtn7P.js";
import { A as ArrowRight, S as Stars } from "./Stars-FLK65rpB.js";
import { S as Shield, C as Cloud } from "./shield-TgbHrLeg.js";
import { _ as _extends } from "./extends-BwmuZ0dU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
];
const Monitor = createLucideIcon("monitor", __iconNode);
function useMouseParallax(strength = 1) {
  const [pos, setPos] = reactExports.useState({
    x: 0,
    y: 0,
    rawX: 0,
    rawY: 0
  });
  const rafRef = reactExports.useRef(null);
  const latestRef = reactExports.useRef({ clientX: 0, clientY: 0 });
  const onMouseMove = reactExports.useCallback((e) => {
    latestRef.current = { clientX: e.clientX, clientY: e.clientY };
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const { clientX, clientY } = latestRef.current;
      const x = clientX / window.innerWidth * 2 - 1;
      const y = clientY / window.innerHeight * 2 - 1;
      setPos({ x, y, rawX: clientX, rawY: clientY });
    });
  }, []);
  reactExports.useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onMouseMove]);
  return {
    ...pos,
    offsetX: pos.x * strength,
    offsetY: pos.y * strength
  };
}
var distort = "#define GLSLIFY 1\nvec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}";
class DistortMaterialImpl extends MeshPhysicalMaterial {
  constructor(parameters = {}) {
    super(parameters);
    this.setValues(parameters);
    this._time = {
      value: 0
    };
    this._distort = {
      value: 0.4
    };
    this._radius = {
      value: 1
    };
  }
  // FIXME Use `THREE.WebGLProgramParametersWithUniforms` type when able to target @types/three@0.160.0
  onBeforeCompile(shader) {
    shader.uniforms.time = this._time;
    shader.uniforms.radius = this._radius;
    shader.uniforms.distort = this._distort;
    shader.vertexShader = `
      uniform float time;
      uniform float radius;
      uniform float distort;
      ${distort}
      ${shader.vertexShader}
    `;
    shader.vertexShader = shader.vertexShader.replace("#include <begin_vertex>", `
        float updateTime = time / 50.0;
        float noise = snoise(vec3(position / 2.0 + updateTime * 5.0));
        vec3 transformed = vec3(position * (noise * pow(distort, 2.0) + radius));
        `);
  }
  get time() {
    return this._time.value;
  }
  set time(v) {
    this._time.value = v;
  }
  get distort() {
    return this._distort.value;
  }
  set distort(v) {
    this._distort.value = v;
  }
  get radius() {
    return this._radius.value;
  }
  set radius(v) {
    this._radius.value = v;
  }
}
const MeshDistortMaterial = /* @__PURE__ */ reactExports.forwardRef(({
  speed = 1,
  ...props
}, ref) => {
  const [material] = reactExports.useState(() => new DistortMaterialImpl());
  useFrame((state) => material && (material.time = state.clock.elapsedTime * speed));
  return /* @__PURE__ */ reactExports.createElement("primitive", _extends({
    object: material,
    ref,
    attach: "material"
  }, props));
});
function create(type, effect) {
  const El = type + "Geometry";
  return /* @__PURE__ */ reactExports.forwardRef(({
    args,
    children,
    ...props
  }, fref) => {
    const ref = reactExports.useRef(null);
    reactExports.useImperativeHandle(fref, () => ref.current);
    reactExports.useLayoutEffect(() => void (effect == null ? void 0 : effect(ref.current)));
    return /* @__PURE__ */ reactExports.createElement("mesh", _extends({
      ref
    }, props), /* @__PURE__ */ reactExports.createElement(El, {
      attach: "geometry",
      args
    }), children);
  });
}
const Sphere = /* @__PURE__ */ create("sphere");
function FloatingCrystal({
  position,
  scale,
  color,
  speed = 1
}) {
  const mesh = reactExports.useRef(null);
  const baseY = position[1];
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.position.y = baseY + Math.sin(clock.elapsedTime * speed * 0.8) * 0.3;
    mesh.current.rotation.x += 4e-3 * speed;
    mesh.current.rotation.y += 6e-3 * speed;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: mesh, position, scale, castShadow: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("octahedronGeometry", { args: [1, 0] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshPhysicalMaterial",
      {
        color,
        metalness: 0.6,
        roughness: 0.1,
        transmission: 0.5,
        thickness: 0.8,
        emissive: color,
        emissiveIntensity: 0.2
      }
    )
  ] });
}
function GlowOrb({
  position,
  color
}) {
  const mesh = reactExports.useRef(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;
    mesh.current.position.x = position[0] + Math.sin(t * 0.5) * 0.5;
    mesh.current.position.y = position[1] + Math.cos(t * 0.4) * 0.4;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Sphere,
    {
      ref: mesh,
      args: [0.6, 32, 32],
      position,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        MeshDistortMaterial,
        {
          color,
          emissive: color,
          emissiveIntensity: 0.4,
          distort: 0.45,
          speed: 2,
          transparent: true,
          opacity: 0.7
        }
      )
    }
  );
}
function NetworkMesh() {
  const groupRef = reactExports.useRef(null);
  const linesRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!linesRef.current) return;
    const points = [];
    const nodeCount = 12;
    const nodes = Array.from(
      { length: nodeCount },
      () => new Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2
      )
    );
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 3) {
          points.push(nodes[i], nodes[j]);
        }
      }
    }
    const geo = new BufferGeometry().setFromPoints(points);
    linesRef.current.geometry = geo;
  }, []);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.03) * 0.1;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("group", { ref: groupRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("lineSegments", { ref: linesRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("bufferGeometry", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("lineBasicMaterial", { color: "#00e5ff", transparent: true, opacity: 0.12 })
  ] }) });
}
function CameraRig({ mouseX, mouseY }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (mouseY * -0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}
function HeroCanvas({ mouseX, mouseY }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Canvas,
    {
      camera: { position: [0, 0, 8], fov: 55 },
      gl: { antialias: true, alpha: true },
      style: { background: "transparent" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.3 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [5, 5, 5], intensity: 60, color: "#00e5ff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-5, -3, 3], intensity: 40, color: "#a855f7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [0, 8, -4], intensity: 30, color: "#ffffff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { radius: 80, depth: 40, count: 1200, factor: 3, fade: true, speed: 0.5 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NetworkMesh, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FloatingCrystal,
          {
            position: [-3.5, 1.5, 0],
            scale: 0.55,
            color: "#00e5ff",
            speed: 0.9
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FloatingCrystal,
          {
            position: [3.8, 0.8, -1],
            scale: 0.65,
            color: "#a855f7",
            speed: 1.1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FloatingCrystal,
          {
            position: [-2.5, -1.8, 1],
            scale: 0.4,
            color: "#00e5ff",
            speed: 0.7
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FloatingCrystal,
          {
            position: [2.2, -1.2, 0.5],
            scale: 0.45,
            color: "#7c3aed",
            speed: 1.3
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FloatingCrystal,
          {
            position: [0.5, 2.8, -2],
            scale: 0.35,
            color: "#00bcd4",
            speed: 0.8
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FloatingCrystal,
          {
            position: [-4.2, -0.5, -1],
            scale: 0.5,
            color: "#8b5cf6",
            speed: 1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GlowOrb, { position: [-1.5, 0.5, 1], color: "#00e5ff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GlowOrb, { position: [2.5, 1, -1], color: "#a855f7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CameraRig, { mouseX, mouseY })
      ]
    }
  );
}
const STATS = [
  { icon: Monitor, label: "Uptime SLA", value: "99.9%" },
  { icon: Shield, label: "Security Incidents Resolved", value: "10,000+" },
  { icon: Cloud, label: "Cloud Migrations", value: "500+" }
];
function HeroSection() {
  const { x: mouseX, y: mouseY } = useMouseParallax(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "hero",
      "data-ocid": "hero.section",
      className: "relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-gradient",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroCanvas, { mouseX, mouseY }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-radial-gradient pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 50% 60% at 50% 50%, transparent 30%, oklch(0.13 0.022 265 / 0.5) 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 container mx-auto px-6 text-center pt-24 pb-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/25 text-xs font-body font-medium text-primary tracking-widest uppercase mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" }),
                "Enterprise IT Managed Services · Bangalore"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
              className: "font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6",
              children: [
                "Enterprise IT",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text-primary", children: "Managed Services." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Redefined." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
              className: "max-w-2xl mx-auto font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-10",
              children: "Terait Technologies delivers seamless infrastructure management, robust cybersecurity, and scalable cloud solutions for modern enterprises across India."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] },
              className: "flex flex-col sm:flex-row gap-4 justify-center items-center mb-16",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": "hero.explore_button",
                    size: "lg",
                    onClick: () => {
                      var _a;
                      return (_a = document.querySelector("#services")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                    },
                    className: "bg-primary text-primary-foreground glow-primary hover:bg-primary/90 font-display font-semibold text-base px-8 py-6 transition-smooth",
                    children: [
                      "Explore Our Solutions",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-4 h-4" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": "hero.case_studies_button",
                    size: "lg",
                    variant: "outline",
                    onClick: () => {
                      var _a;
                      return (_a = document.querySelector("#showcase")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                    },
                    className: "border-border/60 text-foreground hover:bg-muted/30 font-display font-semibold text-base px-8 py-6 transition-smooth",
                    children: "View Case Studies"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] },
              className: "flex flex-col sm:flex-row gap-4 justify-center items-center",
              children: STATS.map(({ icon: Icon, label, value }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `hero.stat.${i + 1}`,
                  className: "glass rounded-xl px-6 py-4 flex items-center gap-3 min-w-[180px]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-xl text-foreground leading-none", children: value }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-body text-xs text-muted-foreground mt-0.5", children: label })
                    ] })
                  ]
                },
                label
              ))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.2 },
            className: "absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-widest uppercase font-body", children: "Scroll" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 animate-bounce" })
            ]
          }
        )
      ]
    }
  );
}
export {
  HeroSection as default
};
