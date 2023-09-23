# @hidden-finder/didyoumean

## Introduction

This library provides functions for comparing and calculating the similarity between two strings using various methods. It includes the following functions:

- `calculateDistance`: Calculates the edit distance (Levenshtein distance) between two strings.
- `levenshteinSimilarity`: Calculates the Levenshtein similarity between two strings.
- `bigramSimilarity`: Calculates the bigram similarity between two strings.
- `similarity`: Calculates a combined similarity score using Levenshtein and bigram similarities.
- `didyoumean`: Finds the most similar pattern from an array of patterns to a given input string.

## Installation

To use this library in your project, you can install it via:

```shell
npm install @hidden-finder/didyoumean

yarn add @hidden-finder/didyoumean
```

## Overview

```ts
import { calculateDistance, levenshteinSimilarity, bigramSimilarity, similarity, didyoumean } from '@hidden-finder/didyoumean'
```

## Functions

### `calculateDistance`

**Parameters:**

- `text` (string): The first input string.
- `pattern` (string): The second input string.

**Returns:** `number` - The edit distance between the two strings.

**Example:**

```ts
const distance = calculateDistance('kitten', 'sitting')
```

### `levenshteinSimilarity`

**Parameters:**

- `text` (string): The first input string.
- `pattern` (string): The second input string.

**Returns:** `number` - The Levenshtein similarity between the two strings (a value between 0 and 1).

Example:

```ts
const similarity = levenshteinSimilarity('kitten', 'sitting')
```

### `bigramSimilarity`

**Parameters:**

- `text` (string): The first input string.
- `pattern` (string): The second input string.

**Returns:** `number` - The bigram similarity between the two strings (a value between 0 and 1).

Example:

```ts
const similarity = bigramSimilarity('kitten', 'sitting')
```

### `similarity`

**Parameters:**

- `text` (string): The first input string.
- `pattern` (string): The second input string.

**Returns:** `number` - The combined similarity score between the two strings (a value between 0 and 1).

Example:

```ts
const similarity = similarity('kitten', 'sitting')
```

### `didyoumean`

**Parameters:**

- `text` (string): The input string to find a similar pattern for.
- `patterns` (string[]): An array of candidate patterns.

**Returns:** `string` - The most similar pattern from the array.

Example:

```ts
const patterns = ['banana', 'apple', 'cherry', 'grape']
const similarPattern = didyoumean('aple', patterns)
```

## License

This library is provided under the [MIT License](LICENSE)
