import { LOGIN, REGISTER, START_LOADING, END_LOADING } from '../constans/actionTypes';
import * as api from '../api/index';

export const login = (formData, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        // megambil data pada backend
        const { data } = await api.userLogin(formData);

        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: LOGIN, payload: data });
        dispatch({ type: END_LOADING });

        history.push('/');
    } catch (error) {
        dispatch({ type: START_LOADING });
        // mengambil error response yang dikirimkan oleh backend
        const { data } = error.response;

        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: LOGIN, payload: data });
        dispatch({ type: END_LOADING });
    };
};

export const register = (formData, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        // mengambil data pada backend
        const { data } = await api.userRegister(formData);

        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: REGISTER, payload: data });
        dispatch({ type: END_LOADING });

        history.push('/');
    } catch (error) {
        dispatch({ type: START_LOADING });
        // mengambil error response yang dikirimkan oleh backend
        const { data } = error.response;

        // mengirim data kepada reducer sesuai typenya
        dispatch({ type: REGISTER, payload: data });
        dispatch({ type: END_LOADING });
    };
};