// src/api/TriviaTypesApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchTriviaTypes = async () => {
  const response = await fetch(`${BASE_URL}/api/triviaTypes/getdataTriviaTypes`);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

export const addTriviaTypes = async (category) => {
  const response = await fetch(`${BASE_URL}/api/triviaTypes/addTriviaTypes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const updateTriviaTypes = async (id, category) => {
  const response = await fetch(`${BASE_URL}/api/TriviaTypes/updateTriviaTypes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const deleteTriviaTypes = async (id) => {
  const response = await fetch(`${BASE_URL}/api/TriviaTypes/deleteTriviaTypes/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const getTriviaTypesById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/TriviaTypes/getTriviaTypesByid/${id}`);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

export const updateTriviaTypesStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/TriviaTypes/update-statuscategory`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};
