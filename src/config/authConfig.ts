module.exports = {
  secret: process.env.ACCESS_TOKEN_SECRET,
  secretLogin: process.env.ACCESS_LOGIN_TOKEN,
  jwtLoginExpiration: 900, // 15 mins
  jwtExpiration: 3600, // 1 hour
  jwtRefreshExpiration: 86400 // 24 hours
}
