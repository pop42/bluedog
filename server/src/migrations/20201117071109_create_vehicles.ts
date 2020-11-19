import * as Knex from 'knex'

export const up = async (knex: Knex): Promise<void> => knex.schema.createTable('vehicles', table => {
  table.uuid('id').primary()
  table.jsonb('data').defaultTo('{}')
  table.string('company_id').index('index_vehicles_company_id')
  table.integer('last_message_global_position').defaultTo(0)
})

export const down = (knex: Knex): Promise<void> => knex.schema.dropTable('vehicles')


