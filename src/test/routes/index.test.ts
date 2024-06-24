import express, { Express } from 'express'
import request from 'supertest'
import router from '../../services/router'

describe('Index Route', () => {
  const app: Express = express()

  app.use(router)

  test('Get', async () => {
    const call = await request(app).get('/').expect(200)

    expect(call.text).toEqual('Hello World!')
  })
})
