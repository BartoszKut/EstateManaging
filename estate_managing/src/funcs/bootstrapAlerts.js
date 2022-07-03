import { Alert } from "react-bootstrap"

export const renderAlert = (text, type) => {
    return <Alert 
        variant={type}
        className='text-center'>
            {text}
    </Alert>
}