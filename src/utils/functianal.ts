export const curry = (fn: any) => (...arg: any) =>
  (arg.length >= fn.length) ? fn(...arg) : curry(fn.bind(null, ...arg));

export const each = curry((fn: any, iter: any) => {
  for (const a of iter) {
    fn(a);
  }
});

export const includes = (target: any, iter: any) => {
  for (const a of iter) {
    if (a === target) return true;
  }
  return false;
};
