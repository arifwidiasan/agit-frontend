import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:1323/api/",
  Headers: {
    "Content-Type": "application/json",
  },
});
