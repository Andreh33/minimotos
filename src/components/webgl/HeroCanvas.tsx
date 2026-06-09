"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import * as THREE from "three";
import { cappedDpr } from "@/lib/utils/capabilities";

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uRes;
  uniform vec2  uPointer;
  uniform float uScroll;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  vec3 field(vec2 uv){
    float t = uTime * 0.05;
    float n = fbm(uv * 2.6 + vec2(t, -t * 0.6));
    vec3 col = vec3(0.020, 0.023, 0.035);
    // glow azul moto
    float g1 = smoothstep(0.72, 0.0, distance(uv, vec2(0.30 + 0.10 * sin(t), 0.40)));
    col += g1 * vec3(0.14, 0.45, 1.0) * (0.55 + 0.5 * n);
    // glow magenta
    float g2 = smoothstep(0.78, 0.0, distance(uv, vec2(0.74 + 0.08 * cos(t * 0.8), 0.60)));
    col += g2 * vec3(1.0, 0.14, 0.58) * (0.40 + 0.5 * n);
    // wash violeta
    col += n * n * vec3(0.20, 0.06, 0.45) * 0.32;
    // verde quad, abajo
    float g3 = smoothstep(0.55, 0.0, distance(uv, vec2(0.62, 0.08)));
    col += g3 * vec3(0.10, 0.9, 0.35) * 0.14;
    return col;
  }

  void main(){
    vec2 uv = vUv;
    vec2 auv = uv - 0.5;
    auv.x *= uRes.x / max(uRes.y, 1.0);

    uv += uPointer * 0.02;
    float split = 0.0018 + uScroll * 0.018;

    vec3 col;
    col.r = field(uv + vec2(split, 0.0)).r;
    col.g = field(uv).g;
    col.b = field(uv - vec2(split, 0.0)).b;

    // grano fino
    float gr = (hash(uv * uRes + uTime) - 0.5) * 0.055;
    col += gr;

    // viñeta
    float vig = smoothstep(1.15, 0.30, length(auv));
    col *= vig;

    // ligera elevación de negros para que no clipee a 0
    col = max(col, vec3(0.006));
    gl_FragColor = vec4(col, 1.0);
  }
`;

function FieldPlane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const pointerTarget = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(size.width, size.height) },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    }),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useFrame((state, delta) => {
    const m = mat.current;
    if (!m) return;
    m.uniforms.uTime.value += Math.min(delta, 0.05);
    m.uniforms.uRes.value.set(state.size.width, state.size.height);

    // pointer suavizado
    pointerTarget.current.set(state.pointer.x, state.pointer.y);
    (m.uniforms.uPointer.value as THREE.Vector2).lerp(pointerTarget.current, 0.05);

    // RGB split por velocidad de scroll (Lenis)
    const lenis = (window as unknown as { __lenis?: { velocity: number } }).__lenis;
    const v = lenis ? Math.min(Math.abs(lenis.velocity) / 35, 1) : 0;
    m.uniforms.uScroll.value += (v - m.uniforms.uScroll.value) * 0.1;
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={mat}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </ScreenQuad>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      dpr={cappedDpr()}
      frameloop="always"
      orthographic
      camera={{ position: [0, 0, 1] }}
    >
      <FieldPlane />
    </Canvas>
  );
}
