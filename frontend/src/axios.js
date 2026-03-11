import axios from "axios";

const makerequest = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export { makerequest };