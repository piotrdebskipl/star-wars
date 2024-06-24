import { Router } from 'express'
import { planetController } from '../controllers/planetController'
import {
  createValidator,
  deleteValidator,
  readOneValidator,
  updateValidator,
} from '../validators/planet'

export default Router()
  .get('/planets', planetController.readAllAction)
  .get('/planets/:id', ...readOneValidator, planetController.readOneAction)
  .post('/planets', ...createValidator, planetController.createAction)
  .put('/planets/:id', ...updateValidator, planetController.updateAction)
  .delete('/planets/:id', ...deleteValidator, planetController.deleteAction)
