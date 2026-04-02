"use client";

import { useEffect, useState } from "react";

export function useIsMobile(breakpointPx = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = `(max-width: ${breakpointPx}px)`;
    const media = window.matchMedia(query);

    const update = () => setIsMobile(media.matches);
    update();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    // Safari < 14
    media.addListener(update);
    return () => media.removeListener(update);
  }, [breakpointPx]);

  return isMobile;
}

