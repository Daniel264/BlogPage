import gsap from "gsap";
import React, { useEffect, useRef } from "react";

export default function GsapMagnetic({
    children,
}: {
    children: React.ReactElement;
}) {
    const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            if (ref.current) {
                const { width, height, left, top } =
                    ref.current.getBoundingClientRect();
                const x: number = clientX - (left + width / 2);
                const y: number = clientY - (top + height / 2);
                gsap.to(ref.current, { x: x });
                gsap.to(ref.current, { y: y });
            }
        };
        const mouseLeave = (e: MouseEvent) => {
          gsap.to(ref.current, { x: 0 });
          gsap.to(ref.current, { y: 0 });
        };
        if (ref.current) {
            ref.current.addEventListener("mousemove", mouseMove);
            ref.current.addEventListener("mouseleave", mouseLeave);
        }
        return () => {
            if (ref.current) {
                ref.current.removeEventListener("mousemove", mouseMove);
                ref.current.removeEventListener("mouseleave", mouseLeave);
            }
        };
    }, []);

    return React.cloneElement(children, { ref });
}
