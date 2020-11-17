import {isNil} from 'lodash'

export const category =  (streamName: string) => {
  // Double equals to catch null and undefined
  if (isNil(streamName)) {
    return ''
  }

  return streamName.split('-')[0]
}


