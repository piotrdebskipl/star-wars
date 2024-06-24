import { Column, Table, Model } from 'sequelize-typescript'

@Table
export default class Episode extends Model {
  @Column
  name: string
}
