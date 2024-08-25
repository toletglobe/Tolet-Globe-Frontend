import axios from "axios";
import { BASE_URL } from "../constant/constant";

export const API = axios.create({
  baseURL: BASE_URL,
});
