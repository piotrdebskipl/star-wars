import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import logger from '../services/logger'

export const resultValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: any = validationResult(req)
  console.log('result', result)

  if (!result.isEmpty()) {
    logger.error({ validationError: result })

    throw new Error(
      `Validation error: ${result.errors[0].path} - ${result.errors[0].msg}`
    )
  }
  next()
}
