import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function ShankhaLoaderMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const floatOffset = useRef(0);

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
    return new THREE.LatheGeometry(points, 48);
  })();

  const spiralTubes = (() => {
    const tubes: THREE.TubeGeometry[] = [];
    for (let i = 0; i < 3; i++) {
      const t = i / 3;
      const curve = new THREE.CatmullRomCurve3(
        Array.from({ length: 16 }, (_, j) => {
          const angle = (j / 15) * Math.PI * 2 + t * Math.PI * 0.8;
          const progress = j / 15;
          const radius = 0.25 + progress * 0.35 - t * 0.08;
          const y = 1.3 - progress * 2.6 - t * 0.35;
          return new THREE.Vector3(
            Math.cos(angle) * radius,
            y,
            Math.sin(angle) * radius,
          );
        }),
      );
      tubes.push(new THREE.TubeGeometry(curve, 20, 0.025, 6, false));
    }
    return tubes;
  })();

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    floatOffset.current += delta;
    groupRef.current.rotation.y += delta * 1.2;
    groupRef.current.position.y = Math.sin(floatOffset.current * 1.5) * 0.06;
  });

  return (
    <group ref={groupRef} scale={0.95}>
      <mesh geometry={conchGeometry}>
        <meshStandardMaterial
          color="#e8c870"
          metalness={0.55}
          roughness={0.28}
        />
      </mesh>
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
      <mesh position={[0, 1.72, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#f0d060" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

interface ShankhaLoaderProps {
  size?: number;
  message?: string;
  className?: string;
}

export function ShankhaLoader({
  size = 80,
  message,
  className = "",
}: ShankhaLoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
      data-ocid="loader.loading_state"
    >
      <div style={{ width: size, height: size }}>
        <Canvas
          style={{
            background: "transparent",
            width: `${size}px`,
            height: `${size}px`,
          }}
          camera={{ position: [0, 0, 7], fov: 42 }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.7} color="#ffe0a0" />
          <pointLight position={[3, 4, 3]} intensity={50} color="#ffd580" />
          <pointLight position={[-2, 1, -2]} intensity={15} color="#ff8040" />
          <ShankhaLoaderMesh />
        </Canvas>
      </div>
      {message && (
        <p className="text-sm font-medium" style={{ color: "#c8860a" }}>
          {message}
        </p>
      )}
    </div>
  );
}

// Full-page centered loader
export function ShankhaPageLoader({
  message = "Loading…",
}: { message?: string }) {
  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center"
      data-ocid="page.loading_state"
    >
      <ShankhaLoader size={120} message={message} />
    </div>
  );
}
