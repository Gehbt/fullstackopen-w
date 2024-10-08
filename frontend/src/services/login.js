import axios from "./bedrock.js";
const baseUrl = "/api/login";

/**
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<UserType>}
 */
const login = async (credentials) => {
  try {
    console.log("credentials :>> ", credentials);
    const response = await axios.post(baseUrl, credentials, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    console.log("response", response);
    return response.data;
  } catch (e) {
    console.error(`error :>> ${login.name},`, e);
    throw new Error("Login error");
  }
};

// const logout = async (credentials) => {
//   const response = await axios.post(baseUrl, credentials);
//   return response.data;
// };
const method = { login };

export default method;
