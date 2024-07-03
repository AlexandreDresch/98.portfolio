import axios from "axios";

export const projectsInstance = axios.create({
  baseURL: process.env.API_KEY,
  headers: {
    "Content-type": "application/json",
  },
});
