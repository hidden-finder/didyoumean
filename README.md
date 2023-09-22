# @hidden-finder/didyoumean

A simple and lightweight matching input to a list of potential matches using the [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) algorithm.

## Install

Install the dependency

```shell
npm install @hidden-finder/didyoumean

yarn add @hidden-finder/didyoumean
```

## Overview

```ts
import { calculateDistance, similarity, didyoumean } from '@hidden-finder/didyoumean'
```

- [Calculate Distance](#calculateDistance)
- [Similarity](#similarity)
- [Didyoumean](#didyoumean)

## API

### calculateDistance

The `calculateDistance` function calculates the Levenshtein distance between two input strings. The Levenshtein distance measures the similarity between two strings by determining the minimum number of single-character edits (insertions, deletions, or substitutions) needed to transform one string into the other.

#### Parameters

- `text` (string): The first input string.
- `pattern` (string): The second input string.

#### Returns

- (number): The Levenshtein distance between the two input strings.

```ts
import { calculateDistance } from '@hidden-finder/didyoumean'

const calculate = calculateDistance('hellow', 'hello')
const calculate2 = calculateDistance('hellow', 'world')
console.log(calculate, calculate2) // 1, 5
```

### similarity

The `similarity` function calculates the normalized Levenshtein similarity score between two input strings. This metric measures the similarity between two strings as a value between 0 and 1. A score of 0 indicates no similarity, while a score of 1 indicates identical strings.

#### Parameters

- `text` (string): The first input string.
- `pattern` (string): The second input string.

#### Returns

- (number): The Levenshtein similarity score between the two input strings, normalized to a value between 0 and 1.

```ts
import { similarity } from '@hidden-finder/didyoumean'

const similar = similarity('hellow', 'hello')
const similar2 = similarity('hellow', 'world')
console.log(similar, similar2) // 0.83, 0.16
```

### didyoumean

The `didyoumean` function is used to find the closest matching pattern from an array of patterns to a given input string. It does this by calculating the Levenshtein distance between the input string and each pattern in the provided array and returning the pattern with the smallest Levenshtein distance.

#### Parameters

- `string` (string): The input string for which you want to find the closest matching pattern.
- `patterns` (string[]): An array of patterns to compare against the input string.

#### Returns

- (string): The closest matching pattern from the provided array.

```ts
import { didyoumean } from '@hidden-finder/didyoumean'

const mean = didyoumean('hellow', ['hello', 'world'])
console.log(mean) // hello
```

## License

[MIT License](LICENSE)
