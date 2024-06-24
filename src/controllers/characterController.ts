import { Request, Response } from 'express'
import {
  createCharacter,
  getCharacter,
  getCharacters,
  updateCharacter,
} from '../models/character'
import { validationResult } from 'express-validator'

export const characterController = {
  readAllAction: async (req: Request, res: Response) => {
    const characters = await getCharacters()

    res.json(characters)
  },
  readOneAction: async (req: Request, res: Response) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      return res.json({ errors: result.array() })
    }

    const character = await getCharacter(parseInt(req.params.id))

    res.json(character)
  },
  createAction: async (req: Request, res: Response) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      return res.json({ errors: result.array() })
    }

    const characterId = await createCharacter(req.body)

    res.json({ id: characterId })
  },
  updateAction: async (req: Request, res: Response) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
      return res.json({ errors: result.array() })
    }

    const character = await updateCharacter(parseInt(req.params.id), req.body)

    res.json(character)
  },
  deleteAction: async (req: Request, res: Response) => {
    res.json({ characters: [] })
  },
}
