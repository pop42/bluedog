import Knex from 'knex'

export const createDbClient = async (connectionString: string) => {

  const client = Knex({
    client: 'pg',
    connection: connectionString,
    migrations: {
      extension: 'ts',
      directory: 'dist/migrations',
    },
  })


  return client

}



