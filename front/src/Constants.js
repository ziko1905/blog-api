const prod = {
  url: {},
};

const dev = {
  url: {
    BASE_URL: import.meta.env.VITE_BACKEND_URL,
  },
};

export const config = import.meta.env.MODE === "development" ? dev : prod;
