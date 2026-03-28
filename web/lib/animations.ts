"use client";

import { useEffect, useRef, useState } from "react";

// Hook for scroll-triggered animations
export function useScrollAnimation(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold]);

    return { ref, isVisible };
}

// Animation class names based on global CSS keyframes
export const fadeIn = "opacity-0 transition-opacity duration-700 ease-out";
export const fadeInVisible = "opacity-100";

export const slideUp = "slide-up";
export const slideUpVisible = ""; // Handled inherently by the slide-up keyframe forward fill

export const reveal = "reveal";
export const revealVisible = "visible";

export const stepAnim = "step";
export const stepAnimVisible = "visible";

export const featureCardAnim = "feature-card";
export const featureCardAnimVisible = "visible";
