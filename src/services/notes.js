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
    const response = await axios.get(baseUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    });
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
    const response = await axios.post(baseUrl, newNote, config);
    return response.data;
  } catch (e) {
    console.error(`error :>> ${create.name},`, e);
  }
};

const update = async (id, newNote) => {
  try {
    const response = await request;
    axios.put(`${baseUrl}/${id}`, newNote);
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
