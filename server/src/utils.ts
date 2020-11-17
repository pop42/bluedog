import {LoremIpsum} from 'lorem-ipsum'
import {snakeCase, toLower, isNil} from 'lodash'

export const randomWord = () => new LoremIpsum({
  wordsPerSentence: {
    min: 1,
    max: 1,
  },
}).generateWords()

export const randomName = () => new LoremIpsum({
  wordsPerSentence: {
    min: 1,
    max: 3,
  },
}).generateWords()

export const randomEmail = () => `${toLower(snakeCase(randomName()))}@${toLower(snakeCase(randomWord()))}.com`

export const streamNameToCategory =  (streamName: string) => {
  if (isNil(streamName)) {
    return ''
  }

  return streamName.split('-')[0]
}