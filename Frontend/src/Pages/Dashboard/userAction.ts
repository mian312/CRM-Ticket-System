import { Dispatch } from 'redux';
import { getUserPending, getUserSuccess, getUserFail } from './userSlice';
import { fetchUser } from '../../api/UserApi';

export const getUserProfile = () => async (dispatch: Dispatch) => {
    try {
        dispatch(getUserPending());

        const result: any = await fetchUser();

        if (result.user && result.user._id) {
            dispatch(getUserSuccess(result.user));
        } else {
            dispatch(getUserFail("User is not found"));
        }
    } catch (error: any) {
        dispatch(getUserFail(error.message));
    }
};
