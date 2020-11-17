import * as Knex from 'knex'

export const up = async (knex: Knex): Promise<void> => knex.schema.createTable('users', table => {
  table.uuid('id').primary()
  table.jsonb('data').defaultTo('{}')
  table.boolean('is_email_verified').defaultTo(false)
  table.integer('last_message_global_position').defaultTo(0)
})

export const down = (knex: Knex): Promise<void> => knex.schema.dropTable('users')


