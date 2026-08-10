"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import faceGeometry from "../data/sydrick-face-geometry.json";

type Language = "en" | "zh";

type PortraitProps = {
  language: Language;
  progressRef: MutableRefObject<number>;
};

const skin = "#765043";
const skinShadow = "#654238";
const hairDark = "#17110f";
const hairMid = "#2b1d19";
const hairWarm = "#56392e";
const shirt = "#181514";

function Hair() {
  const loadedHairTexture = useTexture("./sydrick-hair-texture.png");
  const hairTexture = useMemo(() => {
    const texture = loadedHairTexture.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }, [loadedHairTexture]);

  useEffect(() => () => hairTexture.dispose(), [hairTexture]);

  return (
    <group>
      <mesh position={[-0.1, 0.34, -0.5]} scale={[0.9, 0.94, 0.68]} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={hairDark} roughness={0.76} metalness={0.03} />
      </mesh>
      <mesh position={[-0.72, -0.61, -0.16]} rotation={[0.02, 0.06, -0.08]} scale={[0.3, 1.22, 0.34]} castShadow>
        <sphereGeometry args={[1, 52, 52]} />
        <meshStandardMaterial color={hairDark} roughness={0.7} metalness={0.03} />
      </mesh>
      <mesh position={[0.73, -0.6, -0.18]} rotation={[0.02, -0.06, 0.08]} scale={[0.3, 1.24, 0.34]} castShadow>
        <sphereGeometry args={[1, 52, 52]} />
        <meshStandardMaterial color={hairDark} roughness={0.7} metalness={0.03} />
      </mesh>
      <mesh position={[-0.79, -0.74, 0.02]} rotation={[0.02, 0.09, -0.05]} scale={[0.15, 1.02, 0.18]} castShadow>
        <sphereGeometry args={[1, 40, 40]} />
        <meshStandardMaterial color={hairWarm} roughness={0.71} metalness={0.02} />
      </mesh>
      <mesh position={[0.81, -0.72, 0]} rotation={[0.02, -0.09, 0.05]} scale={[0.15, 1.04, 0.18]} castShadow>
        <sphereGeometry args={[1, 40, 40]} />
        <meshStandardMaterial color={hairMid} roughness={0.71} metalness={0.02} />
      </mesh>
      <mesh position={[-0.16, -0.08, 0.82]} renderOrder={4}>
        <planeGeometry args={[2.62, 3.15, 3, 5]} />
        <meshBasicMaterial map={hairTexture} transparent alphaTest={0.035} depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function FaceSticker({
  texture,
  position,
  rotation,
  scale,
}: {
  texture: THREE.Texture;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale} renderOrder={5}>
      <planeGeometry args={[1.15, 0.72, 4, 3]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.08} depthWrite={false} toneMapped={false} polygonOffset polygonOffsetFactor={-5} />
    </mesh>
  );
}

function SydrickAvatar({ progressRef }: PortraitProps) {
  const avatar = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const loadedFaceTexture = useTexture("./sydrick-face-texture.webp");
  const loadedDecals = useTexture([
    "./stickers/economics.png",
    "./stickers/build.png",
    "./stickers/endurance.png",
  ]);

  const faceTexture = useMemo(() => {
    const texture = loadedFaceTexture.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }, [loadedFaceTexture]);
  const decals = useMemo(() => loadedDecals.map((loaded) => {
    const texture = loaded.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }), [loadedDecals]);

  const mesh = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(faceGeometry.vertices.flat(), 3));
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(faceGeometry.uvs.flat(), 2));
    geometry.setIndex(faceGeometry.triangles.flat());
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      mouse.current.x = event.clientX / window.innerWidth * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight * 2 - 1);
    };
    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);
  useEffect(() => () => mesh.dispose(), [mesh]);
  useEffect(() => () => faceTexture.dispose(), [faceTexture]);
  useEffect(() => () => decals.forEach((texture) => texture.dispose()), [decals]);

  useFrame((_, delta) => {
    if (!avatar.current) return;
    const ease = 1 - Math.pow(0.002, delta);
    const stageShift = -0.48 * THREE.MathUtils.smoothstep(progressRef.current, 0.11, 0.2);
    avatar.current.position.x = THREE.MathUtils.lerp(avatar.current.position.x, stageShift, ease);
    avatar.current.rotation.y = THREE.MathUtils.lerp(avatar.current.rotation.y, mouse.current.x * 0.045, ease);
    avatar.current.rotation.x = THREE.MathUtils.lerp(avatar.current.rotation.x, mouse.current.y * 0.035 + Math.sin(performance.now() * 0.0008) * 0.006, ease);
  });

  return (
    <group ref={avatar} position={[0, -0.22, 0]}>
      <mesh position={[0, 0.08, -0.58]} scale={[0.85, 1.08, 0.68]} castShadow receiveShadow>
        <sphereGeometry args={[1, 72, 72]} />
        <meshStandardMaterial color={skinShadow} roughness={0.82} />
      </mesh>

      <mesh geometry={mesh} position={[0, 0.08, 0.64]} scale={[0.96, 0.99, 1]} castShadow renderOrder={2}>
        <meshBasicMaterial map={faceTexture} transparent alphaTest={0.035} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>

      <FaceSticker texture={decals[0]} position={[-0.22, 0.62, 0.91]} rotation={[0.01, -0.06, -0.12]} scale={0.25} />
      <FaceSticker texture={decals[1]} position={[0.24, 0.06, 0.92]} rotation={[0.01, 0.07, 0.1]} scale={0.23} />
      <FaceSticker texture={decals[2]} position={[-0.24, -0.14, 0.91]} rotation={[0.01, -0.07, -0.08]} scale={0.23} />

      <mesh position={[-0.84, 0.08, -0.08]} scale={[0.16, 0.3, 0.13]} castShadow>
        <sphereGeometry args={[1, 36, 36]} /><meshStandardMaterial color={skin} roughness={0.8} />
      </mesh>
      <mesh position={[0.84, 0.08, -0.08]} scale={[0.16, 0.3, 0.13]} castShadow>
        <sphereGeometry args={[1, 36, 36]} /><meshStandardMaterial color={skin} roughness={0.8} />
      </mesh>

      <Hair />

      <mesh position={[0, -1.35, -0.22]} scale={[0.36, 0.6, 0.34]} castShadow>
        <cylinderGeometry args={[0.7, 0.78, 1.4, 44]} />
        <meshStandardMaterial color={skin} roughness={0.82} />
      </mesh>
      <mesh position={[0, -2.03, -0.4]} scale={[1.4, 0.82, 0.72]} castShadow>
        <sphereGeometry args={[1, 56, 56]} />
        <meshStandardMaterial color={shirt} roughness={0.86} />
      </mesh>
      <mesh position={[0.58, -0.09, 0.25]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.12, 0.012, 10, 36]} />
        <meshStandardMaterial color="#b69a65" metalness={0.84} roughness={0.25} />
      </mesh>

      <mesh position={[0, -2.78, -0.9]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.1, 64]} />
        <meshBasicMaterial color="#241b17" transparent opacity={0.24} depthWrite={false} />
      </mesh>
    </group>
  );
}

