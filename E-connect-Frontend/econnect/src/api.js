import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Post API calls
export const postAPI = {
  getAll: () => API.get("/posts"),
  getById: (id) => API.get(`/posts/${id}`),
  getByUser: (email) => API.get(`/posts/user/${email}`),
  getByCategory: (category) => API.get(`/posts/category/${category}`),
  create: (post) => API.post("/posts", post),
  update: (id, post) => API.put(`/posts/${id}`, post),
  delete: (id) => API.delete(`/posts/${id}`),
  countByUser: (email) => API.get(`/posts/count/${email}`),
};

// User API calls
export const userAPI = {
  getAll: () => API.get("/users"),
  getByEmail: (email) => API.get(`/users/${email}`),
  createOrUpdate: (user) => API.post("/users", user),
  incrementContribution: (email) => API.post(`/users/${email}/increment`),
  getContributions: (email) => API.get(`/users/${email}/contributions`),
};