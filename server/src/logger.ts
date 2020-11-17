import winston, {format, transports} from 'winston'

class Logger {

  static logger = winston.createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), format.prettyPrint()),
    transports: [new transports.Console()],
  })

}

export const logger = Logger.logger