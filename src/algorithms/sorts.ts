import type { TraceStep } from '../types';

export function bubbleSortSteps(input: number[]): TraceStep[] {
  const values = [...input];
  const steps: TraceStep[] = [];

  steps.push({
    values: [...values],
    active: [],
    sorted: [],
    line: 1,
    message: 'Start with the unsorted array.',
    variables: {},
  });

  for (let end = values.length - 1; end > 0; end -= 1) {
    for (let index = 0; index < end; index += 1) {
      steps.push({
        values: [...values],
        active: [index, index + 1],
        sorted: [],
        line: 4,
        message: `Compare ${values[index]} and ${values[index + 1]}.`,
        variables: { i: String(index), j: String(index + 1) },
      });

      if (values[index] > values[index + 1]) {
        [values[index], values[index + 1]] = [values[index + 1], values[index]];
        steps.push({
          values: [...values],
          active: [index, index + 1],
          sorted: [],
          line: 6,
          message: 'Swap the out-of-order pair.',
          variables: { i: String(index), j: String(index + 1) },
        });
      }
    }
  }

  steps.push({
    values: [...values],
    active: [],
    sorted: values.map((_, index) => index),
    line: 99,
    message: 'The array is sorted.',
    variables: {},
  });

  return steps;
}
