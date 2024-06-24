/* v8 ignore next 70 */
import axios from "./bedrock.js";
const baseUrl = "/api/persons";

/**
 * @returns {Promise<PersonType[]>}
 */
const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (e) {
    console.error(`error :>> ${getAll.name},`, e);
    return [];
  }
};
/**
 * @param {PersonType} newPerson
 * @returns {Promise<PersonType>}
 */
const create = async (newPerson) => {
  try {
    const response = await axios.post(baseUrl, newPerson);
    return response.data;
  } catch (e) {
    console.error(`error :>> ${create.name},`, e);
    throw new Error("Person.create Error");
  }
};

/**
 * Asynchronously removes an object with the specified ID.
 * @param {number} id - The ID of the object to be removed
 * @returns {Promise<void>}
 */
const remove = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (e) {
    console.error(`error :>> ${remove.name},`, e);
    throw new Error("Person.remove Error");
  }
};

/**
 * Updates an object with the given id using the newObject.
 *
 * @param {number} id - The id of the object to be updated
 * @param {PersonType} newPerson - The new object to update
 * @returns {Promise<PersonType>}
 *
 */
const update = async (id, newPerson) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newPerson);
    return response.data;
  } catch (e) {
    console.error(`error :>> ${update.name},`, e);
    throw new Error("Person.update Error");
  }
};
const method = {
  getAll,
  create,
  remove,
  update,
};
export default method;
