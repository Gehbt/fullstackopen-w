import axios from "axios";
const baseUrl = "/api/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;
  return response.data;
};

/**
 * Asynchronously removes an object with the specified ID.
 *
 * @param {number} id - The ID of the object to be removed
 * @param {object} newObject - The new object to replace the removed object
 * @return {any} The data of the response
 */
const remove = async (id, newObject) => {
  const request = axios.delete(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
};

/**
 * Updates an object with the given id using the newObject.
 *
 * @param {number} id - The id of the object to be updated
 * @param {object} newObject - The new object to update
 * @return {any} The updated object data
 */
const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
};
const method = {
  getAll,
  create,
  remove,
  update,
};
export default method;
