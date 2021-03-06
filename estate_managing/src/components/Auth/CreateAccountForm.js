import { Form, Button } from 'react-bootstrap';
import { MainWrapper } from '../MainWrapper';
import { useRef, useState } from 'react';
import axios from 'axios';
import { validateEmail, validatePassword } from '../../helpers/inputValidation';
import { renderAlert } from '../../helpers/bootstrapAlerts';
import { ACCOUNT_CREATED, ACCOUNT_CREATE_FAILED, EMAIL_FAILED, PASSWORD_FAILED } from '../../constants/global';
import { useNavigate } from 'react-router';

export const CreateAccountForm = () => {
    const [isEmailValidated, setIsEmailValidate] = useState(true);
    const [isPasswordValidated, setIsPasswordValidate] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [creatingFailed, setCreatingFailed] = useState(false);

    const navigate = useNavigate();

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const passwordRepeatInputRef = useRef();
    
    const registryHandler = (event) => {
        setIsLoading(true);
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredPasswordRepeat = passwordRepeatInputRef.current.value;

        if (!validateEmail(enteredEmail)) {
            setIsEmailValidate(false);
            setIsLoading(false);
            return;
        }

        if (enteredPassword !== enteredPasswordRepeat || !validatePassword(enteredPassword)) {
            setIsPasswordValidate(false);
            setIsLoading(false);
            return;
        }

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxHp6YwD1AVTMF940zkkkWeSc3GkSnD8E', {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: false,
        }).then(response => {
            if (response.status === 200) {
                navigate('/logowanie', {state: {text: ACCOUNT_CREATED, type: 'success'}})
            }
            console.log(response);
        }).catch(() => {
            setCreatingFailed(true);
        });

        setIsLoading(false);
    }

    return <>
        <MainWrapper>
            { !isEmailValidated && renderAlert(EMAIL_FAILED, 'danger') }
            { !isPasswordValidated && renderAlert(PASSWORD_FAILED, 'danger') }
            { creatingFailed && renderAlert(ACCOUNT_CREATE_FAILED, 'danger') }
            <Form className='mt-5 mb-5' onSubmit={registryHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Adres email</Form.Label>
                    <Form.Control ref={emailInputRef} type="email" placeholder="Wprowad?? adres email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Has??o</Form.Label>
                    <Form.Control ref={passwordInputRef} type="password" placeholder="Has??o" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                    <Form.Label>Powt??rz Has??o</Form.Label>
                    <Form.Control ref={passwordRepeatInputRef} type="password" placeholder="Powt??rz has??o" />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                    Zarejestruj si??
                </Button>
                <p className='mt-5'>Posiadasz konto? <a href='/logowanie'>Zaloguj si??</a>!</p>
            </Form>
        </MainWrapper>
    </> 
}
