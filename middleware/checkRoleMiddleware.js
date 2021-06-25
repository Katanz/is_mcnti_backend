const jwt = require('jsonwebtoken')

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token)
        return res
          .status(401)
          .json({message: 'Не авторизован'})

      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY
      )

      let makeRoleId = 0

      switch (role) {
        case 'ADMIN':
          makeRoleId = 1
          break
        case 'MODER':
          makeRoleId = 2

          break
        case 'CREATOR':
          makeRoleId = 3

          break
        case 'USER':
          makeRoleId = 4
          break

        default:
          makeRoleId = 4
          break
      }

      if (decoded.roleId === role) req.user = decoded
      next()
    } catch (e) {
      res.status(481).json({message: 'Не авторизован'})
    }
  }
}
