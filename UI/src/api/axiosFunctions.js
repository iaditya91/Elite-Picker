import axios1 from "./axios1";

export const triggerGetWithAuth = async (url, token) =>
  await axios1.get(`${url}`, {
    headers: {
      "Content-Type": "application/json", // Example of another header
      Accept: "*/*",
      "ngrok-skip-browser-warning": "true",
      Authorization: "Bearer "+ token
    },
  });

export const triggerPostWithAuth = async (url, postData, token) =>
  await axios1.post(`${url}`, postData, {
    headers: {
      "Content-Type": "application/json", // Example of another header
      Accept: "*/*",
      "ngrok-skip-browser-warning": "true",
      Authorization: "Bearer " + token
    },
  });

export const triggerPostFormWithAuth = async (url, postData, token) =>
  await axios1.post(`${url}`, postData, {
    headers: {
      "Content-Type": "multipart/form-data", // Example of another header
      Accept: "*/*",
      "ngrok-skip-browser-warning": "true",
      Authorization: "Bearer " + token
    },
  });
