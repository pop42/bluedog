import {Client} from 'pg'

export const getClient = async (connectionString: string) => {
  const client = new Client({connectionString})
  await client.connect()
  await client.query('SET search_path = message_store, public')
  return client
}