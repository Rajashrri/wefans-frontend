// src/api/MovievApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/* ===============================
   🎯 Celebrity API Functions
   =============================== */

// ✅ Fetch all language options (for dropdown)
export const getLanguageOptions = async () => {
  const response = await fetch(`${BASE_URL}/api/series/languageOptions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch language options");
  return response.json();
};

// ✅ Fetch all profession options (for dropdown)
export const getProfessionsOptions = async () => {
  const response = await fetch(`${BASE_URL}/api/series/professionsOptions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch profession options");
  return response.json();
};
export const addSeries = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/series/addSeries`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

// ✅ Get celebrity by ID (for edit view)
export const getSeriesByCelebrity = async (id) => {
  const response = await fetch(`${BASE_URL}/api/series/getSeriesByCelebrity/${id}`);
  if (!response.ok) throw new Error("Failed to fetch Series by ID");
  return response.json();
};



export const deleteSeries = async (id) => {
  const response = await fetch(
    `${BASE_URL}/api/series/deleteseries/${id}`,
    { method: "DELETE" }
  );
  return await response.json();
};

// ✅ Get celebrity by ID (for edit view)
export const getSeriesById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/series/getSeriesByid/${id}`);
  if (!response.ok) throw new Error("Failed to fetch Series by ID");
  return response.json();
};

// ✅ Update celebrity
export const updateSeries = async (id, formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/series/updateSeries/${id}`,
      {
        method: "PATCH",
        body: formData, // send raw FormData
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Update series API Error:", error);
    return { status: false, msg: "Network error" };
  }
};

// ✅ Get Trivia Categories (for dropdown)
export const getGenreMaster = async () => {
  const response = await fetch(`${BASE_URL}/api/series/GenreMasterOptions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const updateSeriesStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/series/update-statusSeries`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};
// ✅ Fetch all social link options (for dropdown)
export const getSocialLinksOptions = async () => {
  const response = await fetch(`${BASE_URL}/api/series/sociallist`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch social link options");
  return response.json();
};
