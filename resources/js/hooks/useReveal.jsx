import { useEffect, useRef, useState } from 'react';

export function useReveal(options = {}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: options.threshold ?? 0.15,
                rootMargin: options.rootMargin ?? '0px 0px -60px 0px',
                ...options,
            },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return [ref, visible];
}

export function Reveal({ children, delay = 0, as = 'div', className = '', style = {}, ...rest }) {
    const [ref, visible] = useReveal();
    const Tag = as;
    return (
        <Tag
            ref={ref}
            className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms`, ...style }}
            {...rest}
        >
            {children}
        </Tag>
    );
}
