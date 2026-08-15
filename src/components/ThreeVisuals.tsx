import React, { useEffect, useRef } from 'react';

interface ThreeVisualsProps {
  intensity?: 'high' | 'medium' | 'subtle';
  className?: string;
}

export const ThreeVisuals: React.FC<ThreeVisualsProps> = ({
  intensity = 'high',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          width = canvas.width = entry.contentRect.width;
          height = canvas.height = entry.contentRect.height;
        }
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // 3D Orbital Particle Definition
    interface Particle3D {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      radius: number;
      color: string;
      orbitRadius: number;
      orbitAngle: number;
      orbitSpeed: number;
      orbitTilt: number;
    }

    const particleCount = intensity === 'high' ? 65 : intensity === 'medium' ? 40 : 25;
    const particles: Particle3D[] = [];

    const colors = [
      'rgba(59, 130, 246, ', // Blue
      'rgba(99, 102, 241, ', // Indigo
      'rgba(168, 85, 247, ', // Purple
      'rgba(14, 165, 233, ', // Sky
      'rgba(16, 185, 129, ', // Emerald
    ];

    for (let i = 0; i < particleCount; i++) {
      const orbitRadius = Math.random() * (Math.min(width, height) * 0.42) + 40;
      const orbitAngle = Math.random() * Math.PI * 2;
      const orbitSpeed = (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1);
      const orbitTilt = (Math.random() - 0.5) * 1.2;

      particles.push({
        x: 0,
        y: 0,
        z: Math.random() * 200 - 100,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2.8 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        orbitRadius,
        orbitAngle,
        orbitSpeed,
        orbitTilt,
      });
    }

    // Mouse tracking for 3D parallax tilt
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let globalRotation = 0;

    const render = () => {
      // Smooth lerp for mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const tiltX = ((mouseY - height / 2) / height) * 0.35;
      const tiltY = ((mouseX - width / 2) / width) * 0.35;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      globalRotation += 0.002;

      // Draw subtle orbital guide rings
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(tiltY);

      const rings = [120, 220, 320];
      rings.forEach((r, idx) => {
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.45, tiltX + idx * 0.2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 - idx * 0.02})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
      });
      ctx.restore();

      // Update & project 3D particles
      const projected: { x: number; y: number; scale: number; alpha: number; color: string; z: number }[] = [];

      particles.forEach((p) => {
        p.orbitAngle += p.orbitSpeed;

        // Calculate 3D position based on orbit and tilt
        const cosAngle = Math.cos(p.orbitAngle + globalRotation);
        const sinAngle = Math.sin(p.orbitAngle + globalRotation);

        const rawX = cosAngle * p.orbitRadius;
        const rawY = sinAngle * p.orbitRadius * Math.cos(p.orbitTilt);
        const rawZ = sinAngle * p.orbitRadius * Math.sin(p.orbitTilt);

        // Apply mouse parallax rotation
        const rotatedX = rawX * Math.cos(tiltY) - rawZ * Math.sin(tiltY);
        const rotatedZ = rawX * Math.sin(tiltY) + rawZ * Math.cos(tiltY);
        const rotatedY = rawY * Math.cos(tiltX) - rotatedZ * Math.sin(tiltX);

        // Perspective projection
        const fov = 400;
        const scale = fov / (fov + rotatedZ + 150);
        const screenX = centerX + rotatedX * scale;
        const screenY = centerY + rotatedY * scale;

        const alpha = Math.max(0.15, Math.min(0.9, (rotatedZ + 150) / 300));

        projected.push({
          x: screenX,
          y: screenY,
          scale,
          alpha,
          color: p.color,
          z: rotatedZ,
        });

        // Draw particle sphere
        ctx.beginPath();
        ctx.arc(screenX, screenY, Math.max(1, p.radius * scale), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.shadowColor = `${p.color}0.8)`;
        ctx.shadowBlur = 8 * scale;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw constellation network lines between nearby projected nodes
      const maxDistance = 110;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.25 * Math.min(projected[i].alpha, projected[j].alpha);
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw glowing central Orbit-I core pulse
      const corePulse = Math.sin(globalRotation * 4) * 6 + 22;
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, corePulse * 2.5);
      coreGrad.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
      coreGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.15)');
      coreGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, corePulse * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      id="orbit-3d-canvas"
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
    />
  );
};
