import axios from "axios";
import { BASE_URL } from "../constant/constant";

class Service {
  static async fetchBlog() {
    try {
      const response = await axios.get(`${BASE_URL}blog/blogs`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async fetchBlogBySlug(slug) {
    try {
      const response = await axios.get(`${BASE_URL}blog/blogs/${slug}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async fetchProperty() {
    try {
    //  console.log(`Fetching from: ${BASE_URL}property`);
      const response = await axios.get(`${BASE_URL}property`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    //  console.log("Response received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in fetchProperty:", error.response || error);
      throw error;
    }
  }
// fetching properties dynamically from slug
  static async fetchPropertyBySlug (slug) {
   try {
  //   console.log(`Fetching from: ${BASE_URL}property/slug/${slug}`);
     const response = await axios.get(`${BASE_URL}property/slug/${slug}`, {
     headers: {
       "Content-Type": "application/json",
     },
   });
     return response.data;
   } catch (error) {
    console.log(error.response.data.message || error);
   }
  }

  static async fetchPropertyById(_id) {
    try {
      const response = await axios.get(`${BASE_URL}property/${_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default Service;
