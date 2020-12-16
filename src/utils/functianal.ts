import { cloneDeep, curryRight, orderBy, uniqBy } from "lodash";

export const curry = (fn: any) => (...arg: any) =>
  (arg.length >= fn.length) ? fn(...arg) : curry(fn.bind(null, ...arg));

export const each = (fn: any, iter: any) => {
  for (const a of iter) {
    fn(a);
  }
};

export const includes = (target: any, iter: any) => {
  for (const a of iter) {
    if (a === target) return true;
  }
  return false;
};

export const sort = (fn: any, arr: any[]) => {
  const clone = cloneDeep(arr);
  return clone.sort(fn);
};

export const filter = (fn: any, arr: any[]) => {
  const result = [];

  for (const a of arr) {
    if (fn(a)) result.push(a);
  }

  return result;
};

export const reduce = (fn: any, acc: any, iter: any) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = fn(acc, a);
  }

  return acc;
};

export const map = (fn: any, iter: any) => {
  const arr = [];

  for (const a of iter) {
    arr.push(fn(a));
  }

  return arr;
};

export const go = (arg: any, ...fn: any) => reduce((acc: any, fn: any) => fn(acc), arg, fn);

export const pipe = (...fns: any) => (arg: any) => go(arg, ...fns);

export const Curry = {
  reduce: curry(reduce),
  filter: curry(filter),
  map: curry(map),
  sort: curry(sort),
  orederBy: curryRight(orderBy)(null),
  orederByDesc: curryRight(orderBy)('desc', null),
  uniqBy: curryRight(uniqBy),
};
