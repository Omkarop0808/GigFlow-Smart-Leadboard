import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

function GlowParticles() {
  const ref = useRef<THREE.Points>(null);
  const time = useRef(0);
  const positions = useMemo(() => {
    const count = 60;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    time.current += delta;
    ref.current.rotation.y = time.current * 0.02;
    ref.current.rotation.x = Math.sin(time.current * 0.1) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ff8c00"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function BackgroundScene() {
  const [useWebGL, setUseWebGL] = useState(true);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-10 opacity-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,140,0,0.15),_transparent_55%)]"
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      {useWebGL && (
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1.25]}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "low-power",
          }}
          onCreated={({ gl }) => {
            const canvas = gl.domElement;
            const onLost = (event: Event) => {
              event.preventDefault();
              setUseWebGL(false);
            };
            canvas.addEventListener("webglcontextlost", onLost, { once: true });
          }}
          onError={() => setUseWebGL(false)}
        >
          <ambientLight intensity={0.2} />
          <pointLight position={[4, 4, 4]} intensity={1.2} color="#f5a623" />
          <GlowParticles />
        </Canvas>
      )}
    </motion.div>
  );
}
