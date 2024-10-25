export const API_URL =
  process.env.NODE_ENV === "test"
    ? "http://mock-server"
    : import.meta.env.VITE_API_URL;
