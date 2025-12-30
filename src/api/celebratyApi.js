// src/api/celebratyApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/* ===============================
   🎯 Celebrity API Functions
   =============================== */

// ✅ Fetch all language options (for dropdown)
export const getLanguageOptions = async () => {
  const response = await fetch(`${BASE_URL}/api/celebraty/languageOptions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch language options");
  return response.json();
};

// ✅ Fetch all profession options (for dropdown)
export const getProfessionsOptions = async () => {
  const response = await fetch(`${BASE_URL}/api/celebraty/professionsOptions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch profession options");
  return response.json();
};
export const getProfessions = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/celebraty/professions`);
    if (!res.ok) {
      throw new Error("Failed to fetch professions");
    }
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching professions:", error);
    return [];
  }
};
// ✅ Add new celebrity
export const addCelebraty = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/celebraty/addcelebraty`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

// ✅ Get all celebrities
export const getCelebraties = async () => {
  const response = await fetch(`${BASE_URL}/api/celebraty/getcelebraties`);
  if (!response.ok) throw new Error("Failed to fetch celebraties");
  return response.json();
};

// ✅ Get celebrity by ID (for edit view)
export const getCelebratyById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/celebraty/getcelebratyByid/${id}`);
  if (!response.ok) throw new Error("Failed to fetch celebraty by ID");
  return response.json();
};

// ✅ Update celebrity
export const updateCelebraty = async (id, formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/celebraty/updatecelebraty/${id}`,
      {
        method: "PATCH",
        body: formData, // send raw FormData
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Update Celebraty API Error:", error);
    return { status: false, msg: "Network error" };
  }
};


// ✅ Delete celebrity
export const deleteCelebraty = async (id) => {
  const response = await fetch(`${BASE_URL}/api/celebraty/deletecelebraty/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
export const updateCelebratyStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/celebraty/update-statuscelebraty`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};
// ✅ Fetch all social link options (for dropdown)
export const getSocialLinksOptions = async () => {
  const response = await fetch(`${BASE_URL}/api/celebraty/sociallist`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch social link options");
  return response.json();
};
