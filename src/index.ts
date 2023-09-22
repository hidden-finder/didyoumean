import { calculateMyersDistanceShort, calculateMyersDistanceLong } from './calculate'

export const calculateDistance = (text: string, pattern: string): number => {
  if (text.length < pattern.length) [pattern, text] = [text, pattern]

  if (pattern.length === 0) return text.length

  if (text.length === 0) return pattern.length

  if (text.length <= 32) return calculateMyersDistanceShort(text, pattern)

  return calculateMyersDistanceLong(text, pattern)
}

export const similarity = (text: string, pattern: string): number => {
  if (!text || !pattern) return 0
  if (text === pattern) return 1

  const editDistance = calculateDistance(text, pattern)
  const longestLength = Math.max(text.length, pattern.length)

  return (longestLength - editDistance) / longestLength
}

export const didyoumean = (string: string, patterns: string[]): string => {
  let minDistance = Infinity
  let minIndex = 0

  for (let i = 0; i < patterns.length; i++) {
    const distance = calculateDistance(string, patterns[i])
    if (distance < minDistance) {
      minDistance = distance
      minIndex = i
    }
  }

  return patterns[minIndex]
}
