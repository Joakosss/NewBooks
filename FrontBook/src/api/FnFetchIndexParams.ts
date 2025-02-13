import axios from "axios";

export const fetchIndexBook = () => {
    return axios
      .get("http://127.0.0.1:8000/topBooks/", {
        params: {
          maxResults: 4,
        },
      })
      .then((res) => {
        return res.data.top_books;
      })
      .catch(() => {
        return [];
      });
  };