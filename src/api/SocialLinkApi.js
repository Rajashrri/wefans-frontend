// src/api/SocialLinkApi.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchSocialLink = async () => {
  const response = await fetch(`${BASE_URL}/api/socialLink/getdataSocialLink`);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

export const addSocialLink = async (category) => {
  const response = await fetch(`${BASE_URL}/api/socialLink/addSocialLink`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const updateSocialLink = async (id, category) => {
  const response = await fetch(`${BASE_URL}/api/socialLink/updateSocialLink/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const deleteSocialLink = async (id) => {
  const response = await fetch(`${BASE_URL}/api/socialLink/deleteSocialLink/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const getSocialLinkById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/socialLink/getSocialLinkByid/${id}`);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

export const updateSocialLinkStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/api/socialLink/update-statuscategory`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return response.json();
};
