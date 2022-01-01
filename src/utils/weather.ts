export const getFeelTemp = (temp: number, wind: number) => {
  const windCalib = Math.pow(wind, 0.16);

  return Number((13.12 + 0.6215 * temp - 11.37 * windCalib + 0.3965 * windCalib * temp).toFixed(1));
};
