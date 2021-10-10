import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((request) => {
    if (localStorage.getItem('profile')) {
        request.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    };

    return request;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/post/${id}`);
export const fetchPostBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || ''}`);

export const createPost = (formData) => API.post('/post', formData);
export const updatePost = (id, formData) => API.put(`/post/update/${id}`, formData);
export const deletePost = (id) => API.delete(`/post/delete/${id}`);
export const updateLikeCount = (id) => API.put(`/post/like/${id}`);
export const commentPost = (id, formData) => API.post(`/post/comment/${id}`, formData);

export const userLogin = (formData) => API.post('/users/login', formData);
export const userRegister = (formData) => API.post('/users/register', formData);