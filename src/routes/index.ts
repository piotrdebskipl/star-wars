import { Request, Response, Router } from 'express'

export default Router().get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
})