const cameraFrames = [
  { at: 0, position: new THREE.Vector3(0, -0.03, 7.05), target: new THREE.Vector3(0, -0.46, 0) },
  { at: 0.24, position: new THREE.Vector3(-0.22, 0.4, 3.8), target: new THREE.Vector3(-0.28, 0.48, 0.18) },
  { at: 0.49, position: new THREE.Vector3(0.2, 0.13, 3.65), target: new THREE.Vector3(0.28, 0.12, 0.2) },
  { at: 0.74, position: new THREE.Vector3(-0.16, -0.04, 3.58), target: new THREE.Vector3(-0.26, -0.11, 0.18) },
  { at: 1, position: new THREE.Vector3(0, -0.06, 6.9), target: new THREE.Vector3(0, -0.48, 0) },
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
  return (
    <div className="character-stage">
      <Canvas
        camera={{ position: [0, -0.03, 7.05], fov: 33, near: 0.1, far: 30 }}
        dpr={[1, 1.65]}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={1.4} color="#f5e9da" />
        <hemisphereLight intensity={1.2} color="#f7e7d4" groundColor="#3a2720" />
        <directionalLight position={[4, 6, 5]} intensity={3.2} color="#f2c9a4" castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-4, 2, 3]} intensity={1.7} color="#8d7378" />
        <pointLight position={[0, -1, 3]} intensity={0.8} color="#b99868" />
        <SydrickAvatar language={language} progressRef={progressRef} />
        <ScrollCamera progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
