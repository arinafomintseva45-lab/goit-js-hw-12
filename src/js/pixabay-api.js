import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "55227321-8aa875f9c6bbda7d6f4af2a1c";

export async function getImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 15,
    page: page,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}