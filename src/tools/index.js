export const setWithReset = (setFn, value, timeOut = 5000) => {
  setFn(value);
  setTimeout(() => {
    setFn(null);
  }, timeOut);
};
