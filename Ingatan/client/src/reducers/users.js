import { LOGIN, REGISTER, LOGOUT, START_LOADING, END_LOADING } from '../constans/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { value: [], message: '', status: false, isLoading: true }, action) => {
    // mengatur data yang diterima dari action sesuai typenya untuk ditampilkan pada halaman
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case LOGIN:
            // apabila terjadi error pada backend maka akan menampilkan error status dan error message
            if (action?.payload?.response?.status === false) {
                return { ...state, status: action?.payload?.response?.status, message: action?.payload?.response?.message };
            };
            // apabila tidak terjadi error
            localStorage.setItem('profile', JSON.stringify({ token: action?.payload?.response?.token || action?.payload?.token, data: action?.payload?.response?.value || action?.payload?.value }));
            return { ...state, value: action?.payload?.response?.value, message: action?.payload?.response?.message, status: action?.payload?.response?.status, isLoading: false };
        case REGISTER:
            // apabila terjadi error pada backend maka akan menampilkan error status dan error message
            if (action?.payload?.response?.status === false) {
                return { ...state, status: action?.payload?.response?.status, message: action?.payload?.response?.message };
            };
            // apabila tidak terjadi error
            localStorage.setItem('profile', JSON.stringify({ token: action?.payload?.response?.token || action?.payload?.token, data: action?.payload?.response?.value || action?.payload?.value }));
            return { ...state, value: action?.payload?.response?.value, message: action?.payload?.response?.message, status: action?.payload?.response?.status, isLoading: false };
        case LOGOUT:
            localStorage.clear();
            return { ...state, value: null, message: '', status: false, isLoading: true };
        default:
            return state;
    };
};