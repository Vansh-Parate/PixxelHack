import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles
    const particleCount = 50;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.8, 0.6),
        transparent: true,
        opacity: 0.6
      });
      
      const particle = new THREE.Mesh(geometry, material);
      
      // Random position
      particle.position.x = (Math.random() - 0.5) * 10;
      particle.position.y = (Math.random() - 0.5) * 10;
      particle.position.z = (Math.random() - 0.5) * 10;
      
      // Store original position for floating animation
      particle.userData = {
        originalX: particle.position.x,
        originalY: particle.position.y,
        originalZ: particle.position.z,
        speed: Math.random() * 0.02 + 0.01,
        offset: Math.random() * Math.PI * 2
      };
      
      particles.push(particle);
      scene.add(particle);
    }
    
    particlesRef.current = particles;

    // Mouse move handler
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Update particles
      particles.forEach((particle, index) => {
        const { originalX, originalY, originalZ, speed, offset } = particle.userData;
        
        // Floating animation
        particle.position.x = originalX + Math.sin(time * speed + offset) * 0.5;
        particle.position.y = originalY + Math.cos(time * speed + offset) * 0.5;
        particle.position.z = originalZ + Math.sin(time * speed * 0.5 + offset) * 0.3;
        
        // Mouse interaction
        const distanceToMouse = Math.sqrt(
          Math.pow(particle.position.x - mouseRef.current.x * 3, 2) +
          Math.pow(particle.position.y - mouseRef.current.y * 3, 2)
        );
        
        if (distanceToMouse < 2) {
          const force = (2 - distanceToMouse) * 0.1;
          particle.position.x += (particle.position.x - mouseRef.current.x * 3) * force;
          particle.position.y += (particle.position.y - mouseRef.current.y * 3) * force;
        }
        
        // Rotation
        particle.rotation.x += 0.01;
        particle.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of Three.js objects
      particles.forEach(particle => {
        particle.geometry.dispose();
        particle.material.dispose();
      });
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
};

export default ParticleBackground; 