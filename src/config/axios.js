import axios from "axios";
import { BASE_URL } from "./constant";

export const API = axios.create({
  baseURL: BASE_URL,
});
