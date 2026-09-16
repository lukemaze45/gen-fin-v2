import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";

export const HeroGlobeVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;
    let lastTime = performance.now();

    // Interaction state for dragging/spinning
    let isDragging = false;
    let lastMouseX = 0;
    let dragVelocity = 0;
    const baseSpeed = 0.007; // Smooth continuous rotation speed

    const updateSize = () => {
      if (!canvas) return;
      const container = containerRef.current;
      // Use untransformed client geometry so CSS transforms (scale) do not shrink the bitmap buffer
      const width = container ? container.clientWidth : canvas.clientWidth;
      const height = container ? container.clientHeight : canvas.clientHeight;

      if (width > 0 && height > 0) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const targetW = Math.round(width * dpr);
        const targetH = Math.round(height * dpr);
        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
        }
      }
    };

    updateSize();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateSize();
      });
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener("resize", updateSize);

    // Mouse & Touch interaction handlers for tactile control
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      dragVelocity = 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - lastMouseX;
      lastMouseX = e.clientX;
      rotation += deltaX * 0.006;
      dragVelocity = deltaX * 0.006;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        dragVelocity = 0;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - lastMouseX;
      lastMouseX = e.touches[0].clientX;
      rotation += deltaX * 0.007;
      dragVelocity = deltaX * 0.007;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // 3D coordinates calculation with tilt
    const pitch = 0.22; // ~12.5 deg forward tilt so parallels show spherical depth
    const roll = -0.16; // ~9 deg lateral tilt for authentic globe orientation

    const cosPitch = Math.cos(pitch);
    const sinPitch = Math.sin(pitch);
    const cosRoll = Math.cos(roll);
    const sinRoll = Math.sin(roll);

    const project = (
      lat: number,
      lon: number,
      rot: number,
      radius: number,
      cx: number,
      cy: number
    ): { x: number; y: number; z: number } => {
      // Standard spherical coordinates
      const cosLat = Math.cos(lat);
      const sinLat = Math.sin(lat);
      const angle = lon + rot;

      const x0 = radius * cosLat * Math.sin(angle);
      const y0 = -radius * sinLat;
      const z0 = radius * cosLat * Math.cos(angle);

      // Pitch rotation (tilt towards viewer)
      const x1 = x0;
      const y1 = y0 * cosPitch - z0 * sinPitch;
      const z1 = y0 * sinPitch + z0 * cosPitch;

      // Roll rotation (axial lean)
      const x2 = x1 * cosRoll - y1 * sinRoll;
      const y2 = x1 * sinRoll + y1 * cosRoll;
      const z2 = z1;

      return {
        x: cx + x2,
        y: cy + y2,
        z: z2,
      };
    };

    const render = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Apply drag momentum or continuous smooth auto-spin
      if (!isDragging) {
        dragVelocity *= 0.95; // Inertial damping
        rotation += baseSpeed + dragVelocity;
      }

      // Read dimensions directly from the synchronized canvas buffer
      const width = canvas.width;
      const height = canvas.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      // 0.36 provides a generous 14% margin around the sphere so rims, flares, and glows are never clipped
      const sphereRadius = Math.min(width, height) * 0.36;

      // 1. BASE METALLIC CHROME SPHERE GRADIENT
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.clip();

      const chromeGrad = ctx.createRadialGradient(
        cx - sphereRadius * 0.36,
        cy - sphereRadius * 0.32,
        sphereRadius * 0.05,
        cx,
        cy,
        sphereRadius * 1.05
      );
      chromeGrad.addColorStop(0, "#FFFFFF");
      chromeGrad.addColorStop(0.18, "#E6E9ED");
      chromeGrad.addColorStop(0.42, "#B5BAC4");
      chromeGrad.addColorStop(0.72, "#4B505A");
      chromeGrad.addColorStop(0.9, "#1D1F24");
      chromeGrad.addColorStop(1, "#0A0B0D");

      ctx.fillStyle = chromeGrad;
      ctx.fillRect(cx - sphereRadius, cy - sphereRadius, sphereRadius * 2, sphereRadius * 2);

      // 2. CRIMSON RED AMBIENT BACKLIGHT REFLECTION (Bottom-Right Rim)
      const redRimGrad = ctx.createRadialGradient(
        cx + sphereRadius * 0.62,
        cy + sphereRadius * 0.58,
        sphereRadius * 0.1,
        cx + sphereRadius * 0.45,
        cy + sphereRadius * 0.4,
        sphereRadius * 0.85
      );
      redRimGrad.addColorStop(0, "rgba(255, 60, 60, 0.95)");
      redRimGrad.addColorStop(0.3, "rgba(176, 0, 0, 0.85)");
      redRimGrad.addColorStop(0.65, "rgba(85, 0, 0, 0.35)");
      redRimGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = redRimGrad;
      ctx.fillRect(cx - sphereRadius, cy - sphereRadius, sphereRadius * 2, sphereRadius * 2);

      // 3. 3D SPINNING WIREFRAME (LATITUDES & LONGITUDES)
      // Latitude Parallels
      const latitudes = [-60, -40, -20, 0, 20, 40, 60];
      latitudes.forEach((deg) => {
        const latRad = (deg * Math.PI) / 180;
        const isEquator = deg === 0;

        ctx.beginPath();
        let isDrawing = false;

        const steps = 120;
        for (let i = 0; i <= steps; i++) {
          const lonRad = (i / steps) * Math.PI * 2;
          const pt = project(latRad, lonRad, rotation, sphereRadius, cx, cy);

          // Front-facing points only (z > 0)
          if (pt.z >= 0) {
            if (!isDrawing) {
              ctx.moveTo(pt.x, pt.y);
              isDrawing = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            isDrawing = false;
          }
        }

        ctx.strokeStyle = isEquator
          ? "rgba(255, 255, 255, 0.85)"
          : "rgba(235, 240, 248, 0.45)";
        ctx.lineWidth = isEquator ? 1.6 * dpr : 1.1 * dpr;
        ctx.stroke();
      });

      // Longitude Meridians (sweeping smoothly around the vertical axis)
      const meridianCount = 12; // Every 30 degrees
      for (let m = 0; m < meridianCount; m++) {
        const lonRad = (m / meridianCount) * Math.PI * 2;
        const isPrime = m === 0 || m === 6;

        ctx.beginPath();
        let isDrawing = false;

        const steps = 90;
        for (let i = 0; i <= steps; i++) {
          const latRad = -Math.PI / 2 + (i / steps) * Math.PI;
          const pt = project(latRad, lonRad, rotation, sphereRadius, cx, cy);

          if (pt.z >= 0) {
            if (!isDrawing) {
              ctx.moveTo(pt.x, pt.y);
              isDrawing = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            isDrawing = false;
          }
        }

        ctx.strokeStyle = isPrime
          ? "rgba(255, 255, 255, 0.75)"
          : "rgba(230, 235, 245, 0.4)";
        ctx.lineWidth = isPrime ? 1.4 * dpr : 1.0 * dpr;
        ctx.stroke();
      }

      // Intersecting Node Accents
      for (let latDeg of [-40, -20, 0, 20, 40]) {
        const latRad = (latDeg * Math.PI) / 180;
        for (let m = 0; m < meridianCount; m += 2) {
          const lonRad = (m / meridianCount) * Math.PI * 2;
          const pt = project(latRad, lonRad, rotation, sphereRadius, cx, cy);

          if (pt.z > sphereRadius * 0.3) {
            const alpha = Math.min(1, (pt.z / sphereRadius) * 0.9);
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.2 * dpr, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();

            // Subtle red core on prime intersections
            if (m === 0 && latDeg === 0) {
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, 1.2 * dpr, 0, Math.PI * 2);
              ctx.fillStyle = "#FF3333";
              ctx.fill();
            }
          }
        }
      }

      // 4. SPECULAR TOP-LEFT GLOSS FLARE (Stationary light source)
      const flareGrad = ctx.createRadialGradient(
        cx - sphereRadius * 0.35,
        cy - sphereRadius * 0.36,
        2 * dpr,
        cx - sphereRadius * 0.35,
        cy - sphereRadius * 0.36,
        sphereRadius * 0.42
      );
      flareGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      flareGrad.addColorStop(0.2, "rgba(255, 255, 255, 0.4)");
      flareGrad.addColorStop(0.6, "rgba(255, 255, 255, 0.08)");
      flareGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = flareGrad;
      ctx.fillRect(cx - sphereRadius, cy - sphereRadius, sphereRadius * 2, sphereRadius * 2);

      ctx.restore();

      // 5. METALLIC BEZEL & RIM BORDER
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      const rimGrad = ctx.createLinearGradient(
        cx - sphereRadius,
        cy - sphereRadius,
        cx + sphereRadius,
        cy + sphereRadius
      );
      rimGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      rimGrad.addColorStop(0.4, "rgba(180, 185, 195, 0.4)");
      rimGrad.addColorStop(0.75, "rgba(255, 60, 60, 0.9)");
      rimGrad.addColorStop(1, "rgba(255, 255, 255, 0.75)");

      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = 2.5 * dpr;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateSize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[280px] sm:max-w-md lg:max-w-lg mx-auto aspect-square flex items-center justify-center select-none overflow-visible"
      id="hero-globe-container"
    >
      {/* Background ambient red glow & subtle volumetric lighting */}
      <div className="absolute w-[80%] h-[80%] rounded-full bg-[#B00000] blur-[40px] sm:blur-[80px] opacity-25 pointer-events-none" />
      <div className="absolute w-[50%] h-[50%] rounded-full bg-[#FF2A2A] blur-[30px] sm:blur-[60px] opacity-20 pointer-events-none" />

      {/* Decorative orbital rings */}
      <div className="absolute inset-[3%] rounded-full border border-neutral-800/80 pointer-events-none" />
      <div className="absolute inset-[11%] rounded-full border border-neutral-800/50 border-dashed pointer-events-none" />

      {/* Red orbital tracer */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[7%] rounded-full border border-transparent border-t-[#B00000]/60 pointer-events-none"
      />

      {/* Main Spinning 3D Metallic Globe Canvas (Locked to absolute inset-0 so aspect-square never truncates) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          className="block w-full h-full drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)]"
          title="Genesis Financial 3D Global Network - Drag to rotate"
        />
      </div>
    </div>
  );
};
