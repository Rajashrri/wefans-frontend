// src/api/celebratyApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/* ===============================
   🎯 Celebrity API Functions
   =============================== */

// ✅ Get celebrity by ID (for edit view)
export const getSectionTemplateById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/template/getSectionTemplateById/${id}`);
  const data = await response.json();
  return data; // ✅ returns { status: true, data: { ... } }
};

// ✅ Save Template Data
export const saveTemplateData = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/template/save`, {
    method: "POST",
    body: formData, // FormData (with files)
  });
  return response.json();
};

// ✅ Get Template Data by ID (for Edit)
export const getTemplateDataById = async (celebId, sectionId, dataId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/template/dataget/${celebId}/${sectionId}/${dataId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data; // e.g. { success: true, data: {...} }
  } catch (error) {
    console.error("Error fetching template data:", error);
    return { success: false, msg: "Failed to fetch template data" };
  }
};

// ✅ Update Template Data (for Edit)
export const updateTemplateData = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/template/update`, {
      method: "POST",
      body: formData, // FormData auto-sets multipart headers
    });

    const data = await response.json();
    return data; // e.g. { success: true, msg: "Template data updated successfully" }
  } catch (error) {
    console.error("Error updating template data:", error);
    return { success: false, msg: "Failed to update template data" };
  }
};


// ✅ Get celebrity by ID (for edit view)
export const getSectionData  = async (celebId, id) => {
const response = await fetch(`${BASE_URL}/api/template/data/${celebId}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch celebraty by ID");
  return response.json();
};