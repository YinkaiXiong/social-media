import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-media-production-30d3.up.railway.app",
});

export default instance;
