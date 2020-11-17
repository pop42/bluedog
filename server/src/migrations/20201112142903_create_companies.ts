import * as Knex from 'knex'

export const up = async (knex: Knex): Promise<void> => knex.schema.createTable('companies', table => {
  table.uuid('id').primary()
  table.jsonb('data').defaultTo('{}')
})

export const down = (knex: Knex): Promise<void> => knex.schema.dropTable('companies')


