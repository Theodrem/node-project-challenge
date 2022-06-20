module.exports = {
  secret: process.env.ACCESS_TOKEN_SECRET,
  jwtExpiration: 3600, // 1 hour
  jwtRefreshExpiration: 86400 // 24 hours
};
