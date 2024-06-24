export class Token {
  /**
   * @type {string | null}
   */
  #token = null;
  /**
   * @return {string | null}
   */
  get token() {
    return this.#token;
  }
  /**
   * @param {string | null} newToken
   */
  set token(newToken) {
    if (newToken) {
      this.#token = `bearer ${newToken}`;
    } else {
      this.#token = null;
    }
  }
}
/**
 * @param {Token} tk
 * @param {string | null} newToken
 */
export const setToken = (tk, newToken) => {
  if (newToken) {
    tk.token = newToken;
  } else {
    tk.token = null;
  }
};
