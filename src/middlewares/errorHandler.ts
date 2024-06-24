import { NextFunction, Request, Response } from 'express'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500)
  res.json({ error: err.message })
}

export default errorHandler
