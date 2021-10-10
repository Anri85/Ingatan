import { GET_ALL_POSTS, GET_SINGLE_POST, GET_POSTS_BY_SEARCH, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST, COMMENT_POST, START_LOADING, END_LOADING } from '../constans/actionTypes';
import * as api from '../api/index';

export const getAllPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        // mengambil data pada backend
        const { data } = await api.fetchPosts(page);

        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: GET_ALL_POSTS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: START_LOADING });
        // mengambil error response yang dikirimkan oleh backend
        const { data } = error.response;

        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: GET_ALL_POSTS, payload: data });
        dispatch({ type: END_LOADING });
    };
};

export const getSinglePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        // mengambil data pada backend
        const { data } = await api.fetchPost(id);

        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: GET_SINGLE_POST, payload: { detail: data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: START_LOADING });
        // mengambil error response yang dikirimkan oleh backend
        const { data } = error.response;

        dispatch({ type: GET_SINGLE_POST, payload: data });
        dispatch({ type: END_LOADING });
    };
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        // mengambil data pada backend
        const { data } = await api.fetchPostBySearch(searchQuery);

        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: GET_POSTS_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: START_LOADING });
        // mengambil error response yang dikirimkan oleh backend
        const { data } = error.response;

        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: GET_POSTS_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    };
};

export const createPost = (formData, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        // mengambil data pada backend
        const { data } = await api.createPost(formData);

        history.push('/');
        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: CREATE_POST, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: START_LOADING });
        // mengambil error response yang dikirimkan oleh backend
        const { data } = error.response;

        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: CREATE_POST, payload: data });
        dispatch({ type: END_LOADING });
    };
};

export const updatePost = (id, formData) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        // mengambil data pada backend
        const { data } = await api.updatePost(id, formData);

        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: UPDATE_POST, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: START_LOADING });
        // mengambil error response yang dikirimkan oleh backend
        const { data } = error.response;

        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: UPDATE_POST, payload: data });
        dispatch({ type: END_LOADING });
    };
};

export const deletePost = (id) => async (dispatch) => {
    try {
        // mengambil data pada backend
        const { data } = await api.deletePost(id);

        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: DELETE_POST, payload: { ...data, id } });
    } catch (error) {
        // mengambil error response yang dikirimkan oleh backend
        const { data } = error.response;

        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: DELETE_POST, payload: data });
    };
};

export const likePost = (id) => async (dispatch) => {
    try {
        // mengambil data pada backend
        const { data } = await api.updateLikeCount(id);

        // mengirim data pada reducer sesuai typenya
        dispatch({ type: LIKE_POST, payload: data });
    } catch (error) {
        // mengambil error response yang dikirimkan oleh backend
        const { data } = error.response;

        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: LIKE_POST, payload: data });
    };
};

export const commentPost = (id, formData) => async (dispatch) => {
    try {
        // mengambil data pada backend
        const { data } = await api.commentPost(id, { comment: formData });

        // mengirim data pada reducer sesuai typenya
        dispatch({ type: COMMENT_POST, payload: data });
    } catch (error) {
        // mengambil error response yang dikirimkan oleh backend
        const { data } = error.response;

        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: COMMENT_POST, payload: data });
    };
};