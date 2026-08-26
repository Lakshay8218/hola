import { useEffect, useRef } from "react";
import {
  AmbientLight,
  Color,
  DirectionalLight,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const BASE_X = -0.12;
const BASE_Y = -0.35;

export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearAlpha(0);

    const scene = new Scene();
    const camera = new PerspectiveCamera(36, 1, 0.1, 30);
    camera.position.set(0, 0, 6);

    const group = new Group();
    group.position.set(0.4, -0.04, 0);
    group.rotation.set(BASE_X, BASE_Y, -0.01);
    scene.add(group);

    const geometry = new RoundedBoxGeometry(3.45, 1.95, 1.8, 5, 0.18);
    const material = new MeshPhysicalMaterial({
      color: new Color("#ecfbff"),
      roughness: 0.94,
      metalness: 0,
      transmission: 0.02,
      transparent: true,
      opacity: 0.035,
      emissive: new Color("#38d8ff"),
      emissiveIntensity: 0.01,
    });
    const mesh = new Mesh(geometry, material);
    group.add(mesh);

    const edgeGeometry = new EdgesGeometry(geometry, 32);
    const edgeMaterial = new LineBasicMaterial({ color: "#b9f5ff", transparent: true, opacity: 0.08 });
    group.add(new LineSegments(edgeGeometry, edgeMaterial));

    scene.add(new AmbientLight("#ffffff", 0.3));
    const key = new DirectionalLight("#ffffff", 1.05);
    key.position.set(-2, 4, 5);
    scene.add(key);
    const rim = new PointLight("#38d8ff", 0.9);
    rim.position.set(4, 1, 3);
    scene.add(rim);

    let pointerX = 0;
    let pointerY = 0;
    let hovered = false;
    let frame = 0;

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    const renderUntilSettled = () => {
      const targetX = BASE_X + pointerY * 0.045;
      const targetY = BASE_Y + pointerX * 0.065;
      const targetZ = hovered ? 0.1 : 0;
      group.rotation.x += (targetX - group.rotation.x) * 0.14;
      group.rotation.y += (targetY - group.rotation.y) * 0.14;
      group.position.z += (targetZ - group.position.z) * 0.14;
      material.opacity += ((hovered ? 0.17 : 0.035) - material.opacity) * 0.14;
      material.emissiveIntensity += ((hovered ? 0.08 : 0.01) - material.emissiveIntensity) * 0.14;
      edgeMaterial.opacity += ((hovered ? 0.22 : 0.08) - edgeMaterial.opacity) * 0.14;
      renderer.render(scene, camera);

      const unsettled = Math.abs(targetX - group.rotation.x) > 0.001
        || Math.abs(targetY - group.rotation.y) > 0.001
        || Math.abs(targetZ - group.position.z) > 0.001
        || Math.abs((hovered ? 0.17 : 0.035) - material.opacity) > 0.002;
      frame = unsettled ? window.requestAnimationFrame(renderUntilSettled) : 0;
    };

    const requestRender = () => {
      if (!frame && !document.hidden) frame = window.requestAnimationFrame(renderUntilSettled);
    };
    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointerY = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
      requestRender();
    };
    const onPointerEnter = () => { hovered = true; requestRender(); };
    const onPointerLeave = () => { hovered = false; pointerX = 0; pointerY = 0; requestRender(); };
    const onVisibility = () => {
      if (document.hidden && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else {
        requestRender();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerenter", onPointerEnter);
    canvas.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    resize();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerenter", onPointerEnter);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      edgeGeometry.dispose();
      edgeMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div className="hero-webgl" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
