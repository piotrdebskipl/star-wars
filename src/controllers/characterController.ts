import { NextFunction, Request, Response } from 'express'
import Character, {
  createCharacter,
  getCharacter,
  getCharacters,
  updateCharacter,
} from '../models/character'

export const characterController = {
  readAllAction: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const characters = await getCharacters()

      res.json(characters)
    } catch (err) {
      next(err)
    }
  },
  readOneAction: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const character = await getCharacter(parseInt(req.params.id))

      res.json(character)
    } catch (err) {
      next(err)
    }
  },
  createAction: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const character = await createCharacter(req.body)

      res.json(character)
    } catch (err) {
      next(err)
    }
  },
  updateAction: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const character = await updateCharacter(parseInt(req.params.id), req.body)

      res.json(character)
    } catch (err) {
      next(err)
    }
  },
  deleteAction: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Character.destroy({ where: { id: req.params.id } })

      res.json({})
    } catch (err) {
      next(err)
    }
  },
}
