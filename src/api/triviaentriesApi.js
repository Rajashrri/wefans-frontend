// src/api/triviaentriesApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ✅ Add Trivia Entry
export const addtriviaentries = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/triviaentries/addtriviaentries`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

// ✅ Get Trivia Categories (for dropdown)
export const gettriviaentriesCategories = async () => {
  const response = await fetch(`${BASE_URL}/api/triviaentries/categoryOptions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

// ✅ Get all Trivia Entries (for list page)
export const getTriviaentries = async () => {
  const response = await fetch(`${BASE_URL}/api/triviaentries/getdatatriviaentries`);
  return response.json();
};

// ✅ Get Trivia Entry by ID (for edit)
export const getTriviaentriesById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/triviaentries/gettriviaentriesByid/${id}`);
  return response.json();
};

// ✅ Update Trivia Entry
export const updateTriviaentries = async (id, formData) => {
  const response = await fetch(`${BASE_URL}/api/triviaentries/updatetriviaentries/${id}`, {
    method: "PATCH",
    body: formData,
  });
  return response.json();
};

// ✅ Update Trivia Entry Status
export const updateTriviaentriesStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/triviaentries/update-statustriviaentries`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};

// ✅ Delete Trivia Entry
export const deleteTriviaentries = async (id) => {
  const response = await fetch(`${BASE_URL}/api/triviaentries/deletetriviaentries/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
