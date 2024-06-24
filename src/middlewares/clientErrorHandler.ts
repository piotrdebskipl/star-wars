import { NextFunction, Request, Response } from 'express'

const clientErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.xhr) {
    res.status(500)
    res.json({ error: 'Unknown error!' })
  } else {
    next(err)
  }
}

export default clientErrorHandler
