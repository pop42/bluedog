import {aggregators, apiServer, components, messageDb, viewDbClient} from './config'
import {env} from './env'
import {logger} from './logger'

const apiServerPort = env.apiServerPort

const start = async () => {

  logger.info('Starting server')
  await messageDb.init()
  await viewDbClient.then(client => client.migrate.latest({tableName: 'knex_migrations'}))

  apiServer.listen(apiServerPort, () => {
    logger.info(`The api server is running on port: ${apiServerPort}`)
  })

  aggregators.forEach(aggregator => aggregator(viewDbClient, messageDb))
  components.forEach(component => component(messageDb))

}

start()

