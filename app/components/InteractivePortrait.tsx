"use client";

import { Html } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";

type Language = "en" | "zh";

type PortraitProps = {
  language: Language;
  progressRef: MutableRefObject<number>;
};

type OrbitNodeProps = {
  accent: string;
  angle: number;
  chapter: 1 | 2 | 3;
  focusAngle: number;
  label: string;
  metric: string;
  progressRef: MutableRefObject<number>;
  radius: number;
};

// Mineral accents with enough chroma to remain visible on the neutral stage.
const graphite = "#a77ac4";
const silver = "#d8b469";
const smoke = "#a5ad65";
const white = "#eeeeee";

const nodeChapterRanges = {
  1: [0.14, 0.39],
  2: [0.39, 0.64],
  3: [0.64, 1],
} as const;

function getChapterFocus(progress: number, chapter: 1 | 2 | 3) {
  const [start, end] = nodeChapterRanges[chapter];
  const fadeIn = THREE.MathUtils.smoothstep(progress, start - 0.045, start + 0.035);
  const fadeOut = chapter === 3 ? 1 : 1 - THREE.MathUtils.smoothstep(progress, end - 0.035, end + 0.045);
  return fadeIn * fadeOut;
}

function OrbitNode({ accent, angle, chapter, focusAngle, label, metric, progressRef, radius }: OrbitNodeProps) {
  const group = useRef<THREE.Group>(null);
  const sphereMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const haloMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const labelElement = useRef<HTMLDivElement>(null);
  const currentAngle = useRef(angle);

  useFrame((_, delta) => {
    if (!group.current || !sphereMaterial.current || !haloMaterial.current) return;
    const progress = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const chapterMode = THREE.MathUtils.smoothstep(progress, 0.1, 0.17);
    const focus = getChapterFocus(progress, chapter);
    const ease = 1 - Math.pow(0.002, delta);
    const targetScale = THREE.MathUtils.lerp(1, THREE.MathUtils.lerp(0.78, 1.24, focus), chapterMode);
    const targetAngle = THREE.MathUtils.lerp(angle, focusAngle, focus * chapterMode);

    currentAngle.current = THREE.MathUtils.lerp(currentAngle.current, targetAngle, ease);
    group.current.position.set(
      Math.cos(currentAngle.current) * radius,
      Math.sin(currentAngle.current) * radius,
      0,
    );
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, targetScale, ease));
    sphereMaterial.current.opacity = THREE.MathUtils.lerp(1, THREE.MathUtils.lerp(0.38, 1, focus), chapterMode);
    sphereMaterial.current.emissiveIntensity = THREE.MathUtils.lerp(0.34, THREE.MathUtils.lerp(0.12, 0.88, focus), chapterMode);
    haloMaterial.current.opacity = THREE.MathUtils.lerp(0.68, THREE.MathUtils.lerp(0.2, 0.95, focus), chapterMode);
    labelElement.current?.style.setProperty("--node-focus", focus.toFixed(3));
    labelElement.current?.style.setProperty("--node-chapter-mode", chapterMode.toFixed(3));
  });

  return (
    <group ref={group} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
      <mesh castShadow>
        <sphereGeometry args={[0.075, 24, 24]} />
        <meshStandardMaterial ref={sphereMaterial} color={accent} emissive={accent} emissiveIntensity={0.34} metalness={0.72} roughness={0.2} transparent />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.13, 0.009, 8, 36]} />
        <meshBasicMaterial ref={haloMaterial} color={white} transparent opacity={0.68} />
      </mesh>
      <Html center position={[0, 0.22, 0]} wrapperClass="orbit-html-root" zIndexRange={[8, 0]}>
        <div ref={labelElement} className="orbit-label" style={{ "--orbit-accent": accent } as React.CSSProperties}>
          <strong>{metric}</strong>
          <span>{label}</span>
        </div>
      </Html>
    </group>
  );
}

function OrbitBand({
  accent,
  chapter,
  children,
  progressRef,
  radius,
}: {
  accent: string;
  chapter: 1 | 2 | 3;
  children?: React.ReactNode;
  progressRef: MutableRefObject<number>;
  radius: number;
}) {
  const group = useRef<THREE.Group>(null);
  const bandMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const highlightMaterial = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((_, delta) => {
    if (!group.current || !bandMaterial.current || !highlightMaterial.current) return;
    const progress = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const chapterMode = THREE.MathUtils.smoothstep(progress, 0.1, 0.17);
    const focus = getChapterFocus(progress, chapter);
    const ease = 1 - Math.pow(0.002, delta);
    const targetScale = THREE.MathUtils.lerp(1, THREE.MathUtils.lerp(0.985, 1.025, focus), chapterMode);
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, targetScale, ease));
    bandMaterial.current.opacity = THREE.MathUtils.lerp(0.9, THREE.MathUtils.lerp(0.4, 1, focus), chapterMode);
    highlightMaterial.current.opacity = THREE.MathUtils.lerp(0.48, THREE.MathUtils.lerp(0.18, 0.78, focus), chapterMode);
  });

  return (
    <group ref={group}>
      <mesh>
        <ringGeometry args={[radius - 0.005, radius + 0.005, 192]} />
        <meshBasicMaterial ref={bandMaterial} color={accent} side={THREE.DoubleSide} transparent opacity={0.9} depthWrite={false} />
      </mesh>
      <mesh scale={1.012}>
        <ringGeometry args={[radius - 0.0015, radius + 0.0015, 192]} />
        <meshBasicMaterial ref={highlightMaterial} color={white} side={THREE.DoubleSide} transparent opacity={0.48} depthWrite={false} />
      </mesh>
      {children}
    </group>
  );
}

