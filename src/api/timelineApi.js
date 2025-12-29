// src/api/timelineApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ✅ Get all timelines
export const gettimelines = async () => {
  const response = await fetch(`${BASE_URL}/api/timeline/getdata`);
  if (!response.ok) throw new Error("Failed to fetch timeline");
  return response.json();
};

// ✅ Add timeline (used in Addtimeline)
export const addtimeline = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/timeline/addtimeline`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

// ✅ Update timeline (used in Edit page)
export const updatetimeline = async (id, formData) => {
  const response = await fetch(`${BASE_URL}/api/timeline/updatetimeline/${id}`, {
    method: "PATCH",
    body: formData,
  });
  return response.json();
};

// ✅ Delete timeline
export const deletetimeline = async (id) => {
  const response = await fetch(`${BASE_URL}/api/timeline/deletetimeline/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

// ✅ Update timeline status
export const updatetimelineStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/timeline/updateStatus`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};

// ✅ Get timeline by ID (for edit form)
export const gettimelineById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/timeline/gettimelineByid/${id}`);
  if (!response.ok) throw new Error("Failed to fetch timeline");
  return response.json();
};
