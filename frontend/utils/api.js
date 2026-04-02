import { LOCAL_API_URL } from "../const.js";

export async function fetchData(endpoint, options = {}) {
  const url = `${LOCAL_API_URL}${endpoint}`;

  const fetchOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (response.ok) {
      return await response.json();
    }

    // The server can send an HTML response, we need catch it and manage the posible error
    try {
      const errorMessage = await response.json();
      const formatedErrorMessage = `HTTP ${response.status} - ENDPOINT ${endpoint} : ${errorMessage.message}`;
      throw new Error(formatedErrorMessage);
    } catch (err) {
      console.warn("The server dont retrieve a valid JSON in the error");
    }
  } catch (err) {
    throw err;
  }
}
