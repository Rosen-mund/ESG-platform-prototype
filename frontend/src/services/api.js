import axios from "axios";

const api = axios.create({
  baseURL: "https://esg-backend-20x9.onrender.com/api",
});

export default api;