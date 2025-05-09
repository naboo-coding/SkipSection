import { useState, useEffect } from "react";

function getIsMobile(breakpoint = 700) {
  if (typeof window !== "undefined") {
    return window.innerWidth <= breakpoint;
  }
  if (typeof navigator !== "undefined") {
    // Fallback for SSR or non-window environments
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  return false;
}

export function useIsMobile(breakpoint = 700) {
  const [isMobile, setIsMobile] = useState(getIsMobile(breakpoint));

  useEffect(() => {
    const handleResize = () => setIsMobile(getIsMobile(breakpoint));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
} 