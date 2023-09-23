const patternEqualityArray = new Uint32Array(65536)

export const calculateMyersDistanceShort = (text: string, pattern: string): number => {
  const textLength = text.length
  const patternLength = pattern.length
  const lastSetBit = 1 << (textLength - 1)

  let positiveVector = -1
  let negativeVector = 0
  let point = textLength

  for (let i = textLength - 1; i >= 0; i--) {
    patternEqualityArray[text.charCodeAt(i)] |= 1 << i
  }

  for (let i = 0; i < patternLength; i++) {
    let equality = patternEqualityArray[pattern.charCodeAt(i)]
    const mixedVector = equality | negativeVector

    equality |= ((equality & positiveVector) + positiveVector) ^ positiveVector
    negativeVector |= ~(equality | positiveVector)
    positiveVector &= equality

    if ((negativeVector & lastSetBit) !== 0) {
      point++
    }
    if ((positiveVector & lastSetBit) !== 0) {
      point--
    }

    negativeVector = (negativeVector << 1) | 1
    positiveVector = (positiveVector << 1) | ~(mixedVector | negativeVector)
    negativeVector &= mixedVector
  }

  for (let i = textLength - 1; i >= 0; i--) {
    patternEqualityArray[text.charCodeAt(i)] = 0
  }

  return point
}

export const calculateMyersDistanceLong = (text: string, pattern: string): number => {
  const textLength = text.length
  const patternLength = pattern.length
  const matchHighBits = new Array<number>(Math.ceil(textLength / 32))
  const mismatchHighBits = new Array<number>(Math.ceil(textLength / 32))

  for (let i = 0; i < matchHighBits.length; i++) {
    matchHighBits[i] = 0
    mismatchHighBits[i] = -1
  }

  let negativeVector = 0
  let positiveVector = -1
  let point = patternLength
  let patternHighBit: number, textHighBit: number, mixedHighBit: number

  for (let j = 0; j < Math.ceil(patternLength / 32); j++) {
    const start = j * 32
    const vectorLength = Math.min(32, patternLength - start) + start

    for (let k = start; k < vectorLength; k++) {
      patternEqualityArray[pattern.charCodeAt(k)] |= 1 << k
    }

    for (let i = 0; i < textLength; i++) {
      const equality = patternEqualityArray[text.charCodeAt(i)]
      const index = (i / 32) | 0
      const patternBit = (matchHighBits[index] >>> i) & 1
      const textBit = (mismatchHighBits[index] >>> i) & 1
      const mixedVector = equality | negativeVector

      mixedHighBit = ((((equality | textBit) & positiveVector) + positiveVector) ^ positiveVector) | equality | textBit
      patternHighBit = negativeVector | ~(mixedHighBit | positiveVector)
      textHighBit = positiveVector & mixedHighBit

      if (((patternHighBit >>> 31) ^ patternBit) !== 0) {
        matchHighBits[index] ^= 1 << i
      }
      if (((textHighBit >>> 31) ^ textBit) !== 0) {
        mismatchHighBits[index] ^= 1 << i
      }

      patternHighBit = (patternHighBit << 1) | patternBit
      textHighBit = (textHighBit << 1) | textBit
      positiveVector = textHighBit | ~(mixedVector | patternHighBit)
      negativeVector = patternHighBit & mixedVector
    }

    for (let k = start; k < vectorLength; k++) {
      patternEqualityArray[pattern.charCodeAt(k)] = 0
    }
  }

  const start = Math.ceil(patternLength / 32) * 32
  const vectorLength = Math.min(32, patternLength - start) + start

  for (let k = start; k < vectorLength; k++) {
    patternEqualityArray[pattern.charCodeAt(k)] |= 1 << k
  }

  for (let i = 0; i < textLength; i++) {
    const equality = patternEqualityArray[text.charCodeAt(i)]
    const index = (i / 32) | 0
    const patternBit = (matchHighBits[index] >>> i) & 1
    const textBit = (mismatchHighBits[index] >>> i) & 1
    const mixedVector = equality | negativeVector

    mixedHighBit = ((((equality | textBit) & positiveVector) + positiveVector) ^ positiveVector) | equality | textBit
    patternHighBit = negativeVector | ~(mixedHighBit | positiveVector)
    textHighBit = positiveVector & mixedHighBit

    point += (patternHighBit >>> (patternLength - 1)) & 1
    point -= (textHighBit >>> (patternLength - 1)) & 1

    if (((patternHighBit >>> 31) ^ patternBit) !== 0) {
      matchHighBits[index] ^= 1 << i
    }
    if (((textHighBit >>> 31) ^ textBit) !== 0) {
      mismatchHighBits[index] ^= 1 << i
    }

    patternHighBit = (patternHighBit << 1) | patternBit
    textHighBit = (textHighBit << 1) | textBit
    positiveVector = textHighBit | ~(mixedVector | patternHighBit)
    negativeVector = patternHighBit & mixedVector
  }

  for (let k = start; k < vectorLength; k++) {
    patternEqualityArray[pattern.charCodeAt(k)] = 0
  }

  return point
}
