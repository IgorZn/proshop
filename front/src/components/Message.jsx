import { Alert} from "react-bootstrap";
import {Navigate} from "react-router-dom";
import {toast} from "react-toastify";

const Message = ({variant, children}) => {

    console.log(children)
    return (
        <Alert variant={variant}>
            {/* eslint-disable-next-line react/prop-types */}
            {children?.error ? children.error : children}
            {children?.error && toast.error('Please re-login.')}
        </Alert>
    )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message