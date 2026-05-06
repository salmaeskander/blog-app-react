import axios from 'axios';
 
const BASE_URL = 'http://localhost:3001';
 
const api = axios.create({
  baseURL: BASE_URL,
});
 
// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 
// ─── AUTH ────────────────────────────────────────────────────────────────────
 
export const registerUser = (name, email, password) =>
  api.post('/register', { name, email, password });
 
export const loginUser = (email, password) =>
  api.post('/login', { email, password });
 
// ─── POSTS ───────────────────────────────────────────────────────────────────
 
export const getPosts = () =>
  api.get('/posts');
 
export const createPost = (postData) =>
  api.post('/posts', postData);
 
export const updatePost = (id, postData) =>
  api.put(`/posts/${id}`, postData);
 
export const deletePost = (id) =>
  api.delete(`/posts/${id}`);
 
export default api;