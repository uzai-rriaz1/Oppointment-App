import axios from "axios";

const routeApi = axios.create({
  baseURL: "http://sunny-playfulness-production-4174.up.railway.app/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { routeApi };
