import { NextFunction, Request, Response } from 'express'
import Episode, {
  createEpisode,
  getEpisode,
  getEpisodes,
  updateEpisode,
} from '../models/episode'

export const episodeController = {
  readAllAction: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const episodes = await getEpisodes()

      res.json(episodes)
    } catch (err) {
      next(err)
    }
  },
  readOneAction: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const episode = await getEpisode(parseInt(req.params.id))

      res.json(episode)
    } catch (err) {
      next(err)
    }
  },
  createAction: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const episode = await createEpisode(req.body)

      res.json(episode)
    } catch (err) {
      next(err)
    }
  },
  updateAction: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const episode = await updateEpisode(parseInt(req.params.id), req.body)

      res.json(episode)
    } catch (err) {
      next(err)
    }
  },
  deleteAction: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Episode.destroy({ where: { id: req.params.id } })

      res.json({})
    } catch (err) {
      next(err)
    }
  },
}
