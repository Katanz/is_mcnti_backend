require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/routes')
const errorHandler = require('./middleware/ErrorHandlerMiddleware')

const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)

//middleware with errors handler
app.use(errorHandler)

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
