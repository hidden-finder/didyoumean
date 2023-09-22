import { calculateMyersDistanceShort, calculateMyersDistanceLong } from './calculate'

/**
 * Calculates the Levenshtein distance between two strings.
 *
 * The Levenshtein distance is a measure of the similarity between two strings.
 * It represents the minimum number of single-character edits (insertions, deletions,
 * or substitutions) required to change one string into the other.
 *
 * @param {string} text - The first input string.
 * @param {string} pattern - The second input string.
 * @returns {number} The Levenshtein distance between the two input strings.
 */
export const calculateDistance = (text: string, pattern: string): number => {
  if (pattern.length === 0) return text.length
  if (text.length === 0) return pattern.length

  if (text.length < pattern.length) [text, pattern] = [pattern, text]

  if (text.length <= 32) return calculateMyersDistanceShort(text, pattern)

  return calculateMyersDistanceLong(text, pattern)
}

/**
 * Calculates the similarity between two strings using the normalized Levenshtein similarity metric.
 *
 * The Levenshtein similarity metric measures the similarity between two strings as a value between 0 and 1.
 * It is calculated as (1 - (edit distance / longest length)), where the edit distance represents the minimum
 * number of single-character edits (insertions, deletions, or substitutions) required to change one string into the other,
 * and the longest length is the length of the longer of the two input strings.
 *
 * @param {string} text - The first input string.
 * @param {string} pattern - The second input string.
 * @returns {number} The Levenshtein similarity score between the two input strings (between 0 and 1).
 */
export const similarity = (text: string, pattern: string): number => {
  if (!text || !pattern) return 0
  if (text === pattern) return 1

  const editDistance = calculateDistance(text, pattern)
  const longestLength = Math.max(text.length, pattern.length)

  return (longestLength - editDistance) / longestLength
}

/**
 * Finds the closest matching pattern from an array of patterns to a given string.
 *
 * This function calculates the Levenshtein distance between the input string and each pattern
 * in the provided array and returns the pattern with the smallest Levenshtein distance.
 *
 * @param {string} string - The input string for which to find the closest matching pattern.
 * @param {string[]} patterns - An array of patterns to compare against the input string.
 * @returns {string} The closest matching pattern from the provided array.
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
