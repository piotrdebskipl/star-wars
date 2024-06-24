import { Router } from 'express'
import { characterController } from '../controllers/characterController'

export default Router()
  .get('/characters', characterController.readAllAction)
  .get('/characters/:id', characterController.readOneAction)
  .post('/characters', characterController.createAction)
  .put('/characters/:id', characterController.updateAction)
  .delete('/characters/:id', characterController.deleteAction)
