export const remToPixel = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};
