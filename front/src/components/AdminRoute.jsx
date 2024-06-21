import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

function AdminRoute({children}) {
    const {userInfo} = useSelector((state) => state.auth)

    return (
        <>
            {userInfo?.isAdmin ? children : (<Navigate to="/login"/>)}
        </>
    )
}

export default AdminRoute;