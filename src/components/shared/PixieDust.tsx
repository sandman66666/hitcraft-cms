import React, { useEffect, useRef, useState } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

interface PixieDustProps {
  enabled?: boolean;
  particleCount?: number;
}

const PixieDust: React.FC<PixieDustProps> = ({ 
  enabled = true,
  particleCount = 200
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [star, setStar] = useState<Star | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive] = useState(true);
  const animationFrameRef = useRef<number>();

  const createStar = (canvas: HTMLCanvasElement) => {
    const startX = -100;
    const startY = -100;
    return {
      x: startX,
      y: startY,
      size: 100,
      speedX: 150,
      speedY: 100
    };
  };

  useEffect(() => {
    if (!canvasRef.current || !enabled || !isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const createParticle = (x: number, y: number): Particle => ({
      x,
      y,
      size: Math.random() * 20 + 10,
      opacity: 1,
      color: '#FFFFFF'
    });

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update star position and create particles
      setStar(prevStar => {
          if (!prevStar && Math.random() < 0.03) {
          return createStar(canvas);
        }
        if (prevStar) {
          if (prevStar.x > canvas.width) {
            return null;
          }
          // Draw star
          ctx.beginPath();
          ctx.arc(prevStar.x, prevStar.y, prevStar.size, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            prevStar.x, prevStar.y, 0,
            prevStar.x, prevStar.y, prevStar.size * 20
          );
          gradient.addColorStop(0, '#FFFFFF');
          gradient.addColorStop(0.4, '#FFFFFFAA');
          gradient.addColorStop(1, '#FFFFFF00');
          ctx.fillStyle = gradient;
          ctx.fill();

          // Create trail particles
          setParticles(prev => [
            ...prev,
            createParticle(prevStar.x, prevStar.y)
          ].slice(-2000));

          return {
            ...prevStar,
            x: prevStar.x + prevStar.speedX,
            y: prevStar.y + prevStar.speedY
          };
        }
        return null;
      });

      // Update and draw particles
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          const alpha = Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `${particle.color}${alpha}`;
          ctx.fill();

          return {
            ...particle,
            opacity: particle.opacity - 0.0005
          };
        }).filter(particle => particle.opacity > 0)
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, isActive, particleCount]);

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