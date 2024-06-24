import { describe, expect, test } from '@jest/globals'
import Episode from '../../models/episode'
import db from '../../services/db'
import Character from '../../models/character'
import CharacterEpisode from '../../models/characterEpisode'

const episodes = [{ name: 'NEWHOPE' }, { name: 'EMPIRE' }, { name: 'JEDI' }]

describe('Episodes', () => {
  test('Add new Episode', async () => {
    const episode = await Episode.create({
      name: episodes[0].name,
    })

    expect(episode).toBeInstanceOf(Episode)
    expect(episode.name).toEqual(episodes[0].name)
  })

  test('Add Episodes to Character', async () => {
    const transaction = await db.transaction()
    const createdEpisodes = await Episode.bulkCreate(episodes, { transaction })

    const character = await Character.create(
      { name: 'Luke Skywalker' },
      { transaction }
    )

    await character.setEpisodes(createdEpisodes, { transaction })

    const characterEpisodes = await character.getEpisodes({ transaction })

    await transaction.commit()

    expect(characterEpisodes).toBeInstanceOf(Array)
    expect(characterEpisodes.length).toEqual(3)
    expect(characterEpisodes[0]).toBeInstanceOf(Episode)
    expect(characterEpisodes[2]).toBeInstanceOf(Episode)
  })

  afterEach(async () => {
    await CharacterEpisode.destroy({ where: {} })
    await Character.destroy({ where: {} })
    await Episode.destroy({ where: {} })
  })

  afterAll(async () => {
    await db.close()
  })
})
