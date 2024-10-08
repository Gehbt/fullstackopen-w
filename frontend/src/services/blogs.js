import axios from "./bedrock.js";
import { Token, setToken } from "./with-token.js";
const baseUrl = "/api/blogs";

axios.defaults.headers.get["Accept"] = "*/*";
const tk = new Token();
/**
 * @returns {Promise<BlogType[]>}
 */
const getAll = async () => {
  // console.log("get blogs");
  const response = await axios.get(baseUrl, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      Authorization: tk.token || undefined,
    },
  });
  return response.data;
};
/**
 * @param {BlogType} newBlog
 * @returns {Promise<BlogType>}
 */
const create = async (newBlog) => {
  try {
    if (!tk.token) {
      throw new Error("token is not set");
    }
    const tokenConfig = {
      headers: { Authorization: tk.token },
    };
    const response = await axios.post(baseUrl, newBlog, tokenConfig);
    return response.data;
  } catch (e) {
    throw new Error("Blog.create Error");
  }
};
/**
 * @param {keyof BlogType} key
 * @param {BlogType} newBlog
 * @returns {Promise<BlogType>}}
 */
const update = async (key, newBlog) => {
  try {
    if (!tk.token) {
      throw new Error("token is not set");
    }
    const tokenConfig = {
      headers: { Authorization: tk.token },
    };
    await axios.put(`${baseUrl}/${key}`, newBlog, tokenConfig);
    console.log("Blog.update", newBlog);
    return newBlog;
  } catch (/** @type {*} */ e) {
    console.error("Blog.update Error");

    throw new Error(e);
  }
};
/**
 * @param {string} url
 */
const remove = async (url) => {
  try {
    if (!tk.token) {
      throw new Error("token is not set");
    }
    const tokenConfig = {
      headers: { Authorization: tk.token },
    };
    const response = await axios.delete(`${baseUrl}/${url}`, tokenConfig);
    return response.data;
  } catch (/** @type {*} */ e) {
    console.error("Blog.remove Error");

    throw new Error(e);
  }
};

const method = {
  getAll,
  create,
  update,
  remove,
  /**
   * @param {string | null} newToken
   */
  setToken: (newToken) => setToken(tk, newToken),
};
export default method;
