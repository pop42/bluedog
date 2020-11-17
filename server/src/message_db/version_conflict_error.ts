
export class VersionConflictError extends Error {

  readonly name = 'VersionConflictError'
  readonly message: string


  constructor(stream, expected, actual) {
    super(`VersionConflict: stream ${stream} expected version ${expected} but was at version ${actual}`)
    this.message = `VersionConflict: stream ${stream} expected version ${expected} but was at version ${actual}`
  }
}