function GeographicOrbit({ language }: { language: Language }) {
  const route = useMemo(
    () => new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-1.58, -0.66, -0.56),
        new THREE.Vector3(-0.92, -1.13, -0.62),
        new THREE.Vector3(0, -1.24, -0.64),
        new THREE.Vector3(1.46, -0.7, -0.56),
        new THREE.Vector3(1.7, 0.06, -0.58),
        new THREE.Vector3(0.7, 0.88, -0.64),
        new THREE.Vector3(-0.68, 0.88, -0.64),
        new THREE.Vector3(-1.7, 0.04, -0.58),
      ],
      true,
      "centripetal",
      0.5,
    ),
    [],
  );
  const mannheim = useMemo(() => route.getPoint(0.01), [route]);
  const zurich = useMemo(() => route.getPoint(0.36), [route]);
  const shanghai = useMemo(() => route.getPoint(0.5), [route]);

  return (
    <group>
      <mesh>
        <tubeGeometry args={[route, 160, 0.003, 8, true]} />
        <meshBasicMaterial color="#bfbfbf" transparent opacity={0.64} depthWrite={false} />
      </mesh>
      <mesh position={mannheim}>
        <sphereGeometry args={[0.03, 18, 18]} />
        <meshBasicMaterial color={white} />
      </mesh>
      <mesh position={shanghai}>
        <sphereGeometry args={[0.03, 18, 18]} />
        <meshBasicMaterial color={white} />
      </mesh>
      <mesh position={zurich}>
        <sphereGeometry args={[0.04, 20, 20]} />
        <meshStandardMaterial color={silver} emissive={silver} emissiveIntensity={0.35} metalness={0.7} roughness={0.18} />
      </mesh>
      <Html center position={[mannheim.x - 0.35, mannheim.y - 0.22, mannheim.z]} wrapperClass="orbit-html-root" zIndexRange={[7, 0]}>
        <span className="orbit-route-label">MANNHEIM · 49.48°N</span>
      </Html>
      <Html center position={[shanghai.x + 0.62, shanghai.y - 0.2, shanghai.z]} wrapperClass="orbit-html-root" zIndexRange={[7, 0]}>
        <span className="orbit-route-label">{language === "zh" ? "上海" : "SHANGHAI"} · 31.23°N</span>
      </Html>
      <Html center position={[zurich.x + 0.58, zurich.y + 0.25, zurich.z]} wrapperClass="orbit-html-root" zIndexRange={[7, 0]}>
        <span className="orbit-route-label orbit-route-zurich">{language === "zh" ? "苏黎世 · 2026 年 9 月起" : "ZURICH · FROM SEP 2026"}</span>
      </Html>
    </group>
  );
}

