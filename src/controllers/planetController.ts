import { NextFunction, Request, Response } from 'express'
import Planet, {
  createPlanet,
  getPlanet,
  getPlanets,
  updatePlanet,
} from '../models/planet'

export const planetController = {
  readAllAction: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const palanets = await getPlanets()

      res.json(palanets)
    } catch (err) {
      next(err)
    }
  },
  readOneAction: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const planet = await getPlanet(parseInt(req.params.id))

      res.json(planet)
    } catch (err) {
      next(err)
    }
  },
  createAction: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const planet = await createPlanet(req.body)

      res.json(planet)
    } catch (err) {
      next(err)
    }
  },
  updateAction: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const planet = await updatePlanet(parseInt(req.params.id), req.body)

      res.json(planet)
    } catch (err) {
      next(err)
    }
  },
  deleteAction: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Planet.destroy({ where: { id: req.params.id } })

      res.json({})
    } catch (err) {
      next(err)
    }
  },
}
