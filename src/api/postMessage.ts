import { API_BASE_URL } from "./api";

export const postMessage = async (message) => {
  const url = `${API_BASE_URL}/messages`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error(`Failed to post message with status ${response.status}`);
  }

  return response.json();
};
