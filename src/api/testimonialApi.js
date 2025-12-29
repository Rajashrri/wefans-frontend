// src/api/testimonialApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ✅ Add Testimonial
export const addTestimonial = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/testimonial/addtestimonial`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

// ✅ Get all Testimonials
export const getTestimonials = async () => {
  const response = await fetch(`${BASE_URL}/api/testimonial/getdatatestimonial`);
  if (!response.ok) throw new Error("Failed to fetch testimonials");
  return response.json();
};

// ✅ Get Testimonial by ID
export const getTestimonialById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/testimonial/gettestimonialsByid/${id}`);
  if (!response.ok) throw new Error("Failed to fetch testimonial");
  return response.json();
};

// ✅ Update Testimonial
export const updateTestimonial = async (id, formData) => {
  const response = await fetch(`${BASE_URL}/api/testimonial/updatetestimonial/${id}`, {
    method: "PATCH",
    body: formData,
  });
  return response.json();
};

// ✅ Delete Testimonial
export const deleteTestimonial = async (id) => {
  const response = await fetch(`${BASE_URL}/api/testimonial/deletetestimonial/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

// ✅ Update Testimonial Status (optional)
export const updateTestimonialStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/testimonial/update-statustestimonial`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};
