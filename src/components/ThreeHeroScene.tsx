import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHeroSceneProps {
  className?: string;
}

export const ThreeHeroScene: React.FC<ThreeHeroSceneProps> = ({ className = 'w-full h-56' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 224;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainDirectional = new THREE.DirectionalLight(0x059669, 2.5); // Emerald accent
    mainDirectional.position.set(5, 8, 5);
    scene.add(mainDirectional);

    const secondaryLight = new THREE.DirectionalLight(0x38bdf8, 2.0); // Cyan/Sky accent
    secondaryLight.position.set(-6, -4, 4);
    scene.add(secondaryLight);

    const pointLight = new THREE.PointLight(0xf59e0b, 2.0, 15); // Warm gold glow for escrow
    pointLight.position.set(0, 1.2, 2.5);
    scene.add(pointLight);

    // Group to hold all 3D task marketplace visual elements
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Central Hero Element: 3D Escrow & Security Shield / Geometric Vault
    const vaultGroup = new THREE.Group();
    masterGroup.add(vaultGroup);

    // Outer floating kinetic gyro-ring 1
    const ringGeo1 = new THREE.TorusGeometry(1.65, 0.045, 16, 64);
    const ringMat1 = new THREE.MeshPhongMaterial({
      color: 0x10b981,
      emissive: 0x064e3b,
      shininess: 90,
      wireframe: false
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    vaultGroup.add(ring1);

    // Outer kinetic gyro-ring 2
    const ringGeo2 = new THREE.TorusGeometry(1.4, 0.035, 16, 64);
    const ringMat2 = new THREE.MeshPhongMaterial({
      color: 0x0284c7,
      emissive: 0x075985,
      shininess: 85
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2.8;
    vaultGroup.add(ring2);

    // Central Escrow Vault Core (Octahedron Diamond Vault with Glowing Inner Core)
    const coreGeo = new THREE.OctahedronGeometry(0.72, 0);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x059669,
      emissive: 0x047857,
      shininess: 120,
      flatShading: true,
      transparent: true,
      opacity: 0.88
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    vaultGroup.add(coreMesh);

    // Inner sparkling core
    const innerGeo = new THREE.IcosahedronGeometry(0.38, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      wireframe: true
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    vaultGroup.add(innerMesh);

    // 2. Surrounding Floating Category & Work Spheres / Task Tokens
    const taskNodes: { group: THREE.Group; basePos: THREE.Vector3; speed: number }[] = [];
    const nodeColors = [0x10b981, 0x0284c7, 0xf59e0b, 0x8b5cf6, 0xec4899];
    const nodeCoords = [
      [-2.2, 0.8, -0.4],
      [2.1, 0.9, -0.2],
      [-1.8, -1.2, 0.2],
      [1.9, -1.1, -0.5],
      [0, 1.8, -0.6]
    ];

    nodeCoords.forEach((coord, i) => {
      const nodePvt = new THREE.Group();
      nodePvt.position.set(coord[0], coord[1], coord[2]);

      // Outer pill/sphere
      const nGeo = new THREE.SphereGeometry(0.24, 20, 20);
      const nMat = new THREE.MeshPhongMaterial({
        color: nodeColors[i % nodeColors.length],
        shininess: 80,
        emissive: 0x111827
      });
      const nMesh = new THREE.Mesh(nGeo, nMat);
      nodePvt.add(nMesh);

      // Tiny halo around each node
      const hGeo = new THREE.RingGeometry(0.32, 0.36, 24);
      const hMat = new THREE.MeshBasicMaterial({
        color: nodeColors[i % nodeColors.length],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const hMesh = new THREE.Mesh(hGeo, hMat);
      nodePvt.add(hMesh);

      masterGroup.add(nodePvt);
      taskNodes.push({ group: nodePvt, basePos: new THREE.Vector3(...coord), speed: 0.8 + i * 0.25 });
    });

    // 3. Cinematic Floating Particles (Connecting Worker & Poster Constellation)
    const particleCount = 65;
    const partGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      posArray[p] = (Math.random() - 0.5) * 8.5;
      posArray[p + 1] = (Math.random() - 0.5) * 5.0;
      posArray[p + 2] = (Math.random() - 0.5) * 4.0;
    }
    partGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const partMat = new THREE.PointsMaterial({
      size: 0.055,
      color: 0x34d399,
      transparent: true,
      opacity: 0.65
    });
    const particles = new THREE.Points(partGeo, partMat);
    masterGroup.add(particles);

    // Interactive Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 360;
      const newH = container.clientHeight || 224;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    const startTime = performance.now();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;

      // Parallax damping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      masterGroup.rotation.y = targetX * 0.35 + Math.sin(time * 0.3) * 0.08;
      masterGroup.rotation.x = -targetY * 0.25 + Math.cos(time * 0.25) * 0.06;

      // Vault rotations
      ring1.rotation.x = time * 0.6;
      ring1.rotation.y = time * 0.45;
      ring2.rotation.y = -time * 0.5;
      ring2.rotation.z = time * 0.35;

      coreMesh.rotation.x = time * 0.7;
      coreMesh.rotation.y = time * 0.9;
      innerMesh.rotation.x = -time * 1.1;
      innerMesh.rotation.y = -time * 1.3;

      vaultGroup.position.y = Math.sin(time * 1.4) * 0.12;

      // Task nodes orbital motion
      taskNodes.forEach((node, idx) => {
        node.group.position.y = node.basePos.y + Math.sin(time * node.speed + idx) * 0.16;
        node.group.position.x = node.basePos.x + Math.cos(time * 0.5 * node.speed) * 0.08;
        node.group.rotation.z += 0.015;
      });

      // Particle rotation
      particles.rotation.y = time * 0.05;
      particles.rotation.x = time * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
      title="Interactive 3D Kinetic Escrow Scene - Move mouse or touch to tilt"
    />
  );
};
