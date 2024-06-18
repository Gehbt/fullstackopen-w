import axios from "./bedrock.js";
const baseUrl = "/api/blogs";

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
  if (!token) {
    return [];
  }
  const response = await axios.get(baseUrl, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      Authorization: token,
    },
  });
  return response.data;
};
const create = async (newBlog) => {
  const tokenConfig = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, tokenConfig);
  return response.data;
};

const update = async (id, newBlog) => {
  const tokenConfig = {
    headers: { Authorization: token },
  };
  console.log("token");
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, tokenConfig);
  return response.data;
};

const remove = async (id, oldBlog) => {
  const tokenConfig = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, oldBlog, tokenConfig);
  return response.data;
};

const method = {
  getAll,
  create,
  update,
  setToken,
  remove,
};
export default method;
