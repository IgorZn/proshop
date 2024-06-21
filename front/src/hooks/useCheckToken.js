import {useCheckTokenMutation, useLogoutMutation} from "../slices/usersApiSlice.js";
import {useCallback, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";



export function useCheckToken(userInfo) {
    const navigate = useNavigate();
    const {token} = userInfo
    const [resStatus, setResStatus] = useState(null)
    const [checkToken, {data, error, isLoading}] = useCheckTokenMutation();

    const getTokenStatus = useCallback(async () => {
        await checkToken({token})
    }, []);


    useEffect(() => {
        getTokenStatus()
    }, []);

    return {data, error, isLoading}
}