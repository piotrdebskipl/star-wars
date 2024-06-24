import { Table, Model, ForeignKey, Column } from 'sequelize-typescript'
import Character from './character'
import Episode from './episode'

@Table
export default class CharacterEpisode extends Model {
  @ForeignKey(() => Character)
  @Column
  CharacterId: number

  @ForeignKey(() => Episode)
  @Column
  EpisodeId: number
}
