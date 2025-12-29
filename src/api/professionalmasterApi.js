// src/api/professionalmasterApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ✅ Get all professionalmasters
export const getprofessionalmasters = async () => {
  const response = await fetch(`${BASE_URL}/api/professionalmaster/getdata`);
  if (!response.ok) throw new Error("Failed to fetch professionalmasters");
  return response.json();
};

// ✅ Add professionalmaster (used in Addprofessionalmaster)
export const addprofessionalmaster = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/professionalmaster/addprofessional`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

// ✅ Update professionalmaster (used in Edit page)
export const updateprofessionalmaster = async (id, formData) => {
  const response = await fetch(`${BASE_URL}/api/professionalmaster/updateprofessional/${id}`, {
    method: "PATCH",
    body: formData,
  });
  return response.json();
};

// ✅ Delete professionalmaster
export const deleteprofessionalmaster = async (id) => {
  const response = await fetch(`${BASE_URL}/api/professionalmaster/deleteprofessional/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

// ✅ Update professionalmaster status
export const updateprofessionalmasterStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/professionalmaster/update-statusprofessional`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};

// ✅ Get professionalmaster by ID (for edit form)
export const getprofessionalmasterById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/professionalmaster/getprofessionalByid/${id}`);
  if (!response.ok) throw new Error("Failed to fetch professionalmaster");
  return response.json();
};
