import { Router } from 'express'
import { episodeController } from '../controllers/episodeController'
import {
  createValidator,
  deleteValidator,
  readOneValidator,
  updateValidator,
} from '../validators/episode'

export default Router()
  .get('/episodes', episodeController.readAllAction)
  .get('/episodes/:id', ...readOneValidator, episodeController.readOneAction)
  .post('/episodes', ...createValidator, episodeController.createAction)
  .put('/episodes/:id', ...updateValidator, episodeController.updateAction)
  .delete('/episodes/:id', ...deleteValidator, episodeController.deleteAction)
