import axios from "axios";
const baseUrl = "/api/notes";
axios.defaults.headers.get["Accept"] = "*/*";

let token = null;

const setToken = (newToken) => {
  if (newToken) {
    token = `bearer ${newToken}`;
  }
};
const getAll = async () => {
  const request = axios.get(baseUrl, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
  });
  const response = await request;
  return response.data;
};

const create = async (newNote) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, newNote, config);
  const response = await request;
  return response.data;
};

const update = async (id, newNote) => {
  const request = axios.put(`${baseUrl}/${id}`, newNote);
  const response = await request;
  return response.data;
};

const method = {
  getAll,
  create,
  update,
  setToken,
};
export default method;
