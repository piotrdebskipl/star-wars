import express, { Express } from 'express'
import dotenv from 'dotenv'
import router from './services/router'
import bodyParser from 'body-parser'
import db from './services/db'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)

db.sync().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
