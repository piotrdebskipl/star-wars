import { Column, Model, Table } from 'sequelize-typescript'

@Table
export default class Planet extends Model {
  @Column
  name: string
}

export const getPlanets = async (): Promise<Planet[]> => {
  const planets = await Planet.findAll()

  if (planets instanceof Array && !planets.length) {
    return []
  }

  return planets.map((planet) => formatGetterData(planet))
}

export const getPlanet = async (id: number): Promise<Planet | Object> => {
  const planet = await Planet.findByPk(id)

  if (!(planet instanceof Planet)) {
    throw new Error('There is no such Planet')
  }

  return formatGetterData(planet)
}

export const createPlanet = async (body: any): Promise<Planet | Object> => {
  const planet = await createOrUpdateData(body)

  if (!(planet instanceof Planet)) {
    throw new Error('There is no such Planet')
  }

  return formatGetterData(planet)
}

export const updatePlanet = async (id: number, body: any) => {
  const planet = await createOrUpdateData(body, id)

  if (!(planet instanceof Planet)) {
    throw new Error('There is no such Planet')
  }

  return formatGetterData(planet)
}

const formatGetterData = (planet: Planet): any => ({
  id: planet.id,
  name: planet.name,
})

const createOrUpdateData = async (body: any, id?: number) => {
  let planet: Planet | null

  if (id) {
    planet = await Planet.findByPk(id)

    if (!(planet instanceof Planet)) {
      throw new Error('There is no such Planet')
    }

    planet.name = body.name

    await planet.save()
  } else {
    planet = await Planet.create({
      name: body.name,
    })
  }

  return planet
}
