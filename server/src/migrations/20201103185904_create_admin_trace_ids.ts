import * as Knex from 'knex'

export const up = async (knex: Knex): Promise<void> => knex.schema.createTable('admin_trace_ids', table => {
  table.string('trace_id').primary()
  table.jsonb('json_data').defaultTo('[]')
  table.integer('last_message_global_position').defaultTo(0)
})

export const down = (knex: Knex): Promise<void> => knex.schema.dropTable('admin_trace_ids')


