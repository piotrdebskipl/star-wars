import { Column, Table, Model } from 'sequelize-typescript'

@Table
export default class Episode extends Model {
  @Column
  name: string
}

export const getEpisodes = async (): Promise<Episode[]> => {
  const episodes = await Episode.findAll()

  if (episodes instanceof Array && !episodes.length) {
    return []
  }

  return episodes.map((episode) => formatGetterData(episode))
}

export const getEpisode = async (id: number): Promise<Episode | Object> => {
  const episode = await Episode.findByPk(id)

  if (!(episode instanceof Episode)) {
    throw new Error('There is no such Episode')
  }

  return formatGetterData(episode)
}

export const createEpisode = async (body: any): Promise<Episode | Object> => {
  const episode = await createOrUpdateData(body)

  if (!(episode instanceof Episode)) {
    throw new Error('There is no such Episode')
  }

  return formatGetterData(episode)
}

export const updateEpisode = async (id: number, body: any) => {
  const episode = await createOrUpdateData(body, id)

  if (!(episode instanceof Episode)) {
    throw new Error('There is no such Episode')
  }

  return formatGetterData(episode)
}

const formatGetterData = (episode: Episode): any => ({
  id: episode.id,
  name: episode.name,
})

const createOrUpdateData = async (body: any, id?: number) => {
  let episode: Episode | null

  if (id) {
    episode = await Episode.findByPk(id)

    if (!(episode instanceof Episode)) {
      throw new Error('There is no such Episode')
    }

    episode.name = body.name

    await episode.save()
  } else {
    episode = await Episode.create({
      name: body.name,
    })
  }

  return episode
}
