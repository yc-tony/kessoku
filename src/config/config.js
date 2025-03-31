const config = {
  API_HOST: import.meta.env.VITE_API_HOST,
  API_PREFIX: '/kessokuApi',
  BASIC_AUTH_PASSWORD: import.meta.env.VITE_BASIC_AUTH_PASSWORD,
  LOGIN_PATH: '/oauth/login'
};

export default config; 