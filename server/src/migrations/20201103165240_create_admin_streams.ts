import * as Knex from 'knex'

export const up = async (knex: Knex): Promise<void> => knex.schema.createTable('admin_streams', table => {
  table.string('stream_name').primary()
  table.integer('message_count').defaultTo(0)
  table.string('last_message_id')
  table.integer('last_message_global_position').defaultTo(0)
})

export const down = (knex: Knex): Promise<void> => knex.schema.dropTable('admin_streams')


