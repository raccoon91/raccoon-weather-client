import { useState, useEffect, MutableRefObject } from "react";
import ResizeObserver from "resize-observer-polyfill";

export const useResizeObserver = (ref: MutableRefObject<HTMLDivElement | null>): DOMRectReadOnly | null => {
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

// interface IDimensions {
//   width: number;
//   height: number;
// }

// export const useResize = (ref: MutableRefObject<HTMLDivElement | null>) => {
//   const [dimensions, setDimensions] = useState<IDimensions | null>(null);

//   useEffect(() => {
//     if (!ref || !ref.current) return;

//     const setDimension = (ref: MutableRefObject<HTMLDivElement | null>) => {
//       const dimensions = ref.current?.getBoundingClientRect();

//       if (dimensions) {
//         const { left, right, top, bottom } = dimensions;

//         setDimensions({
//           width: right - left,
//           height: bottom - top,
//         });
//       }
//     };

//     const delay = 300;
//     let timer: NodeJS.Timeout;

//     const resizeObserver = () => {
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         console.log("resize event!");
//         setDimension(ref);
//       }, delay);
//     };

//     setDimension(ref);

//     window.addEventListener("resize", resizeObserver);

//     return () => {
//       window.removeEventListener("resize", resizeObserver);
//     };
//   }, [ref]);

//   return dimensions;
// };
