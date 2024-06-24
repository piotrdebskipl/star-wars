import dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'

dotenv.config()

const dbName: string =
  (process.env.NODE_ENV === 'test'
    ? process.env.DB_NAME_TEST
    : process.env.DB_NAME) || 'postgres'
const dbUser: string = process.env.DB_USER || 'postgres'
const dbPass: string = process.env.DB_PASS || ''
const dbHost: string = process.env.DB_HOST || 'localhost'
const dbPort: number = parseInt(process.env.DB_PORT || '5432')
const db = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  models: [__dirname + '/../models'],
})

export default db
