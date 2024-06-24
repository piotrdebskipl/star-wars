import { body, param } from 'express-validator'

export const readOneValidator = [param('id').notEmpty()]

export const createValidator = [
  body('name').notEmpty().isString().trim(),
  body('planetId').optional().isNumeric(),
  body('episodeIds').optional().isArray(),
]

export const updateValidator = [
  param('id').notEmpty(),
  body('name').optional().isString().trim(),
  body('planetId').optional(),
  body('episodeIds').optional().isArray(),
]
