import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Sale from './Sale'

export default class Client extends BaseModel {

  @hasOne(() => Sale, {
    foreignKey: 'client_id',
  })
  public sale: HasOne<typeof Sale>

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public cpf: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
