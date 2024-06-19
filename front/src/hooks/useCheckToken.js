import {useCheckTokenMutation, useLogoutMutation} from "../slices/usersApiSlice.js";
import {useCallback, useEffect, useState} from "react";


export function useCheckToken(userInfo) {
    const {token} = userInfo
    const [resStatus, setResStatus] = useState(null)
    const [checkToken, {data, error}] = useCheckTokenMutation();

    const getTokenStatus = useCallback(async () => {
        await checkToken({token})
    }, [])


    useEffect(() => {
        getTokenStatus()
    }, []);

    return {data, error}
}