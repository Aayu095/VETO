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

// Animation class names
export const fadeIn = "opacity-0 translate-y-8 transition-all duration-700 ease-out";
export const fadeInVisible = "opacity-100 translate-y-0";

export const slideUp = "opacity-0 translate-y-12 transition-all duration-700 ease-out";
export const slideUpVisible = "opacity-100 translate-y-0";

export const scaleIn = "opacity-0 scale-95 transition-all duration-500 ease-out";
export const scaleInVisible = "opacity-100 scale-100";
