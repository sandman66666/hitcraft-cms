import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface PixieDustProps {
  enabled?: boolean;
  particleCount?: number;
}

const PixieDust: React.FC<PixieDustProps> = ({ 
  enabled = true,
  particleCount = 15
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleClick = () => {
      setIsActive(prev => !prev);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled]);

  useEffect(() => {
    if (!canvasRef.current || !enabled || !isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['#FFD700', '#FFA500', '#FF69B4', '#FF1493'];

    const createParticle = (): Particle => ({
      x: mousePosition.x,
      y: mousePosition.y,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 4,
      speedY: (Math.random() - 0.5) * 4 - 2,
      opacity: 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      setParticles(prevParticles => {
        const newParticles = [...prevParticles];

        // Add new particles
        while (newParticles.length < particleCount) {
          newParticles.push(createParticle());
        }

        // Update existing particles
        return newParticles.map(particle => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();

          return {
            ...particle,
            x: particle.x + particle.speedX,
            y: particle.y + particle.speedY,
            opacity: particle.opacity - 0.02,
            size: particle.size * 0.99
          };
        }).filter(particle => particle.opacity > 0 && particle.size > 0.1);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition, enabled, isActive, particleCount]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
};

export default PixieDust;