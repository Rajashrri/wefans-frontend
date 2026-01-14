// src/api/customoptionApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ✅ Get all customoptions
export const getcustomoption = async (id) => {
  const response = await fetch(`${BASE_URL}/api/customoption/getdata/${id}`);
  if (!response.ok) throw new Error("Failed to fetch customoption");
  return response.json();
};

// ✅ Add customoption (used in Addcustomoption)
export const addcustomoption = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/customoption/addcustomoption`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

// ✅ Update customoption (used in Edit page)
export const updatecustomoption = async (id, formData) => {
  const response = await fetch(`${BASE_URL}/api/customoption/updatecustomoption/${id}`, {
    method: "PATCH",
    body: formData,
  });
  return response.json();
};

// ✅ Delete customoption
export const deletecustomoption = async (id) => {
  const response = await fetch(`${BASE_URL}/api/customoption/deletecustomoption/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

// ✅ Update customoption status
export const updatecustomoptionStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/customoption/updateStatus`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};

// ✅ Get customoption by ID (for edit form)
export const getcustomoptionById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/customoption/getcustomoptionByid/${id}`);
  if (!response.ok) throw new Error("Failed to fetch customoption");
  return response.json();
};
