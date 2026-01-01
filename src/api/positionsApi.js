// src/api/MovievApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/* ===============================
   🎯 Celebrity API Functions
   =============================== */

// ✅ Fetch all language options (for dropdown)
export const getLanguageOptions = async () => {
  const response = await fetch(`${BASE_URL}/api/positions/languageOptions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch language options");
  return response.json();
};

// ✅ Fetch all profession options (for dropdown)
export const getProfessionsOptions = async () => {
  const response = await fetch(`${BASE_URL}/api/positions/professionsOptions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch profession options");
  return response.json();
};
export const addPositions = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/positions/addPositions`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

// ✅ Get celebrity by ID (for edit view)
export const getPositionsByCelebrity = async (id) => {
  const response = await fetch(`${BASE_URL}/api/positions/getPositionsByCelebrity/${id}`);
  if (!response.ok) throw new Error("Failed to fetch positions by ID");
  return response.json();
};



export const deletePositions = async (id) => {
  const response = await fetch(
    `${BASE_URL}/api/positions/deletepositions/${id}`,
    { method: "DELETE" }
  );
  return await response.json();
};

// ✅ Get celebrity by ID (for edit view)
export const getPositionsById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/positions/getPositionsByid/${id}`);
  if (!response.ok) throw new Error("Failed to fetch Positions by ID");
  return response.json();
};

// ✅ Update celebrity
export const updatePositions = async (id, formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/positions/updatePositions/${id}`,
      {
        method: "PATCH",
        body: formData, // send raw FormData
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Update positions API Error:", error);
    return { status: false, msg: "Network error" };
  }
};



export const updatePositionsStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/positions/update-statusPositions`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};
// ✅ Fetch all social link options (for dropdown)
export const getSocialLinksOptions = async () => {
  const response = await fetch(`${BASE_URL}/api/positions/sociallist`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch social link options");
  return response.json();
};
