const prod = {
  url: {},
};

const dev = {
  url: {
    BASE_URL: "http://localhost:3000",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
