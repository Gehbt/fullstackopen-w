import axios from "./bedrock.js";
import { Token, setToken } from "./with-token.js";
const baseUrl = "/api/notes";
axios.defaults.headers.get["Accept"] = "*/*";

const tk = new Token();
/**
 * @returns {Promise<NoteType[]>}
 */
const getAll = async () => {
  try {
    if (tk.token === null) {
      throw new TypeError("no token");
    }
    const response = await axios.get(baseUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Authorization: tk.token,
      },
    });
    return response.data;
  } catch (e) {
    return [];
  }
};
/**
 * @param {InitNoteType} newNote
 * @returns {Promise<NoteType>}
 */
const create = async (newNote) => {
  try {
    if (tk.token === null) {
      throw new Error("no token");
    }
    const tokenConfig = {
      headers: { Authorization: tk.token },
    };
    const response = await axios.post(baseUrl, newNote, tokenConfig);
    return response.data;
  } catch (e) {
    throw new Error("Note.create Error");
  }
};
/**
 *
 * @param {number} id
 * @param {NoteType} newNote
 * @returns {Promise<NoteType>}
 */
const update = async (id, newNote) => {
  try {
    const tokenConfig = {
      headers: { Authorization: tk.token },
    };
    const response = await axios.put(`${baseUrl}/${id}`, newNote, tokenConfig);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const method = {
  getAll,
  create,
  update,
  /**
   * @param {string | null} newToken
   * @returns
   */
  setToken: (newToken) => setToken(tk, newToken),
};
export default method;
