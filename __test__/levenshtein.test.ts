import * as levenshtein from '../src'

// Test calculateDistance function #https://planetcalc.com/1721/
describe('calculateDistance', () => {
  it('should calculate the correct edit distance', () => {
    expect(levenshtein.calculateDistance('kitten', 'sitting')).toEqual(3)
  })
})

// Test levenshteinSimilarity function
describe('levenshteinSimilarity', () => {
  it('should calculate the correct Levenshtein similarity', () => {
    expect(levenshtein.levenshteinSimilarity('kitten', 'sitting')).toEqual(0.5714285714285714)
  })
})

// Test bigramSimilarity function
describe('bigramSimilarity', () => {
  it('should calculate the correct bigram similarity', () => {
    expect(levenshtein.bigramSimilarity('apple', 'apples')).toEqual(0.8888888888888888)
  })
})

// Test similarity function
describe('similarity', () => {
  it('should calculate the correct combined similarity', () => {
    expect(levenshtein.similarity('kitten', 'sitting')).toEqual(0.4675324675324675)
  })
})

// Test didyoumean function
describe('didyoumean', () => {
  it('should find the most similar pattern', () => {
    const patterns = ['banana', 'apple', 'cherry', 'grape']
    expect(levenshtein.didyoumean('aple', patterns)).toEqual('apple')
  })
})
