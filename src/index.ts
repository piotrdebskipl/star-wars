import express, { Express } from 'express'
import dotenv from 'dotenv'
import router from './middlewares/router'
import bodyParser from 'body-parser'
import db from './services/db'
import errorHandler from './middlewares/errorHandler'
import logErrors from './middlewares/logErrors'
import clientErrorHandler from './middlewares/clientErrorHandler'
import logger from './services/logger'
import helmet from 'helmet'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8080

app.disable('x-powered-by')
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

app.listen(port, async () => {
  await db.sync()
  logger.info(`So far so good. Listening on port ${port}`)
})
