import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import Planet from './planet'
import Episode from './episode'
import CharacterEpisode from './characterEpisode'
import { isNumeric } from 'validator'

@Table
export default class Character extends Model {
  declare setPlanet: any
  declare getPlanet: any
  declare addEpisodes: any
  declare setEpisodes: any
  declare getEpisodes: any

  @Column
  name: string

  @ForeignKey(() => Planet)
  @Column
  PlanetId: number

  @BelongsTo(() => Planet)
  Planet: Planet

  @BelongsToMany(() => Episode, () => CharacterEpisode)
  Episodes: Episode[]
}

export const getCharacters = async (): Promise<Character[]> => {
  const characters = await Character.findAll({
    include: [Planet, Episode],
  })

  if (characters instanceof Array && !characters.length) {
    return []
  }

  return characters.map((character) => formatGetterData(character))
}

export const getCharacter = async (id: number): Promise<Character | Object> => {
  const character = await Character.findByPk(id, {
    include: [Planet, Episode],
  })

  if (!(character instanceof Character)) {
    return {}
  }

  return formatGetterData(character)
}

export const createCharacter = async (
  body: any
): Promise<Character | Object> => {
  const character = await createOrUpdateData(body)

  if (!(character instanceof Character)) {
    return {}
  }

  return formatGetterData(character)
}

export const updateCharacter = async (id: number, body: any) => {
  const character = await createOrUpdateData(body, id)

  if (!(character instanceof Character)) {
    return {}
  }

  return formatGetterData(character)
}

const formatGetterData = (character: Character) => {
  const data: any = {
    id: character.id,
    name: character.name,
  }

  if (character.Planet instanceof Planet) {
    data.planet = {
      id: character.Planet.id,
      name: character.Planet.name,
    }
  }

  if (character.Episodes instanceof Array && character.Episodes.length) {
    data.episodes = character.Episodes.map((episode) => ({
      id: episode.id,
      name: episode.name,
    }))
  }

  return data
}

const createOrUpdateData = async (body: any, id?: number) => {
  let character: Character | null

  if (id) {
    character = await Character.findByPk(id)

    if (!(character instanceof Character)) {
      return {}
    }

    character.name = body.name
    await character.save()
  } else {
    character = await Character.create({
      name: body.name,
    })
  }

  if (body.hasOwnProperty('planetId')) {
    let planet: Planet | null = null

    if (isNumeric(body.planetId)) {
      planet = await Planet.findByPk(body.planetId)
    }

    await character.setPlanet(planet)
  }

  if (body.hasOwnProperty('episodeIds')) {
    const episodes = await Episode.findAll({
      where: {
        id: body.episodeIds,
      },
    })

    if (episodes instanceof Array && episodes.length) {
      await character.setEpisodes(episodes)
    }
  }

  const characterWithAssociations = await Character.findByPk(character.id, {
    include: [Planet, Episode],
  })

  return characterWithAssociations
}
