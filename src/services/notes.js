import axios from "./bedrock.js";
const baseUrl = "/api/notes";
axios.defaults.headers.get["Accept"] = "*/*";
/**
 * @type {string | null}
 */
let token = null;
/**
 * @param {string | null} newToken
 */
const setToken = (newToken) => {
  if (newToken && newToken !== "null" && newToken !== "undefined") {
    token = `bearer ${newToken}`;
  } else {
    token = null;
  }
};
const getAll = async () => {
  try {
    const request = axios.get(baseUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    });
    const response = await request;
    return response.data;
  } catch (e) {
    console.error(`error :>> ${getAll.name},`, e);
  }
};

const create = async (newNote) => {
  try {
    if (token === null) {
      throw new Error("no token");
    }
    const config = {
      headers: { Authorization: token },
    };
    const request = axios.post(baseUrl, newNote, config);
    const response = await request;
    return response.data;
  } catch (e) {
    console.error(`error :>> ${create.name},`, e);
  }
};

const update = async (id, newNote) => {
  try {
    const request = axios.put(`${baseUrl}/${id}`, newNote);
    const response = await request;
    return response.data;
  } catch (e) {
    console.error(`error :>> ${update.name},`, e);
  }
};

const method = {
  getAll,
  create,
  update,
  setToken,
};
export default method;
