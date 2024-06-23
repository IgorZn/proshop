import {useLogoutMutation} from "../slices/usersApiSlice.js";
import {logout} from "../slices/authSlice.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useCallback} from "react";



export const useLogoutHandler = async () => {
    const [logoutCall] = useLogoutMutation();
    const navigater = useNavigate();
    const dispatch = useDispatch();

    return useCallback(() => {
        logoutCall()
        dispatch(logout());
        navigater('/login');
    })
}