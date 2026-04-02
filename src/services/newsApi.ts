// src/services/newsApi.ts

import axios from "axios";

const API_KEY = "pub_56dd451b27cb4eb082cb91647721baf6";

export const fetchNews = async () => {
  try {
    const response = await axios.get(
      `https://newsdata.io/api/1/latest?apikey=${API_KEY}&category=business,technology&language=en`
    );

    return response.data.results || [];
  } catch (error: any) {
    console.log("News API error:", error.message);
    return [];
  }
};