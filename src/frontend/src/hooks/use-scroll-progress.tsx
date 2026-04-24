import { useCallback, useEffect, useState } from "react";

export interface ScrollProgressState {
  scrollY: number;
  scrollProgress: number; // 0–1 over full page
  isScrolled: boolean; // true after 60px — used for header glass effect
}

export function useScrollProgress(): ScrollProgressState {
  const [state, setState] = useState<ScrollProgressState>({
    scrollY: 0,
    scrollProgress: 0,
    isScrolled: false,
  });

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;

    setState({
      scrollY,
      scrollProgress,
      isScrolled: scrollY > 60,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // sync on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return state;
}
