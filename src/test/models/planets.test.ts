import { describe, expect, test } from '@jest/globals'
import db from '../../services/db'
import Planet from '../../models/planet'

describe('Planets', () => {
  test('Add new Planet', async () => {
    const planet = await Planet.create({
      name: 'Test',
    })

    expect(planet).toBeInstanceOf(db.models.Planet)
  })

  afterAll(async () => {
    await Planet.destroy({ where: {} })
    await db.close()
  })
})
