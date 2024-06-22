import {useLogoutMutation} from "../../slices/usersApiSlice.js";
import AdminRoute from "../../components/AdminRoute.jsx";
import {useGetOrdersQuery} from "../../slices/orderApiSlice.js";
import {useCheckToken} from "../../hooks/useCheckToken.js";
import {toast} from "react-toastify";
import {logout} from "../../slices/authSlice.js";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Loader from "../../components/Loader.jsx";


function OrderListScreen(props) {
    const [logoutCall] = useLogoutMutation();
    const {data, isLoading, error} = useGetOrdersQuery();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const {data: tokenStatus, isLoading: tokenLoading} = useCheckToken(userInfo)
    const navigater = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        await logoutCall()
        dispatch(logout());
        navigater('/login');
    }

    useEffect(() => {
        if(tokenStatus?.status !== undefined){
            console.log('useEffect', tokenStatus?.status)
            !tokenStatus?.status && logoutHandler()
        }
    }, [tokenLoading]);

    return (
        <>
            {isLoading ? <Loader/> :
                error ? <div>{error.error || 'Something went wrong'}</div>
                    : (
                        <AdminRoute>
                            <div>Hello Admin</div>
                        </AdminRoute>
                    )}

        </>
    )
}

export default OrderListScreen;