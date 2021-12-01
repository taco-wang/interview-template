import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('remember_me_token').defaultTo('')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
