const jwt = require('jsonwebtoken')

const APP_SECRET = 'appsecret321'

const createToken = (userId) => jwt.sign({ userId, expiresIn: '7d' }, APP_SECRET)

const createOrganizationAuthToken = (name) => jwt.sign({ name }, APP_SECRET)

const createRefreshToken = (user) => {
  return jwt.sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  })
}

const createAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  })
}

const sendRefreshToken = (response, token) => {
  response.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh_token',
  })
}

const getUserId = (context) => {
  const Authorization = context.request.get('Authorization')
  //console.log(`Authorization: `, Authorization)

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }
}

module.exports = { createToken, createOrganizationAuthToken, getUserId }
