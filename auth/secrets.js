module.exports = {
  jwtSecret: process.env.JWT_SECTRET || 'just_between_us_gals',
  cookieSecret: process.env.COOKIE_SECRET || 'just_between_us_gals'
}