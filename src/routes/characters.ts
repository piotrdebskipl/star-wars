import { Router } from 'express'
import { characterController } from '../controllers/characterController'
import {
  createValidator,
  deleteValidator,
  readOneValidator,
  updateValidator,
} from '../validators/character'

export default Router()
  .get('/characters', characterController.readAllAction)
  .get(
    '/characters/:id',
    ...readOneValidator,
    characterController.readOneAction
  )
  .post('/characters', ...createValidator, characterController.createAction)
  .put('/characters/:id', ...updateValidator, characterController.updateAction)
  .delete(
    '/characters/:id',
    ...deleteValidator,
    characterController.deleteAction
  )
