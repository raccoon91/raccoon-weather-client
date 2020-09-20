import { useState, useEffect, MutableRefObject } from "react";
import ResizeObserver from "resize-observer-polyfill";

export const useResizeObserver = (
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect as DOMRectReadOnly);
      });
    });

    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);

  return dimensions;
};
