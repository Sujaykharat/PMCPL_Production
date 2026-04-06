import { useEffect, useRef } from "react";
import * as THREE from "three";
import { DEPTH_GALLERY_RELOAD_KEY } from "@/lib/depthGalleryReload";

interface DepthGalleryCanvasProps {
  isReverse?: boolean;
  onActiveIndexChange: (index: number) => void;
  onProgressChange: (progress: number) => void;
  onFinaleProgressChange: (progress: number) => void;
  slides: { image: string; title: string; copy: string }[];
  finaleScrollRange: number;
  entranceRoute: string;
}

export const DepthGalleryCanvas = ({
  isReverse = false,
  onActiveIndexChange,
  onProgressChange,
  onFinaleProgressChange,
  slides,
  finaleScrollRange,
  entranceRoute
}: DepthGalleryCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeIndexRef = useRef(0);
  const navigatedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const lastIndex = slides.length - 1;
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const textureLoader = new THREE.TextureLoader();
    const planes: THREE.Mesh[] = [];
    const planeGeometry = new THREE.PlaneGeometry(4.8, 3.0, 1, 1);
    const stepDistance = 2.9;
    const maxScroll = stepDistance * (slides.length - 1);
    const maxScrollExtended = maxScroll + finaleScrollRange;
    const cameraStartZ = 6;
    const cameraMinZ = cameraStartZ - maxScrollExtended - 0.35;

    slides.forEach((slide, index) => {
      const texture = textureLoader.load(slide.image);
      texture.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.16 });
      material.depthWrite = false;
      const plane = new THREE.Mesh(planeGeometry, material);
      const sideX = index % 2 === 0 ? -1.7 : 1.7;
      plane.position.set(sideX, 0.05, -index * stepDistance);
      plane.rotation.z = THREE.MathUtils.degToRad(index % 2 === 0 ? -1.4 : 1.4);
      plane.rotation.y = THREE.MathUtils.degToRad(index % 2 === 0 ? 6 : -6);
      planes.push(plane);
      scene.add(plane);
    });

    let scrollTarget = isReverse ? maxScrollExtended : 0;
    let scrollCurrent = isReverse ? maxScrollExtended : 0;
    let previousScrollCurrent = isReverse ? maxScrollExtended : 0;
    let velocity = 0;
    const scrollSmoothing = 0.065;
    const velocityDamping = 0.12;
    const velocityMax = 1.8;

    if (isReverse) navigatedRef.current = true;

    let targetIndex = isReverse ? slides.length : 0;
    let lastWheelTime = 0;
    const wheelCooldown = 650; // ms between allowed jumps

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      
      // Cooldown to prevent multiple jumps from a single heavy scroll
      if (now - lastWheelTime < wheelCooldown) return;
      
      // Minimum threshold to ignore minor mouse wheel movements
      if (Math.abs(e.deltaY) < 12) return;

      if (e.deltaY > 0) {
        // Scroll Forward
        targetIndex = Math.min(targetIndex + 1, slides.length);
      } else {
        // Scroll Backward
        targetIndex = Math.max(targetIndex - 1, 0);
      }
      
      // Update target position based on snap index
      if (targetIndex < slides.length) {
        scrollTarget = targetIndex * stepDistance;
      } else {
        // Last point is the finale
        scrollTarget = maxScrollExtended;
      }
      
      lastWheelTime = now;
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight, false);
    };

    window.addEventListener("resize", onResize);

    let animationFrameId: number;
    let time = 0;

    const update = () => {
      animationFrameId = requestAnimationFrame(update);
      time += 0.015;

      scrollCurrent = THREE.MathUtils.lerp(scrollCurrent, scrollTarget, scrollSmoothing);
      const rawVelocity = scrollCurrent - previousScrollCurrent;
      velocity = THREE.MathUtils.lerp(velocity, rawVelocity, velocityDamping);
      velocity = THREE.MathUtils.clamp(velocity, -velocityMax, velocityMax);
      previousScrollCurrent = scrollCurrent;

      camera.position.z = THREE.MathUtils.clamp(cameraStartZ - scrollCurrent, cameraMinZ, 10);

      const finaleT = THREE.MathUtils.clamp(scrollCurrent > maxScroll ? (scrollCurrent - maxScroll) / finaleScrollRange : 0, 0, 1);
      onFinaleProgressChange(finaleT);

      const stepFloat = scrollCurrent / stepDistance;
      const focusStepFloat = Math.min(stepFloat, lastIndex);
      const boundedStep = THREE.MathUtils.clamp(Math.round(stepFloat), 0, slides.length - 1);
      
      if (activeIndexRef.current !== boundedStep) {
        activeIndexRef.current = boundedStep;
        onActiveIndexChange(boundedStep);
      }

      onProgressChange(THREE.MathUtils.clamp(scrollCurrent / maxScroll, 0, 1));

      if (finaleT < 0.9) navigatedRef.current = false;
      if (finaleT >= 0.98 && !navigatedRef.current && scrollTarget > maxScrollExtended - 0.05) {
        navigatedRef.current = true;
        try { sessionStorage.setItem(DEPTH_GALLERY_RELOAD_KEY, "1"); } catch {}
        window.location.assign(entranceRoute);
      }

      const velocityFactor = THREE.MathUtils.clamp(Math.abs(velocity) / velocityMax, 0, 1);

      planes.forEach((plane, index) => {
        const offset = Math.abs(focusStepFloat - index);
        let focus = 1 - THREE.MathUtils.clamp(offset / 1.15, 0, 1);
        focus = focus * focus * (3 - 2 * focus);

        let posX = (index % 2 === 0 ? -1.7 : 1.7);
        let posY = 0.05;
        let rotX = 0;
        let rotY = (index % 2 === 0 ? 6 : -6) * (1 - focus * 0.8);
        let rotZ = (index % 2 === 0 ? -1.4 : 1.4) * (1 - focus * 0.8);

        if (index === 0) posX += (1 - focus) * (index % 2 === 0 ? -1.8 : 1.8);
        else if (index === 1) { posY += (1 - focus) * 1.5; rotX = (1 - focus) * 5; }
        else if (index === 2) { rotZ += Math.sin(time * 0.8) * 2 + (1-focus) * 15 * (index % 2 === 0 ? 1 : -1); posX += (1-focus) * 1.2 * (index % 2 === 0 ? -1 : 1); }
        else if (index === 3) { posX += (1 - focus) * 1.4 * (index % 2 === 0 ? -1 : 1); posY += (1 - focus) * 0.8; rotY += (1 - focus) * 12; }

        const breathing = index === activeIndexRef.current ? Math.sin(time) * 0.025 : 0;
        plane.position.x = posX + velocity * 0.04 * (index % 2 === 0 ? 1 : -1);
        plane.position.y = posY + velocity * 0.02 + breathing;
        plane.rotation.x = THREE.MathUtils.degToRad(rotX);
        plane.rotation.y = THREE.MathUtils.degToRad(rotY + (velocity * 8));
        plane.rotation.z = THREE.MathUtils.degToRad(rotZ + (velocity * 3.5));

        let scale = 0.68 + focus * 0.28 + velocityFactor * 0.03;
        if (index === lastIndex && finaleT > 0) {
          const ease = finaleT * finaleT * (3 - 2 * finaleT);
          scale *= 1 + ease * 12;
          plane.rotation.y = THREE.MathUtils.degToRad(rotY + velocity * 8) * (1 - ease * 0.95);
          plane.rotation.z = THREE.MathUtils.degToRad(rotZ + velocity * 3.5) * (1 - ease * 0.98);
          plane.position.x += ease * 1.05;
          plane.position.y += ease * 0.15;
        }

        plane.scale.setScalar(scale);
        (plane.material as THREE.MeshBasicMaterial).opacity = 0.012 + focus * 0.988 + (index === lastIndex && finaleT > 0.15 ? finaleT * 0.45 : 0);
      });

      const easeF = finaleT * finaleT * (3 - 2 * finaleT);
      camera.position.x = easeF * 0.6;
      camera.position.y = easeF * 0.1;
      camera.fov = 45 - easeF * 20;
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);
    };

    update();

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
      planes.forEach(p => { (p.material as THREE.Material).dispose(); p.geometry.dispose(); });
      renderer.dispose();
    };
  }, [slides, finaleScrollRange, entranceRoute, isReverse, onActiveIndexChange, onProgressChange, onFinaleProgressChange]);

  return <canvas ref={canvasRef} className="webgl" />;
};
