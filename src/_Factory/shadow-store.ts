import { get, set } from 'lodash';

const curry = (fn) => (...arg) =>
  (arg.length >= fn.length) ? fn(...arg) : curry(fn.bind(null, ...arg));

const each = curry((fn, iter) => {
  for (const a of iter) {
    fn(a);
  }
});

export default (() => {
  const _store = {};
  const _subscribers: { [key: string]: any } = {};

  const getState = (path: string) => get(_store, path);

  const setState = (path: string, value: any) => {
    set(_store, path, value);
    if (!_subscribers[path]) _subscribers[path] = new Set();
    each((subscriber: (val: any) => void) => subscriber(value), _subscribers[path]);
  };

  const subscribe = (path: string, callback: (val: any) => void) =>
    (_subscribers[path] || new Set()).add(callback);

  return {
    getState,
    setState,
    subscribe,
  };
})();
