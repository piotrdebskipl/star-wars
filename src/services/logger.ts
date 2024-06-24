import { createLogger, format, transports } from 'winston'

const { combine, timestamp, json } = format
const customFormat = combine(timestamp(), json())
const logger = createLogger({
  level: 'info',
  format: customFormat,
  transports: [
    new transports.File({ filename: './logs/error.log', level: 'error' }),
    new transports.File({ filename: './logs/info.log', level: 'info' }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: customFormat,
    })
  )
}

export default logger
