// utils/api.js
export const API_BASE_URL = "http://localhost:3005";

export const fetchAPI = async (endpoint) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
};
