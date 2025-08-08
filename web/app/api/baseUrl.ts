const baseUrls = {
  development: process.env.NEXT_PUBLIC_API_URL,
  staging: "",
  production: "",
};

type env = keyof typeof baseUrls;
const nodeEnv = (process.env.NODE_ENV || "development") as env;

const baseUrl = baseUrls[nodeEnv];

export default baseUrl;
