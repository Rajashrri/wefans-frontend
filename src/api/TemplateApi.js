// src/api/celebratyApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/* ===============================
   🎯 Celebrity API Functions
   =============================== */

// ✅ Get celebrity by ID (for edit view)
export const getSectionTemplateById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/template/getSectionTemplateById/${id}`);
  if (!response.ok) throw new Error("Failed to fetch celebraty by ID");
  return response.json();
};

