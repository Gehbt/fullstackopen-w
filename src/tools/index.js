/**
 * @typedef {(...args: any[]) => any} AnyFunction
 */

/**
 * @param {AnyFunction} setFn
 * @param {any} value
 * @param {number} timeOut
 */
export const setAndTimeOutReset = (setFn, value, timeOut = 5000) => {
  setFn(value);
  window.setTimeout(() => {
    setFn(null);
  }, timeOut);
};
