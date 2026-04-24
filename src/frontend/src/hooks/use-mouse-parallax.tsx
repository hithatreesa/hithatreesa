import { useCallback, useEffect, useRef, useState } from "react";

export interface MousePosition {
  x: number; // -1 to 1 (normalized from viewport center)
  y: number; // -1 to 1
  rawX: number; // px
  rawY: number; // px
}

/**
 * Returns mouse position normalized to [-1, 1] from viewport center.
 * `strength` multiplies the output for easy parallax offset calculation.
 */
export function useMouseParallax(
  strength = 1,
): MousePosition & { offsetX: number; offsetY: number } {
  const [pos, setPos] = useState<MousePosition>({
    x: 0,
    y: 0,
    rawX: 0,
    rawY: 0,
  });
  const rafRef = useRef<number | null>(null);
  const latestRef = useRef({ clientX: 0, clientY: 0 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    latestRef.current = { clientX: e.clientX, clientY: e.clientY };
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const { clientX, clientY } = latestRef.current;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = (clientY / window.innerHeight) * 2 - 1;
      setPos({ x, y, rawX: clientX, rawY: clientY });
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onMouseMove]);

  return {
    ...pos,
    offsetX: pos.x * strength,
    offsetY: pos.y * strength,
  };
}
