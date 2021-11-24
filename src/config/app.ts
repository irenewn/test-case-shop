const env = process.env;

const appConfig = {
  DEFAULT_PAGINATION_SIZE: 50,
  API_ENDPOINT: env.REACT_APP_API_ENDPOINT || "/",
  DEBUG: env.REACT_APP_DEBUG || "true",
};

export default appConfig;
