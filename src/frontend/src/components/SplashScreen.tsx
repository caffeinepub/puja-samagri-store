import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// 3D Shankha (Conch Shell) mesh built procedurally
function ShankhaMesh({ scale = 1 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const floatOffset = useRef(0);

  // Build conch shell geometry using LatheGeometry
  const conchGeometry = (() => {
    const points: THREE.Vector2[] = [];
    // Pointed tip at top
    points.push(new THREE.Vector2(0.0, 1.7));
    points.push(new THREE.Vector2(0.08, 1.55));
    points.push(new THREE.Vector2(0.18, 1.3));
    points.push(new THREE.Vector2(0.3, 1.0));
    // Expanding belly
    points.push(new THREE.Vector2(0.5, 0.6));
    points.push(new THREE.Vector2(0.7, 0.2));
    points.push(new THREE.Vector2(0.78, -0.1));
    points.push(new THREE.Vector2(0.75, -0.4));
    // Narrowing toward neck
    points.push(new THREE.Vector2(0.6, -0.7));
    points.push(new THREE.Vector2(0.5, -0.9));
    // Flared lip/opening
    points.push(new THREE.Vector2(0.55, -1.05));
    points.push(new THREE.Vector2(0.7, -1.2));
    points.push(new THREE.Vector2(0.85, -1.35));
    points.push(new THREE.Vector2(0.95, -1.4));
    return new THREE.LatheGeometry(points, 64);
  })();

  // Inner cavity geometry
  const innerGeometry = (() => {
    const innerPoints: THREE.Vector2[] = [];
    innerPoints.push(new THREE.Vector2(0.0, 1.65));
    innerPoints.push(new THREE.Vector2(0.04, 1.5));
    innerPoints.push(new THREE.Vector2(0.09, 1.25));
    innerPoints.push(new THREE.Vector2(0.16, 0.95));
    innerPoints.push(new THREE.Vector2(0.26, 0.55));
    innerPoints.push(new THREE.Vector2(0.36, 0.15));
    innerPoints.push(new THREE.Vector2(0.44, -0.15));
    innerPoints.push(new THREE.Vector2(0.48, -0.45));
    innerPoints.push(new THREE.Vector2(0.44, -0.75));
    innerPoints.push(new THREE.Vector2(0.35, -0.88));
    return new THREE.LatheGeometry(innerPoints, 64);
  })();

  // Spiral ridge tubes along the conch
  const spiralTubes = (() => {
    const tubes: THREE.TubeGeometry[] = [];
    for (let i = 0; i < 3; i++) {
      const t = i / 3;
      const curve = new THREE.CatmullRomCurve3(
        Array.from({ length: 20 }, (_, j) => {
          const angle = (j / 19) * Math.PI * 2 + t * Math.PI * 0.8;
          const progress = j / 19;
          const radius = 0.25 + progress * 0.35 - t * 0.08;
          const y = 1.3 - progress * 2.6 - t * 0.35;
          return new THREE.Vector3(
            Math.cos(angle) * radius,
            y,
            Math.sin(angle) * radius,
          );
        }),
      );
      tubes.push(new THREE.TubeGeometry(curve, 30, 0.025, 8, false));
    }
    return tubes;
  })();

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    floatOffset.current += delta;
    groupRef.current.rotation.y += delta * 0.6;
    groupRef.current.position.y = Math.sin(floatOffset.current * 1.2) * 0.08;
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Main conch body */}
      <mesh geometry={conchGeometry} castShadow>
        <meshStandardMaterial
          color="#e8c870"
          metalness={0.55}
          roughness={0.28}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* Inner cavity - slightly darker */}
      <mesh geometry={innerGeometry}>
        <meshStandardMaterial
          color="#c9a44a"
          metalness={0.3}
          roughness={0.5}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Spiral ridges */}
      {spiralTubes.map((tubeGeo, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static array
        <mesh key={i} geometry={tubeGeo}>
          <meshStandardMaterial
            color="#b8903c"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      ))}
      {/* Tip accent */}
      <mesh position={[0, 1.72, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#f0d060" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function SplashScene() {
  return (
    <Canvas
      style={{ background: "transparent", width: "320px", height: "340px" }}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
    >
      {/* Warm ambient */}
      <ambientLight intensity={0.6} color="#ffe0a0" />
      {/* Main golden key light */}
      <pointLight
        position={[3, 4, 3]}
        intensity={60}
        color="#ffd580"
        castShadow
      />
      {/* Rim light from behind */}
      <pointLight position={[-2, 1, -3]} intensity={20} color="#ff8040" />
      {/* Fill light */}
      <pointLight position={[0, -3, 2]} intensity={15} color="#ffffff" />
      <ShankhaMesh scale={1.0} />
    </Canvas>
  );
}

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const DURATION = 3500;

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
    }, 50);

    const timer = setTimeout(() => {
      setVisible(false);
      clearInterval(interval);
      setTimeout(onComplete, 500);
    }, DURATION);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #2a0505 0%, #4a0a0a 25%, #7b1f1f 55%, #c2612a 85%, #e8840a 100%)",
          }}
          data-ocid="splash.panel"
        >
          {/* Decorative mandala rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="absolute rounded-full border border-yellow-400/10"
              style={{ width: 420, height: 420 }}
            />
            <div
              className="absolute rounded-full border border-yellow-400/15"
              style={{ width: 340, height: 340 }}
            />
            <div
              className="absolute rounded-full border border-yellow-300/20"
              style={{ width: 260, height: 260 }}
            />
          </div>

          {/* Floating particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              // biome-ignore lint/suspicious/noArrayIndexKey: static decorative
              key={i}
              className="absolute w-1 h-1 rounded-full bg-yellow-300/40"
              style={{
                left: `${10 + ((i * 7) % 80)}%`,
                top: `${10 + ((i * 11) % 80)}%`,
              }}
              animate={{
                y: [-10, -30, -10],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + (i % 3) * 0.7,
                repeat: Number.POSITIVE_INFINITY,
                delay: (i * 0.3) % 2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Om symbol */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute text-yellow-200 text-8xl font-bold select-none pointer-events-none"
            style={{ top: "8%", right: "8%" }}
          >
            ॐ
          </motion.div>

          {/* 3D Shankha Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative z-10"
          >
            <div
              className="rounded-full"
              style={{
                filter:
                  "drop-shadow(0 0 30px rgba(228, 180, 80, 0.6)) drop-shadow(0 0 60px rgba(200, 100, 20, 0.4))",
              }}
            >
              <SplashScene />
            </div>
          </motion.div>

          {/* App name + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="relative z-10 text-center mt-2"
          >
            <h1
              className="text-5xl font-bold tracking-wide"
              style={{
                color: "#ffd700",
                textShadow:
                  "0 0 20px rgba(255, 200, 50, 0.7), 0 2px 8px rgba(0,0,0,0.6)",
                fontFamily: "serif",
              }}
            >
              समुद्रज
            </h1>
            <p
              className="text-lg mt-2 tracking-[0.3em] font-medium"
              style={{
                color: "#f0c060",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              SAMUDRAJ
            </p>
            <p
              className="text-sm mt-1 tracking-[0.2em]"
              style={{ color: "rgba(255,220,120,0.7)" }}
            >
              Sacred · Pure · Divine
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48"
          >
            <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #c8a020, #ffd700, #c8a020)",
                  width: `${progress}%`,
                  transition: "width 0.05s linear",
                }}
              />
            </div>
            <p
              className="text-center text-xs mt-2"
              style={{ color: "rgba(255,215,100,0.5)" }}
            >
              Loading blessings…
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
