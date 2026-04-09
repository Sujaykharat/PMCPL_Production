"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const ASSETS = [
  "/assets/vintage/newspaper.png",
  "/assets/vintage/resume.png",
  "/assets/vintage/fragments.png",
  "/assets/vintage/crumpled.png",
];

export const FloatingVintageAssets = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const textureLoader = new THREE.TextureLoader();
    const items: {
      mesh: THREE.Mesh;
      speed: number;
      offset: number;
      rotSpeed: THREE.Vector3;
    }[] = [];

    // Create a pool of floating assets
    const count = 12;
    for (let i = 0; i < count; i++) {
      const texture = textureLoader.load(ASSETS[i % ASSETS.length]);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: Math.random() * 0.1 + 0.05, // 0.05 - 0.15 range
        side: THREE.DoubleSide,
      });

      // Simple plane with slight variation in aspect ratio
      const geometry = new THREE.PlaneGeometry(1.5, 2);
      const mesh = new THREE.Mesh(geometry, material);

      // Random positioning in a 3D volume
      mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );

      // Random initial rotation
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      scene.add(mesh);

      items.push({
        mesh,
        speed: Math.random() * 0.5 + 0.2, // Movement speed
        offset: Math.random() * Math.PI * 2, // Animation phase offset
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.002
        ),
      });
    }

    // Parallax state
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);

    const onMouseMove = (event: MouseEvent) => {
      targetMouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
      targetMouse.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Smooth mouse movement
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      items.forEach((item) => {
        const { mesh, speed, offset, rotSpeed } = item;

        // Floating Motion (Sinusoidal)
        mesh.position.y += Math.sin(elapsedTime * speed + offset) * 0.002;
        mesh.position.x += Math.cos(elapsedTime * speed * 0.5 + offset) * 0.001;

        // Rotation
        mesh.rotation.x += rotSpeed.x;
        mesh.rotation.y += rotSpeed.y;
        mesh.rotation.z += rotSpeed.z;

        // Mouse Parallax (Z-depth influences strength)
        const parallaxStrength = (mesh.position.z + 5) / 10;
        mesh.position.x += (mouse.x * parallaxStrength - (mesh.position.x - mesh.position.x)) * 0.01;
        mesh.position.y += (mouse.y * parallaxStrength - (mesh.position.y - mesh.position.y)) * 0.01;
      });

      // Subtle camera tilt
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        filter: "blur(1.5px)", // Subtle blur for background feel
      }}
    />
  );
};
