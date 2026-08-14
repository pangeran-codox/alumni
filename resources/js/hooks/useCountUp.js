import { useEffect, useRef, useState } from 'react';

function easeOutExpo(t) {
    return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function useCountUp(target, { duration = 1800, startOn = true } = {}) {
    const [value, setValue] = useState(0);
    const startedRef = useRef(false);
    const rafRef = useRef(0);

    useEffect(() => {
        if (!startOn || startedRef.current) return;
        startedRef.current = true;

        const from = 0;
        const to = Number(target) || 0;
        const startTime = performance.now();

        const tick = (now) => {
            const t = Math.min(1, (now - startTime) / duration);
            const eased = easeOutExpo(t);
            setValue(Math.round(from + (to - from) * eased));
            if (t < 1) rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [target, duration, startOn]);

    return value;
}
