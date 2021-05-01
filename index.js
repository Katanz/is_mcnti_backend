require('dotenv').config()
const express = require('express')
const sequelize = require('./db')

const PORT = process.env.PORT

const app = express()

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () =>
      console.log('Server is working on port ' + PORT)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
