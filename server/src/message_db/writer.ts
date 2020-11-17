import {Event} from './index'

const writeFunctionSql = 'SELECT write_message($1, $2, $3, $4, $5, $6)'

const versionConflictErrorRegex = /^Wrong.*Stream Version: (-?\d+)\)/
import {VersionConflictError} from './version_conflict_error'
import {Client} from 'pg'

export const write = async (db: Client, streamName: string, message: Event, expectedVersion?: number) => {

  if (!message.type) {
    throw new Error('Messages must have a type')
  }

  const values = [
    message.id,
    streamName,
    message.type,
    message.data,
    message.metadata,
    expectedVersion,
  ]

  try {
    return await db.query(writeFunctionSql, values)
  } catch (error) {
    const errorMatch = error.message.match(versionConflictErrorRegex) // (6)
    const notVersionConflict = errorMatch === null
    if (notVersionConflict) {
      throw error
    }

    const actualVersion = parseInt(errorMatch[1], 10) // (7)

    const versionConflictError = new VersionConflictError( // (8)
      streamName, actualVersion, expectedVersion)

    versionConflictError.stack = error.stack

    throw versionConflictError

  }

}

