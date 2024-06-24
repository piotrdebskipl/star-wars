import { body, param } from 'express-validator'
import { resultValidator } from '../middlewares/validator'

export const readOneValidator = [
  [param('id').notEmpty().isNumeric()],
  resultValidator,
]

export const createValidator = [
  [body('name').notEmpty().isString().trim()],
  resultValidator,
]

export const updateValidator = [
  [
    param('id').notEmpty().isNumeric(),
    body('name').optional().isString().trim(),
  ],
  resultValidator,
]

export const deleteValidator = [
  [param('id').notEmpty().isNumeric()],
  resultValidator,
]
