/** @type {import('next').NextConfig} */
const env = process.env.NODE_ENV;
const withPWA = require('next-pwa')({
  dest: 'public',
})
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: 'http://localhost:3998/graphql',
    PROFILE: env === 'development' ? 'profile' : '0BzX7s6lyQ',
    AUTHENTICATE: env === 'development' ? 'token' : 'pT0vD1on6G',
    SECURE_LOCAL_STORAGE_HASH_KEY: env === 'development' ? 'AC626A78A7555F1A6EDD78C1797C6' : '9AF14EE3CDDED1D2686454DB22446',
  }
}

module.exports = withPWA({
  // config
});

module.exports = nextConfig
