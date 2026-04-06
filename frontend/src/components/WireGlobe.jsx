import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------
   Dust sphere (visual only)
--------------------------------*/
function DustSphere({
  count = 1800,
  radius = 0.85,
  spread = 0.28,
  color = "#ffffff",
}) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const r = radius + (Math.random() - 0.5) * spread;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }

    return pos;
  }, [count, radius, spread]);

  // gentle idle rotation
  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.12;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color={color}
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* -----------------------------------------
   Cursor-follow logic (movement / inertia)
------------------------------------------*/
function GlobeFollower({ mouse, groupRef, base, target }) {
  useFrame(() => {
    if (!groupRef.current) return;

    target.current.set(
      base.current.x + (mouse?.x || 0) * 2.2,
      base.current.y - (mouse?.y || 0) * 0.9,
      0
    );

    // smooth inertial movement (THIS matches the video)
    groupRef.current.position.lerp(target.current, 0.06);
  });

  return null;
}

/* ------------------------------
   Main component
--------------------------------*/
export default function WireGlobe({ mouse }) {
  const groupRef = useRef();
  const base = useRef(new THREE.Vector3(-1.4, 0.3, 0));
  const target = useRef(new THREE.Vector3());

  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 w-[100%]">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.9} />

        {/* cursor attraction logic */}
        <GlobeFollower
          mouse={mouse}
          groupRef={groupRef}
          base={base}
          target={target}
        />

        {/* dust sphere */}
        <group ref={groupRef}>
          <DustSphere />
        </group>
      </Canvas>
    </div>
  );
}
