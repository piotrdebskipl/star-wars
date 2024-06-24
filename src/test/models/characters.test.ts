import { describe, expect, test } from '@jest/globals'
import Character from '../../models/character'
import db from '../../services/db'
import Planet from '../../models/planet'

describe('Characters', () => {
  test('Add new Character', async () => {
    const character = await Character.create({
      name: 'Test',
    })

    expect(character).toBeInstanceOf(Character)
  })

  test('Add Planet to Character', async () => {
    const transaction = await db.transaction()
    const character = await Character.create(
      {
        name: 'Test',
      },
      { transaction }
    )
    const planet = await Planet.create(
      {
        name: 'Alderaan',
      },
      { transaction }
    )

    await character.setPlanet(planet, { transaction })

    const charactersPlanet = await character.getPlanet({ transaction })

    await transaction.commit()

    expect(character).toBeInstanceOf(Character)
    expect(charactersPlanet.id).toEqual(planet.id)
    expect(charactersPlanet.name).toEqual('Alderaan')
  })

  afterEach(async () => {
    await Character.destroy({ where: {} })
    await Planet.destroy({ where: {} })
  })

  afterAll(async () => {
    await db.close()
  })
})
