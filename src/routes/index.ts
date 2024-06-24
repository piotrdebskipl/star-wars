import { Request, Response, Router } from 'express'
import swaggerUIExpress from 'swagger-ui-express'
import swaggerDocument from '../../swagger.json'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
})

if (process.env.NODE_ENV !== 'production') {
  router.use('/docs', swaggerUIExpress.serve)
  router.get('/docs', swaggerUIExpress.setup(swaggerDocument))
  router.get('/docs/swagger.json', (req: Request, res: Response) =>
    res.json(swaggerDocument)
  )
}

export default router
