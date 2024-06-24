import { Column, Model, Table } from 'sequelize-typescript'

@Table
export default class Planet extends Model {
  @Column
  name: string
}
