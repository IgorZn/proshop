import { Alert} from "react-bootstrap";

const Message = ({variant, children}) => {

    return (
        <Alert variant={variant}>
            {/* eslint-disable-next-line react/prop-types */}
            {children?.error ? children.error : children}
        </Alert>
    )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message