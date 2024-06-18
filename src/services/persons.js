import axios from "./bedrock.js";
const baseUrl = "/api/persons";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (e) {
    console.error(`error :>> ${getAll.name},`, e);
  }
};
/**
 * @param {*} newPerson
 */
const create = async (newPerson) => {
  try {
    const response = await axios.post(baseUrl, newPerson);
    return response.data;
  } catch (e) {
    console.error(`error :>> ${create.name},`, e);
  }
};

/**
 * Asynchronously removes an object with the specified ID.
 *
 * @param {number} id - The ID of the object to be removed
 * @param {object} newPerson - The new object to replace the removed object
 * @return {any} The data of the response
 */
const remove = async (id, newPerson) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, newPerson);
    return response.data;
  } catch (e) {
    console.error(`error :>> ${remove.name},`, e);
  }
};

/**
 * Updates an object with the given id using the newObject.
 *
 * @param {number} id - The id of the object to be updated
 * @param {object} newPerson - The new object to update
 * @return {any} The updated object data
 */
const update = async (id, newPerson) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newPerson);
    return response.data;
  } catch (e) {
    console.error(`error :>> ${update.name},`, e);
  }
};
const method = {
  getAll,
  create,
  remove,
  update,
};
export default method;
