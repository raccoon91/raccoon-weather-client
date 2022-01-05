import axios from "axios";

export const delayRequest = async (delay = 500): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

export const serverApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});
