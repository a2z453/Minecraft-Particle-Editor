import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Viewport() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight - 44);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - 44), 0.1, 1000);
    camera.position.set(5, 5, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Grid helper
    scene.add(new THREE.GridHelper(50, 50));

    // Ambient light
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight - 44);
      camera.aspect = window.innerWidth / (window.innerHeight - 44);
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); renderer.dispose(); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}