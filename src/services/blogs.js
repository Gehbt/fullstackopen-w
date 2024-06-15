import axios from "axios";
const baseUrl = "/api/blogs";

axios.defaults.headers.get["Accept"] = "*/*";
/**
 * @type {string | null}
 */
let token = null;

const setToken = (newToken) => {
  if (newToken) {
    token = `bearer ${newToken}`;
  }
};

const getAll = async () => {
  if (!token) {
    return Promise.resolve([]);
  }
  const request = axios.get(baseUrl, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      Authorization: token,
    },
  });
  const response = await request;
  return response.data;
};
const create = async (newBlog) => {
  const tokenConfig = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, newBlog, tokenConfig);
  const response = await request;
  return response.data;
};

const update = async (id, newObject) => {
  const tokenConfig = {
    headers: { Authorization: token },
  };
  const request = axios.put(`${baseUrl}/${id}`, newObject, tokenConfig);
  const response = await request;
  return response.data;
};

const remove = async (id, newObject) => {
  const tokenConfig = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, newObject, tokenConfig);
  const response = await request;
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
