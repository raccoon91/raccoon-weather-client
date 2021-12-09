export const fakeApi = <T>(data: T, delay = 1000): Promise<{ status: number; data: T }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, data });
    }, delay);
  });
};
