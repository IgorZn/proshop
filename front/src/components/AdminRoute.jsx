import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useCookies} from "react-cookie";

function AdminRoute({children}) {
    const {userInfo} = useSelector((state) => state.auth)
    const [cookies, setCookie, removeCookie, getCookie] = useCookies(['jwt']);


    return (
        <>
            {userInfo?.isAdmin ? children : (<Navigate to="/login"/>)}
        </>
    )
}

export default AdminRoute;