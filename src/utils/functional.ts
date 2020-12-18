import { reduce } from 'ramda';

export {
  curry,
  map,
  reduce,
  filter,
  sort,
  ascend,
  descend,
  prop,
  uniqBy,
  values,
} from 'ramda';

export const each = <S>(fn: (s: S) => void, iter: Iterable<S>) => {
  for (const a of iter) {
    fn(a);
  }
};

export const includes = <S>(target: S, iter: Iterable<S>) => {
  for (const a of iter) {
    if (a === target) return true;
  }
  return false;
};

export const go = (arg: any, ...fn: ((val: any) => any)[]) =>
  reduce((acc, fn) => fn(acc), arg, fn);
