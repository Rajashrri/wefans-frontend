// src/api/GenreMasterApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchGenreMaster = async () => {
  const response = await fetch(`${BASE_URL}/api/genreMaster/getdataGenreMaster`);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

export const addGenreMaster = async (category) => {
  const response = await fetch(`${BASE_URL}/api/genreMaster/addGenreMaster`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const updateGenreMaster = async (id, category) => {
  const response = await fetch(`${BASE_URL}/api/genreMaster/updateGenreMaster/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const deleteGenreMaster = async (id) => {
  const response = await fetch(`${BASE_URL}/api/genreMaster/deleteGenreMaster/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const getGenreMasterById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/genreMaster/getGenreMasterByid/${id}`);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

export const updateGenreMasterStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/genreMaster/update-statuscategory`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};
