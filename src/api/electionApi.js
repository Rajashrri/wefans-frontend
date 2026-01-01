// src/api/MovievApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/* ===============================
   🎯 Celebrity API Functions
   =============================== */

// ✅ Fetch all language options (for dropdown)
export const getLanguageOptions = async () => {
  const response = await fetch(`${BASE_URL}/api/election/languageOptions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch language options");
  return response.json();
};

// ✅ Fetch all profession options (for dropdown)
export const getProfessionsOptions = async () => {
  const response = await fetch(`${BASE_URL}/api/election/professionsOptions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch profession options");
  return response.json();
};
export const addElection = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/election/addElection`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

// ✅ Get celebrity by ID (for edit view)
export const getElectionByCelebrity = async (id) => {
  const response = await fetch(`${BASE_URL}/api/election/getElectionByCelebrity/${id}`);
  if (!response.ok) throw new Error("Failed to fetch election by ID");
  return response.json();
};



export const deleteElection = async (id) => {
  const response = await fetch(
    `${BASE_URL}/api/election/deleteelection/${id}`,
    { method: "DELETE" }
  );
  return await response.json();
};

// ✅ Get celebrity by ID (for edit view)
export const getElectionById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/election/getElectionByid/${id}`);
  if (!response.ok) throw new Error("Failed to fetch Election by ID");
  return response.json();
};

// ✅ Update celebrity
export const updateElection = async (id, formData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/election/updateElection/${id}`,
      {
        method: "PATCH",
        body: formData, // send raw FormData
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Update election API Error:", error);
    return { status: false, msg: "Network error" };
  }
};



export const updateElectionStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/election/update-statusElection`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};
// ✅ Fetch all social link options (for dropdown)
export const getSocialLinksOptions = async () => {
  const response = await fetch(`${BASE_URL}/api/election/sociallist`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch social link options");
  return response.json();
};
