"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export type Expression = "neutral" | "think" | "build" | "move";

type PortraitProps = {
  expression: Expression;
  language: "en" | "zh";
  onExpressionChange: (expression: Expression) => void;
};

const skin = "#b9795f";
const skinLight = "#c98b70";
const hair = "#171310";
const shirt = "#211d1a";
const wine = "#6e2938";
const brass = "#b59a6a";

function Character({
  expression,
  onExpressionChange,
}: Pick<PortraitProps, "expression" | "onExpressionChange">) {
  const bust = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const leftPupil = useRef<THREE.Mesh>(null);
  const rightPupil = useRef<THREE.Mesh>(null);
  const leftBrow = useRef<THREE.Mesh>(null);
  const rightBrow = useRef<THREE.Mesh>(null);
  const mouth = useRef<THREE.Mesh>(null);
  const leftBlush = useRef<THREE.Mesh>(null);
  const rightBlush = useRef<THREE.Mesh>(null);

  useFrame(({ pointer, clock }, delta) => {
    const ease = 1 - Math.pow(0.001, delta);
    const px = THREE.MathUtils.clamp(pointer.x, -1, 1);
    const py = THREE.MathUtils.clamp(pointer.y, -1, 1);
    const attention = expression === "think" ? 1.25 : expression === "build" ? 0.8 : 1;

    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, px * 0.16, ease);
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -py * 0.09, ease);
    }
    if (bust.current) {
      bust.current.rotation.z = THREE.MathUtils.lerp(bust.current.rotation.z, px * -0.018, ease);
    }

    const eyeX = px * 0.075 * attention;
    const eyeY = py * 0.055 * attention;
    if (leftPupil.current) {
      leftPupil.current.position.x = THREE.MathUtils.lerp(leftPupil.current.position.x, -0.34 + eyeX, ease);
      leftPupil.current.position.y = THREE.MathUtils.lerp(leftPupil.current.position.y, 0.28 + eyeY, ease);
    }
    if (rightPupil.current) {
      rightPupil.current.position.x = THREE.MathUtils.lerp(rightPupil.current.position.x, 0.34 + eyeX, ease);
      rightPupil.current.position.y = THREE.MathUtils.lerp(rightPupil.current.position.y, 0.28 + eyeY, ease);
    }

    const browLift = expression === "build" ? 0.09 : expression === "think" ? 0.035 : 0;
    const browTilt = expression === "think" ? 0.2 : expression === "move" ? -0.08 : 0.06;
    if (leftBrow.current) {
      leftBrow.current.position.y = THREE.MathUtils.lerp(leftBrow.current.position.y, 0.59 + browLift, ease);
      leftBrow.current.rotation.z = THREE.MathUtils.lerp(leftBrow.current.rotation.z, -browTilt, ease);
    }
    if (rightBrow.current) {
      rightBrow.current.position.y = THREE.MathUtils.lerp(rightBrow.current.position.y, 0.59 + browLift, ease);
      rightBrow.current.rotation.z = THREE.MathUtils.lerp(rightBrow.current.rotation.z, browTilt, ease);
    }

    const smile = expression === "move" ? 0.74 : expression === "build" ? 0.48 : 0.28;
    if (mouth.current) {
      mouth.current.scale.y = THREE.MathUtils.lerp(mouth.current.scale.y, smile, ease);
      mouth.current.rotation.z = THREE.MathUtils.lerp(
        mouth.current.rotation.z,
        expression === "think" ? Math.PI * 1.08 : Math.PI,
        ease,
      );
    }

    const blushOpacity = expression === "move" ? 0.36 : 0.16;
    [leftBlush.current, rightBlush.current].forEach((mesh) => {
      const material = mesh?.material as THREE.MeshStandardMaterial | undefined;
      if (material) material.opacity = THREE.MathUtils.lerp(material.opacity, blushOpacity, ease);
    });

    if (expression === "build" && head.current) {
      head.current.position.y = Math.sin(clock.elapsedTime * 3.2) * 0.015;
    } else if (head.current) {
      head.current.position.y = THREE.MathUtils.lerp(head.current.position.y, 0, ease);
    }
  });

  const cycleExpression = () => {
    const order: Expression[] = ["neutral", "think", "build", "move"];
    onExpressionChange(order[(order.indexOf(expression) + 1) % order.length]);
  };

  return (
    <Float speed={0.9} rotationIntensity={0.06} floatIntensity={0.12}>
      <group ref={bust} position={[0, -0.48, 0]} scale={1.18} onClick={cycleExpression}>
        <mesh position={[0, -1.42, -0.16]} scale={[1.36, 0.93, 0.68]} castShadow>
          <sphereGeometry args={[1, 48, 48]} />
          <meshStandardMaterial color={shirt} roughness={0.76} />
        </mesh>
        <mesh position={[0, -0.91, 0]} scale={[0.41, 0.68, 0.42]} castShadow>
          <cylinderGeometry args={[0.62, 0.72, 1.3, 40]} />
          <meshStandardMaterial color={shirt} roughness={0.72} />
        </mesh>
        <mesh position={[0, -0.75, 0.02]} scale={[0.27, 0.62, 0.26]} castShadow>
          <cylinderGeometry args={[0.62, 0.7, 1.25, 32]} />
          <meshStandardMaterial color={skin} roughness={0.72} />
        </mesh>

        <group ref={head}>
          <mesh position={[0, 0.06, -0.18]} scale={[0.96, 1.26, 0.72]} castShadow>
            <sphereGeometry args={[1.12, 64, 64]} />
            <meshStandardMaterial color={hair} roughness={0.88} />
          </mesh>
          <mesh position={[-0.87, -0.17, -0.02]} scale={[0.27, 1.22, 0.34]} rotation={[0, 0, 0.04]} castShadow>
            <sphereGeometry args={[1, 36, 36]} />
            <meshStandardMaterial color={hair} roughness={0.9} />
          </mesh>
          <mesh position={[0.87, -0.2, -0.02]} scale={[0.28, 1.25, 0.35]} rotation={[0, 0, -0.04]} castShadow>
            <sphereGeometry args={[1, 36, 36]} />
            <meshStandardMaterial color={hair} roughness={0.9} />
          </mesh>

          <mesh position={[0, 0.12, 0.03]} scale={[0.78, 1.02, 0.68]} castShadow>
            <sphereGeometry args={[1.05, 64, 64]} />
            <meshStandardMaterial color={skin} roughness={0.78} />
          </mesh>
          <mesh position={[-0.84, 0.11, 0.02]} scale={[0.2, 0.3, 0.17]} castShadow>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={skinLight} roughness={0.76} />
          </mesh>
          <mesh position={[0.84, 0.11, 0.02]} scale={[0.2, 0.3, 0.17]} castShadow>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={skinLight} roughness={0.76} />
          </mesh>

          <mesh position={[0, 0.78, 0.16]} scale={[0.89, 0.46, 0.63]} rotation={[-0.08, 0, 0]} castShadow>
            <sphereGeometry args={[1, 48, 48]} />
            <meshStandardMaterial color={hair} roughness={0.9} />
          </mesh>
          {[-0.55, -0.27, 0.02, 0.31, 0.57].map((x, index) => (
            <mesh
              key={x}
              position={[x, 0.61 - Math.abs(x) * 0.1, 0.53 + (index % 2) * 0.035]}
              scale={[0.24, 0.46 + (index % 2) * 0.09, 0.14]}
              rotation={[0.16, x * -0.2, x * -0.28]}
              castShadow
            >
              <sphereGeometry args={[1, 28, 28]} />
              <meshStandardMaterial color={hair} roughness={0.92} />
            </mesh>
          ))}

          <mesh position={[-0.34, 0.28, 0.66]} scale={[0.25, 0.16, 0.105]} castShadow>
            <sphereGeometry args={[1, 40, 40]} />
            <meshStandardMaterial color="#f4ece2" roughness={0.62} />
          </mesh>
          <mesh position={[0.34, 0.28, 0.66]} scale={[0.25, 0.16, 0.105]} castShadow>
            <sphereGeometry args={[1, 40, 40]} />
            <meshStandardMaterial color="#f4ece2" roughness={0.62} />
          </mesh>
          <mesh ref={leftPupil} position={[-0.34, 0.28, 0.758]} scale={[0.082, 0.096, 0.048]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#181411" roughness={0.4} />
          </mesh>
          <mesh ref={rightPupil} position={[0.34, 0.28, 0.758]} scale={[0.082, 0.096, 0.048]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#181411" roughness={0.4} />
          </mesh>
          <mesh ref={leftBrow} position={[-0.34, 0.59, 0.69]} scale={[0.3, 0.043, 0.04]} rotation={[0, 0, -0.06]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hair} roughness={0.92} />
          </mesh>
          <mesh ref={rightBrow} position={[0.34, 0.59, 0.69]} scale={[0.3, 0.043, 0.04]} rotation={[0, 0, 0.06]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hair} roughness={0.92} />
          </mesh>

          <mesh position={[0, 0.02, 0.77]} scale={[0.12, 0.22, 0.12]} rotation={[0.14, 0, 0]} castShadow>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={skinLight} roughness={0.74} />
          </mesh>
          <mesh ref={mouth} position={[0, -0.34, 0.735]} scale={[1, 0.3, 1]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.25, 0.034, 14, 48, Math.PI]} />
            <meshStandardMaterial color="#4a211e" roughness={0.65} />
          </mesh>
          <mesh ref={leftBlush} position={[-0.56, -0.12, 0.67]} scale={[0.19, 0.1, 0.035]}>
            <sphereGeometry args={[1, 24, 24]} />
            <meshStandardMaterial color={wine} transparent opacity={0.16} roughness={0.8} />
          </mesh>
          <mesh ref={rightBlush} position={[0.56, -0.12, 0.67]} scale={[0.19, 0.1, 0.035]}>
            <sphereGeometry args={[1, 24, 24]} />
            <meshStandardMaterial color={wine} transparent opacity={0.16} roughness={0.8} />
          </mesh>

          <mesh position={[0.95, -0.02, 0.06]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.13, 0.018, 12, 36]} />
            <meshStandardMaterial color={brass} metalness={0.82} roughness={0.3} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

export function InteractivePortrait({ expression, language, onExpressionChange }: PortraitProps) {
  const labels = language === "zh"
    ? { think: "思考", build: "构建", move: "前行", hint: "移动鼠标 · 触碰脸部贴纸" }
    : { think: "THINK", build: "BUILD", move: "MOVE", hint: "MOVE CURSOR · TOUCH THE FACE" };

  const setTemporaryExpression = (next: Expression) => onExpressionChange(next);

  return (
    <div className="character-stage">
      <Canvas
        className="character-canvas"
        camera={{ position: [0, 0.08, 5.4], fov: 31 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onPointerMissed={() => onExpressionChange("neutral")}
      >
        <ambientLight intensity={1.75} color="#f5e9dc" />
        <directionalLight position={[4, 6, 5]} intensity={3.6} color="#f0d2b7" />
        <directionalLight position={[-4, 2, 3]} intensity={2.1} color="#9b7f87" />
        <pointLight position={[0, -1, 3]} intensity={1.1} color="#c2a474" />
        <Character expression={expression} onExpressionChange={onExpressionChange} />
      </Canvas>

      <button
        type="button"
        className={`face-sticker sticker-think ${expression === "think" ? "active" : ""}`}
        onPointerEnter={() => setTemporaryExpression("think")}
        onFocus={() => setTemporaryExpression("think")}
        onClick={() => setTemporaryExpression("think")}
        aria-label={language === "zh" ? "切换为思考表情" : "Switch to thinking expression"}
      >
        <span>∑</span>{labels.think}
      </button>
      <button
        type="button"
        className={`face-sticker sticker-build ${expression === "build" ? "active" : ""}`}
        onPointerEnter={() => setTemporaryExpression("build")}
        onFocus={() => setTemporaryExpression("build")}
        onClick={() => setTemporaryExpression("build")}
        aria-label={language === "zh" ? "切换为构建表情" : "Switch to building expression"}
      >
        <span>AI</span>{labels.build}
      </button>
      <button
        type="button"
        className={`face-sticker sticker-move ${expression === "move" ? "active" : ""}`}
        onPointerEnter={() => setTemporaryExpression("move")}
        onFocus={() => setTemporaryExpression("move")}
        onClick={() => setTemporaryExpression("move")}
        aria-label={language === "zh" ? "切换为运动表情" : "Switch to moving expression"}
      >
        <span>42.2</span>{labels.move}
      </button>
      <p className="character-hint">{labels.hint}</p>
    </div>
  );
}
