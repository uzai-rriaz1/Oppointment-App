import axios from "axios";

const routeApi = axios.create({
  // baseURL: "https://sunny-playfulness-production-4174.up.railway.app/api/v1",
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { routeApi };
