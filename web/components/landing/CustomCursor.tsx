"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true); // default to true to avoid hydration mismatch flashes

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches || window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursor-ring');
    if (!cursor || !cursorRing) return;

    let cx = 0, cy = 0, rx = 0, ry = 0;
    let animFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      cx = e.clientX; 
      cy = e.clientY;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      cursor.style.opacity = '1';
      cursorRing.style.opacity = '1';
    };

    const animRing = () => {
      rx += (cx - rx) * 0.12;
      ry += (cy - ry) * 0.12;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top = ry + 'px';
      animFrame = requestAnimationFrame(animRing);
    };

    const onMouseEnterCustom = () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursorRing.style.width = '50px';
      cursorRing.style.height = '50px';
    };

    const onMouseLeaveCustom = () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursorRing.style.width = '36px';
      cursorRing.style.height = '36px';
    };

    document.addEventListener('mousemove', onMouseMove);
    animFrame = requestAnimationFrame(animRing);

    // Dynamic hit testing for links
    document.querySelectorAll('a, button, input').forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterCustom);
      el.addEventListener('mouseleave', onMouseLeaveCustom);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div 
        id="cursor" 
        className="fixed w-3 h-3 bg-[#2ECC8F] rounded-full pointer-events-none z-[9999] opacity-0 transition-[width,height,opacity] duration-200 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
      />
      <div 
        id="cursor-ring" 
        className="fixed w-9 h-9 border border-[rgba(46,204,143,0.5)] rounded-full pointer-events-none z-[9998] opacity-0 transition-[width,height,opacity] duration-300 -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
