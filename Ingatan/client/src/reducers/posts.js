import { GET_ALL_POSTS, GET_SINGLE_POST, GET_POSTS_BY_SEARCH, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST, COMMENT_POST, START_LOADING, END_LOADING } from '../constans/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { value: [], message: '', status: false, isLoading: true }, action) => {
    // mengatur data yang diterima dari action sesuai typenya untuk ditampilkan pada halaman
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case GET_ALL_POSTS:
            // apabila terjadi error pada backend maka akan menampilkan error status dan error message
            if (action?.payload?.response?.status === false) {
                return { ...state, status: action?.payload?.response?.status, message: action?.payload?.response?.message };
            };
            // apabila tidak terjadi error
            return { ...state, value: action?.payload?.response?.value, message: action?.payload?.response?.message, status: action?.payload?.response?.status };
        case GET_SINGLE_POST:
            if (action?.payload?.response?.status === false) {
                return { ...state, status: action?.payload?.response?.status, message: action?.payload?.response?.message };
            };
            // apabila tidak terjadi error
            return { ...state, detail: action?.payload?.detail?.response?.value, message: action?.payload?.response?.detail?.message, status: action?.payload?.response?.detail?.status };
        case GET_POSTS_BY_SEARCH:
            // apabila terjadi error pada backend maka akan menampilkan error status dan error message
            if (action?.payload?.status === false) {
                return { ...state, status: action.payload.status, message: action.payload.message };
            };
            // apabila tidak terjadi error
            return { ...state, value: action.payload.value, message: action.payload.message, status: action.payload.status };
        case CREATE_POST:
            // apabila terjadi error pada backend maka akan menampilkan error status dan error message
            if (action?.payload?.response?.status === false) {
                return { ...state, status: action?.payload?.response?.status, message: action?.payload?.response?.message };
            };
            // apabila tidak terjadi error
            return { ...state, value: [...state?.value, action?.payload?.response?.value], message: action?.payload?.response?.message, status: action?.payload?.response?.status };
        case UPDATE_POST:
            // apabila terjadi error pada backend maka akan menampilkan error status dan error message
            if (action?.payload?.response?.status === false) {
                return { ...state, status: action?.payload?.response?.status, message: action?.payload?.response?.message };
            };
            // apabila tidak terjadi error
            return { ...state, value: state?.value.map((post) => (post._id === action?.payload?.response?.value?._id ? action?.payload?.response?.value : post)), message: action?.payload?.response?.message, status: action?.payload?.response?.status };
        case DELETE_POST:
            // apabila terjadi error pada backend maka akan menampilkan error status dan error message
            if (action?.payload?.response?.status === false) {
                return { ...state, status: action?.payload?.response?.status, message: action?.payload?.response?.message };
            };
            // apabila tidak terjadi error
            return { ...state, value: state?.value.filter((post) => (post?._id !== action?.payload?.id)), message: action?.payload?.response?.message, status: action?.payload?.response?.status };
        case LIKE_POST:
            // apabila terjadi error pada backend maka akan menampilkan error status dan error message
            if (action?.payload?.response?.status === false) {
                return { ...state, status: action?.payload?.response?.status, message: action?.payload?.response?.message }
            }
            // apabila tidak terjadi error
            return { ...state, value: state?.value.map((post) => (post?._id === action?.payload?.response?.value?._id ? action?.payload?.response?.value : post)), message: action?.payload?.response?.message, status: action?.payload?.response?.status }
        case COMMENT_POST:
            return {
                ...state, value: state.value.map((post) => {
                    if (post._id === +action.payload._id) {
                        return action.payload.value;
                    };
                    return post;
                })
            };
        default:
            return state;
    };
};