import { NextFunction, Request, Response } from 'express'
import logger from '../services/logger'

const logErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack)
  next(err)
}

export default logErrors
