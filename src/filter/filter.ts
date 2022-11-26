import { Kind } from '../common';

export type Filter<T, R extends T> = {
  kind: Kind.FILTER;
  run: (value: T, index: number) => R;
};

export const NEGATIVE_SYMBOL = Symbol.for('NEGATIVE');

export function filter<T, R extends T>(
  predicate: (value: T, index: number) => value is R,
): Filter<T, R>;
export function filter<T>(
  predicate: (value: T, index: number) => boolean,
): Filter<T, T>;
export function filter<T>(
  predicate: (value: T, index: number) => boolean,
): Filter<T, any> {
  return {
    kind: Kind.FILTER,
    run: (value, index) => {
      if (predicate(value, index)) {
        return value;
      } else {
        return NEGATIVE_SYMBOL;
      }
    },
  };
}
