import axios from "axios";
const baseUrl = "/api/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  const response = await request;
  return response.data;
};

/**
 * Asynchronously removes an object with the specified ID.
 *
 * @param {number} id - The ID of the object to be removed
 * @param {object} newPerson - The new object to replace the removed object
 * @return {any} The data of the response
 */
const remove = async (id, newPerson) => {
  const request = axios.delete(`${baseUrl}/${id}`, newPerson);
  const response = await request;
  return response.data;
};

/**
 * Updates an object with the given id using the newObject.
 *
 * @param {number} id - The id of the object to be updated
 * @param {object} newPerson - The new object to update
 * @return {any} The updated object data
 */
const update = async (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson);
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
