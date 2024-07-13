import { Alert} from "react-bootstrap";
import {Navigate, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useCookies} from "react-cookie";
import {useState} from "react";
import {useLogoutMutation} from "../slices/usersApiSlice.js";
import {logout} from "../slices/authSlice.js";
import {useDispatch} from "react-redux";


const Message = ({variant, children}) => {
    const [cookies, setCookie, removeCookie, getCookie] = useCookies(['jwt']);
    const [jwtMessage, setJwtMessage] = useState(children?.data?.message)
    const [logoutUser] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(jwtMessage === 'jwt expired'){
        setTimeout(async () => {
            await logoutUser().unwrap()
            removeCookie('jwt')
            removeCookie('connect.sid')

            dispatch(logout())
            navigate("/login")
        }, 1000)
    }

    return (
        <Alert variant={variant}>
            {/* eslint-disable-next-line react/prop-types */}
            {children?.data?.message ? children?.data?.message : children}
            {children?.data?.message && toast.error('Please re-login.')}
            {children?.data?.message === 'jwt expired' && (<Navigate to="/login"/>)}
        </Alert>
    )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message