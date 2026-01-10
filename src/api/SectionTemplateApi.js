// src/api/SectionTemplateApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchSectionTemplate  = async () => {
  const response = await fetch(`${BASE_URL}/api/sectiontemplate/getdataSectionTemplate`);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};
// ✅ Fetch all language options (for dropdown)
export const getSectionsOptions = async () => {
  const response = await fetch(`${BASE_URL}/api/sectiontemplate/sectionsOptions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch language options");
  return response.json();
};
export const addSectionTemplate = async (category) => {
  const response = await fetch(`${BASE_URL}/api/sectiontemplate/addSectionTemplate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return response.json();
};



export const updateSectionTemplate = async (id, category) => {
  const response = await fetch(`${BASE_URL}/api/sectiontemplate/updateSectionTemplate/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const deleteSectionTemplate = async (id) => {
  const response = await fetch(`${BASE_URL}/api/sectiontemplate/deleteSectionTemplate/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const getSectionTemplateById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/sectiontemplate/getSectionTemplateByid/${id}`);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

export const updateSectionTemplateStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/sectiontemplate/update-statuscategory`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};
