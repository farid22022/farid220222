import { useEffect, useRef } from "react";

export default function NanoParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrame;
    let width = 0;
    let height = 0;
    let particles = [];
    const pointer = { x: 0.5, y: 0.35 };

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.min(210, Math.floor((width * height) / 7600));
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.9 + 0.1,
        size: index % 9 === 0 ? 1.8 : Math.random() * 1.1 + 0.35,
        speed: Math.random() * 0.18 + 0.04,
        shimmer: Math.random() * Math.PI * 2
      }));
    }

    function onPointerMove(event) {
      pointer.x = event.clientX / width;
      pointer.y = event.clientY / height;
    }

    function draw(time) {
      context.clearRect(0, 0, width, height);
      const glowX = width * (0.45 + (pointer.x - 0.5) * 0.08);
      const glowY = height * 0.95;
      const horizon = context.createRadialGradient(glowX, glowY, 0, glowX, glowY, width * 0.5);
      horizon.addColorStop(0, "rgba(255, 72, 45, 0.32)");
      horizon.addColorStop(0.28, "rgba(255, 72, 45, 0.13)");
      horizon.addColorStop(0.7, "rgba(255, 72, 45, 0.02)");
      horizon.addColorStop(1, "rgba(255, 72, 45, 0)");
      context.fillStyle = horizon;
      context.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.y += particle.speed * particle.z;
        particle.x += Math.sin(time * 0.00018 + particle.shimmer) * 0.06;
        if (particle.y > height + 8) {
          particle.y = -8;
          particle.x = Math.random() * width;
        }

        const dx = (pointer.x - 0.5) * 12 * particle.z;
        const dy = (pointer.y - 0.5) * 8 * particle.z;
        const alpha = 0.28 + Math.sin(time * 0.0012 + particle.shimmer) * 0.22;
        context.beginPath();
        context.fillStyle = `rgba(255,255,255,${Math.max(0.12, alpha)})`;
        context.arc(particle.x + dx, particle.y + dy, particle.size, 0, Math.PI * 2);
        context.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    }

    resize();
    draw(0);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="nano-particle-field" />;
}
