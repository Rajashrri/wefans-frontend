// src/api/MovievApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/* ===============================
   🎯 Celebrity API Functions
   =============================== */

// ✅ Fetch all language options (for dropdown)
export const getLanguageOptions = async () => {
  const response = await fetch(`${BASE_URL}/api/Moviev/languageOptions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch language options");
  return response.json();
};

// ✅ Fetch all profession options (for dropdown)
export const getProfessionsOptions = async () => {
  const response = await fetch(`${BASE_URL}/api/Moviev/professionsOptions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch profession options");
  return response.json();
};
export const addMoviev = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/moviev/addMoviev`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

// ✅ Get celebrity by ID (for edit view)
export const getMoviesByCelebrity = async (id) => {
  const response = await fetch(`${BASE_URL}/api/Moviev/getMoviesByCelebrity/${id}`);
  if (!response.ok) throw new Error("Failed to fetch Moviev by ID");
  return response.json();
};



export const deleteMoviev = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/moviev/${id}`,
    { method: "DELETE" }
  );
  return await response.json();
};

// ✅ Get celebrity by ID (for edit view)
export const getMovievById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/Moviev/getMovievByid/${id}`);
  if (!response.ok) throw new Error("Failed to fetch Moviev by ID");
  return response.json();
};

// ✅ Update celebrity
export const updateMoviev = async (id, formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/Moviev/updateMoviev/${id}`,
      {
        method: "PATCH",
        body: formData, // send raw FormData
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Update Moviev API Error:", error);
    return { status: false, msg: "Network error" };
  }
};



export const updateMovievStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/Moviev/update-statusMoviev`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};
// ✅ Fetch all social link options (for dropdown)
export const getSocialLinksOptions = async () => {
  const response = await fetch(`${BASE_URL}/api/Moviev/sociallist`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch social link options");
  return response.json();
};
