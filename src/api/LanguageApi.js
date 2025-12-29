// src/api/LanguageApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchLanguage  = async () => {
  const response = await fetch(`${BASE_URL}/api/language/getdataLanguage`);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

export const addLanguage = async (category) => {
  const response = await fetch(`${BASE_URL}/api/language/addLanguage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const updateLanguage = async (id, category) => {
  const response = await fetch(`${BASE_URL}/api/language/updateLanguage/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const deleteLanguage = async (id) => {
  const response = await fetch(`${BASE_URL}/api/language/deleteLanguage/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const getLanguageById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/language/getLanguageByid/${id}`);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

export const updateLanguageStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/language/update-statuscategory`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};
