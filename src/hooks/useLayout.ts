import { useState, useLayoutEffect } from "react";

export const useLayout = () => {
  const [device, setDevice] = useState<"desktop" | "mobile">("mobile");

  useLayoutEffect(() => {
    const detectPageWidth = () => {
      if (window.innerWidth > 1024) {
        setDevice("desktop");
      } else {
        setDevice("mobile");
      }
    };

    detectPageWidth();

    window.addEventListener("resize", detectPageWidth);

    return () => {
      window.removeEventListener("resize", detectPageWidth);
    };
  }, []);

  return device;
};
