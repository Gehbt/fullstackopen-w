import axios from "axios";
const baseUrl = "/api/notes";
axios.defaults.headers.get["Accept"] = "*/*";
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

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;
  return response.data;
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
};

const method = {
  getAll,
  create,
  update,
};
export default method;
