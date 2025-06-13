// src/components/Viewport.tsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useScene } from "../states/SceneContext";

export default function Viewport() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { emitters } = useScene();

  useEffect(() => {
    if (!canvasRef.current) return;
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    const width = window.innerWidth - 64; // Adjust for sidebar
    const height = window.innerHeight - 44 - 128; // Adjust for header/footer
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(5, 5, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.GridHelper(50, 50));
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    // Particle system
    const particleSystems: { [key: string]: THREE.Points } = {};

    const updateParticles = () => {
      emitters.forEach((emitter) => {
        if (!particleSystems[emitter.id]) {
          const geometry = new THREE.BufferGeometry();
          const positions: number[] = [];
          const colors: number[] = [];
          const sizes: number[] = [];

          const color = new THREE.Color(emitter.properties.color);
          for (let i = 0; i < emitter.properties.count; i++) {
            positions.push(...emitter.position);
            colors.push(color.r, color.g, color.b);
            sizes.push(emitter.properties.size);
          }

          geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
          geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
          geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

          const material = new THREE.PointsMaterial({
            vertexColors: true,
            size: emitter.properties.size,
            transparent: true,
            // Add texture later: map: textureLoader.load("path/to/particle.png"),
          });

          particleSystems[emitter.id] = new THREE.Points(geometry, material);
          scene.add(particleSystems[emitter.id]);
        }

        // Update positions based on velocity, gravity, etc.
        const positions = particleSystems[emitter.id].geometry.attributes.position.array as number[];
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += emitter.properties.velocity[0] * 0.016; // Delta time approximation
          positions[i + 1] += emitter.properties.velocity[1] * 0.016 - emitter.properties.gravity * 0.016;
          positions[i + 2] += emitter.properties.velocity[2] * 0.016;
        }
        particleSystems[emitter.id].geometry.attributes.position.needsUpdate = true;
      });
    };

    const animate = () => {
      updateParticles();
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, [emitters]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}