function AmbientField() {
  const positions = useMemo(() => {
    const data = new Float32Array(150 * 3);
    for (let index = 0; index < 150; index += 1) {
      const angle = index * 2.399963;
      const radius = 2.6 + (index % 9) * 0.16;
      data[index * 3] = Math.cos(angle) * radius;
      data[index * 3 + 1] = Math.sin(angle) * radius * 0.72;
      data[index * 3 + 2] = -0.8 + ((index * 17) % 29) * 0.055;
    }
    return data;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={white} size={0.018} transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

function PersonalOrbit({ language, progressRef }: PortraitProps) {
  const { size } = useThree();
  const root = useRef<THREE.Group>(null);
  const economicsRing = useRef<THREE.Group>(null);
  const builderRing = useRef<THREE.Group>(null);
  const enduranceRing = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const reducedMotion = useRef(false);
  const readingFocus = useRef(0);
  const sectionFocus = useRef<number | null>(null);
  const [activeSection, setActiveSection] = useState("");
  const copy = language === "zh"
    ? { economics: "经济学", builder: "构建者", endurance: "耐力运动", core: "个人坐标系统" }
    : { economics: "ECONOMICS", builder: "BUILDER / TECHNOLOGY", endurance: "ENDURANCE", core: "PERSONAL COORDINATE SYSTEM" };

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const handlePointer = (event: PointerEvent) => {
      pointer.current.x = event.clientX / window.innerWidth * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight * 2 - 1);
    };
    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);

  useEffect(() => {
    const track = () => {
      const marker = innerHeight * 0.35;
      const sections = [["path", .26], ["experience", .51], ["pace", .78]] as const;
      const current = sections.find(([id]) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return rect && rect.top < marker && rect.bottom > marker;
      });
      sectionFocus.current = current?.[1] ?? null;
      setActiveSection(current?.[0] ?? "");
    };
    track();
    addEventListener("scroll", track, { passive: true });
    addEventListener("resize", track);
    return () => { removeEventListener("scroll", track); removeEventListener("resize", track); };
  }, []);

  useFrame((state, delta) => {
    if (!root.current || !economicsRing.current || !builderRing.current || !enduranceRing.current || !core.current) return;
    const progress = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    readingFocus.current = sectionFocus.current ?? progress;
    const compact = THREE.MathUtils.smoothstep(progress, 0.87, 1);
    const chapterShift = THREE.MathUtils.smoothstep(progress, 0.1, 0.22);
    const ease = 1 - Math.pow(0.004, delta);
    const motion = reducedMotion.current ? 0 : 1;
    const time = state.clock.elapsedTime * motion;
    const isNarrow = size.width <= 720;
    const isShortPhone = isNarrow && size.height <= 740;
    const landingX = isNarrow ? 0 : 1.03;
    const landingY = isNarrow ? (isShortPhone ? 1.2 : 1.15) : 0.08;
    const expandedX = THREE.MathUtils.lerp(landingX, -0.52, chapterShift);
    const expandedY = THREE.MathUtils.lerp(landingY, 0.08, chapterShift);
    const expandedScale = THREE.MathUtils.lerp(isNarrow ? (isShortPhone ? 0.35 : 0.46) : 0.82, 1, chapterShift);

    root.current.position.x = THREE.MathUtils.lerp(root.current.position.x, THREE.MathUtils.lerp(expandedX, -2.5, compact), ease);
    root.current.position.y = THREE.MathUtils.lerp(root.current.position.y, THREE.MathUtils.lerp(expandedY, 0.88, compact), ease);
    const targetScale = THREE.MathUtils.lerp(expandedScale, 0.48, compact);
    root.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), ease);
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, pointer.current.x * 0.13, ease);
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, pointer.current.y * 0.08, ease);

    const economicsFocus = getChapterFocus(readingFocus.current, 1);
    const builderFocus = getChapterFocus(readingFocus.current, 2);
    const enduranceFocus = getChapterFocus(readingFocus.current, 3);
    const economicsNatural = 0.22 + Math.sin(time * 0.32) * 0.18 + progress * 0.28;
    const builderNatural = -0.65 - Math.sin(time * 0.27 + 0.8) * 0.16 - progress * 0.22;
    const enduranceNatural = 0.98 + Math.sin(time * 0.36 + 1.4) * 0.2 + progress * 0.26;

    economicsRing.current.rotation.z = THREE.MathUtils.lerp(economicsNatural, 0.55, economicsFocus);
    builderRing.current.rotation.z = THREE.MathUtils.lerp(builderNatural, -1.1, builderFocus);
    enduranceRing.current.rotation.z = THREE.MathUtils.lerp(enduranceNatural, 1.6, enduranceFocus);
    core.current.rotation.y = time * 0.12 + pointer.current.x * 0.14;
    core.current.rotation.x = -time * 0.08 + pointer.current.y * 0.1;
  });

  return (
    <group ref={root} position={[0, 0.08, 0]}>
      <AmbientField />

      <group ref={economicsRing} rotation={[0.54, 0.24, 0.22]} scale={[1.2, 0.78, 1]}>
        <OrbitBand accent={graphite} chapter={1} progressRef={readingFocus} radius={1.62}>
          <OrbitNode accent={graphite} angle={0.28} chapter={1} focusAngle={0.2} metric="8.20" label={language === "zh" ? "阿姆斯特丹绩点" : "UVA GPA"} progressRef={readingFocus} radius={1.62} />
        </OrbitBand>
      </group>

      <group ref={builderRing} rotation={[-0.52, 0.72, -0.65]} scale={[1.12, 0.8, 1]}>
        <OrbitBand accent={silver} chapter={2} progressRef={readingFocus} radius={1.48}>
          <OrbitNode accent={silver} angle={4.22} chapter={2} focusAngle={1.99} metric={activeSection === "experience" ? "13K+" : "18"} label={activeSection === "experience" ? (language === "zh" ? "用户增长 · 课程报名" : "GROWTH · ENROLLMENTS") : (language === "zh" ? "构建者 · 探索过的国家" : "BUILDER · COUNTRIES EXPLORED")} progressRef={readingFocus} radius={1.48} />
        </OrbitBand>
      </group>

      <group ref={enduranceRing} rotation={[0.82, -0.48, 0.98]} scale={[1.18, 0.76, 1]}>
        <OrbitBand accent={smoke} chapter={3} progressRef={readingFocus} radius={1.36}>
          <OrbitNode accent={white} angle={3.64} chapter={3} focusAngle={3.24} metric={language === "zh" ? "冠军" : "1ST"} label={copy.endurance} progressRef={readingFocus} radius={1.36} />
        </OrbitBand>
      </group>

      <GeographicOrbit language={language} />

      <group ref={core} scale={1.12}>
        <mesh castShadow>
          <icosahedronGeometry args={[0.62, 3]} />
          <meshPhysicalMaterial
            color="#654477"
            emissive={graphite}
            emissiveIntensity={0.07}
            metalness={0.15}
            roughness={0.58}
            transparent
            opacity={0.8}
            transmission={0.08}
            thickness={0.7}
            ior={1.22}
            clearcoat={0.38}
            clearcoatRoughness={0.22}
            depthWrite={false}
          />
        </mesh>
        <mesh scale={1.035}>
          <icosahedronGeometry args={[0.62, 2]} />
          <meshBasicMaterial color={silver} wireframe transparent opacity={0.32} depthWrite={false} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.78, 0.003, 8, 90]} />
          <meshBasicMaterial color={white} transparent opacity={0.38} />
        </mesh>
        <Html center position={[0, 0, 0.67]} wrapperClass="orbit-html-root" zIndexRange={[9, 0]}>
          <div className="orbit-core-label">
            <strong>SW</strong>
            <span>{copy.core}</span>
          </div>
        </Html>
      </group>
    </group>
  );
}

