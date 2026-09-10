import axios from "axios";

export const DbzApi = axios.create({
  baseURL: "https://dragonball-api.com/api/",
  params: {
    lang: "es",
  },
});
