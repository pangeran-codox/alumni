import { useRef } from 'react';

export function useTilt({ max = 10, perspective = 900, scale = 1.03 } = {}) {
    const ref = useRef(null);

    const onMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rx = (-y * max).toFixed(2);
        const ry = (x * max).toFixed(2);
        el.style.transform = `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale}) translateZ(0)`;
    };

    const onLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1) translateZ(0)';
    };

    return {
        ref,
        onMouseMove: onMove,
        onMouseLeave: onLeave,
    };
}