const cameraFrames = [
  { at: 0, position: new THREE.Vector3(0, 0.12, 7.9), target: new THREE.Vector3(0, 0.05, 0) },
  { at: 0.24, position: new THREE.Vector3(-0.55, 0.42, 5.2), target: new THREE.Vector3(-0.55, 0.46, 0) },
  { at: 0.49, position: new THREE.Vector3(0.48, 0.18, 5.05), target: new THREE.Vector3(0.34, 0.13, 0) },
  { at: 0.74, position: new THREE.Vector3(-0.18, -0.34, 4.95), target: new THREE.Vector3(-0.22, -0.32, 0) },
  { at: 1, position: new THREE.Vector3(0, 0.14, 7.7), target: new THREE.Vector3(-0.58, 0.3, 0) },
];

function sampleCamera(progress: number) {
  const currentIndex = Math.min(
    cameraFrames.length - 2,
    Math.max(0, cameraFrames.findIndex((frame) => frame.at >= progress) - 1),
  );
  const start = cameraFrames[currentIndex];
  const end = cameraFrames[currentIndex + 1];
  const local = THREE.MathUtils.smoothstep(progress, start.at, end.at);
  return {
    position: new THREE.Vector3().lerpVectors(start.position, end.position, local),
    target: new THREE.Vector3().lerpVectors(start.target, end.target, local),
  };
}

function ScrollCamera({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const { camera } = useThree();
  const lookTarget = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const sampled = sampleCamera(progressRef.current);
    const ease = 1 - Math.pow(0.006, delta);
    camera.position.lerp(sampled.position, ease);
    lookTarget.current.lerp(sampled.target, ease);
    camera.lookAt(lookTarget.current);
  });
  return null;
}

export function InteractivePortrait({ language, progressRef }: PortraitProps) {
  const [active, setActive] = useState(true);
  useEffect(() => {
    const sync = () => {
      const finale = document.querySelector(".orbit-finale")?.getBoundingClientRect();
      setActive(!document.hidden && (!finale || finale.top > innerHeight));
    };
    sync();
    addEventListener("scroll", sync, { passive: true });
    document.addEventListener("visibilitychange", sync);
    return () => { removeEventListener("scroll", sync); document.removeEventListener("visibilitychange", sync); };
  }, []);
  return (
    <div className="character-stage orbit-stage">
      <Canvas
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0.12, 7.9], fov: 34, near: 0.1, far: 30 }}
        dpr={[1, 1.65]}
        shadows="percentage"
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={1.2} color="#eaeaea" />
        <hemisphereLight intensity={1.05} color="#e9e9e9" groundColor="#1d1d1d" />
        <directionalLight position={[4, 6, 5]} intensity={3.5} color="#d2d2d2" castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-4, 1, 3]} intensity={2.2} color="#444444" />
        <pointLight position={[0, -1, 4]} intensity={1.35} color="#9d9d9d" />
        <PersonalOrbit language={language} progressRef={progressRef} />
        <ScrollCamera progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
