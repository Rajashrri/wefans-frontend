// src/api/sectionmasterApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ✅ Get all sectionmasters
export const getsectionmaster = async () => {
  const response = await fetch(`${BASE_URL}/api/sectionmaster/getdata`);
  if (!response.ok) throw new Error("Failed to fetch sectionmaster");
  return response.json();
};

// ✅ Add sectionmaster (used in Addsectionmaster)
export const addsectionmaster = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/sectionmaster/addsectionmaster`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

// ✅ Update sectionmaster (used in Edit page)
export const updatesectionmaster = async (id, formData) => {
  const response = await fetch(`${BASE_URL}/api/sectionmaster/updatesectionmaster/${id}`, {
    method: "PATCH",
    body: formData,
  });
  return response.json();
};

// ✅ Delete sectionmaster
export const deletesectionmaster = async (id) => {
  const response = await fetch(`${BASE_URL}/api/sectionmaster/deletesectionmaster/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

// ✅ Update sectionmaster status
export const updatesectionmasterStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/sectionmaster/updateStatus`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};

// ✅ Get sectionmaster by ID (for edit form)
export const getsectionmasterById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/sectionmaster/getsectionmasterByid/${id}`);
  if (!response.ok) throw new Error("Failed to fetch sectionmaster");
  return response.json();
};
