import {logger} from './logger'
interface EnvironmentVariables {
  apiServerPort: string
  viewDbConnectionString: string
  messageDbConnectionString: string
}

const requireFromEnv = (key: string) => {

  if (!process.env[key]) {
   logger.error(`Missing environment variable: ${key}`,{key})
    return process.exit(1)
  }
  return process.env[key]
}

export const env: EnvironmentVariables = {
  apiServerPort: requireFromEnv('API_SERVER_PORT')!,
  viewDbConnectionString: requireFromEnv('VIEW_DB_CONNECTION_STRING')!,
  messageDbConnectionString: requireFromEnv('MESSAGE_DB_CONNECTION_STRING')!,
}

