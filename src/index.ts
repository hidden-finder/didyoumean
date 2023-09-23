import { calculateMyersDistanceShort, calculateMyersDistanceLong } from './calculate'

/**
 * Calculates the edit distance (Levenshtein distance) between two strings.
 *
 * @param {string} text - The first input string.
 * @param {string} pattern - The second input string.
 * @returns {number} The edit distance between the two strings.
 */
export const calculateDistance = (text: string, pattern: string): number => {
  if (pattern.length === 0) {
    return text.length
  }
  if (text.length === 0) {
    return pattern.length
  }

  if (text.length < pattern.length) {
    ;[text, pattern] = [pattern, text]
  }

  if (text.length <= 32) {
    return calculateMyersDistanceShort(text, pattern)
  }

  return calculateMyersDistanceLong(text, pattern)
}

/**
 * Calculates the Levenshtein similarity between two strings.
 *
 * @param {string} text - The first input string.
 * @param {string} pattern - The second input string.
 * @returns {number} The Levenshtein similarity between the two strings (a value between 0 and 1).
 */
export const levenshteinSimilarity = (text: string, pattern: string): number => {
  if (text === pattern) return 1

  if (text === '' || pattern === '') return 0

  const editDistance = calculateDistance(text, pattern)
  const longestLength = Math.max(text.length, pattern.length)

  return (longestLength - editDistance) / longestLength
}

/**
 * Calculates the bigram similarity between two strings.
 *
 * @param {string} text - The first input string.
 * @param {string} pattern - The second input string.
 * @returns {number} The bigram similarity between the two strings (a value between 0 and 1).
 */
export const bigramSimilarity = (text: string, pattern: string): number => {
  text = text.replace(/\s+/g, '')
  pattern = pattern.replace(/\s+/g, '')

  if (text === pattern) return 1
  if (text.length < 2 || pattern.length < 2) return 0

  const firstBigrams = new Map()
  for (let i = 0; i < text.length - 1; i++) {
    const bigram = text.substring(i, i + 2)
    const count = firstBigrams.has(bigram) ? (firstBigrams.get(bigram) as number) + 1 : 1

    firstBigrams.set(bigram, count)
  }

  let intersectionSize = 0
  for (let i = 0; i < pattern.length - 1; i++) {
    const bigram = pattern.substring(i, i + 2)
    const count = firstBigrams.has(bigram) ? (firstBigrams.get(bigram) as number) : 0

    if (count > 0) {
      firstBigrams.set(bigram, count - 1)
      intersectionSize++
    }
  }

  const denominator = text.length + pattern.length - 2
  if (denominator === 0) return 0

  return (2.0 * intersectionSize) / denominator
}

/**
 * Calculates a combined similarity score between two strings using Levenshtein and bigram similarities.
 *
 * @param {string} text - The first input string.
 * @param {string} pattern - The second input string.
 * @returns {number} The combined similarity score between the two strings (a value between 0 and 1).
 */
export const similarity = (text: string, pattern: string): number => {
  const levenshtein = levenshteinSimilarity(text, pattern)
  const bigram = bigramSimilarity(text, pattern)

  const combinedSimilarity = (levenshtein + bigram) / 2

  return combinedSimilarity
}

/**
 * Finds the most similar pattern from an array of patterns to a given input string.
 *
 * @param {string} string - The input string to find a similar pattern for.
 * @param {string[]} patterns - An array of candidate patterns.
 * @returns {string} The most similar pattern from the array.
 */
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
