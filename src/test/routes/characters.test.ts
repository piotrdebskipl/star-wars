import express, { Express } from 'express'
import request from 'supertest'
import router from '../../middlewares/router'
import bodyParser from 'body-parser'

describe('Characters Route', () => {
  const app: Express = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(router)

  test('empty', () => {
    expect(1).toEqual(1)
  })

  // test('GetAll', async () => {
  //   const call = await request(app).get('/characters').expect(200)

  //   console.log('call.bdy', call.body)

  //   // expect(call.text).toEqual('Hello World!')
  // })

  // test('Post', async () => {
  //   const name = 'Luke Skywalker'
  //   const call = await request(app).post('/characters').send({
  //     name,
  //   })

  //   expect(call.body.name).toEqual(name)
  // })
})
