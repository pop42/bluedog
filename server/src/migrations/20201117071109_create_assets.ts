import * as Knex from 'knex'

export const up = async (knex: Knex): Promise<void> => knex.schema.createTable('assets', table => {
  table.uuid('id').primary()
  table.string('asset_type').defaultTo('Vehicle')
  table.integer('last_message_global_position').defaultTo(0)
})

export const down = (knex: Knex): Promise<void> => knex.schema.dropTable('assets')


