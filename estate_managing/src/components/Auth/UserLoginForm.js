import { useRef, useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { MainWrapper } from '../MainWrapper';
import axios from 'axios';
import { validateEmail, validatePassword } from '../../helpers/inputValidation';
import { LOGIN_FAILED } from '../../constants/global';
import { renderAlert } from '../../helpers/bootstrapAlerts';
import { useLocation, useNavigate } from 'react-router';
import AuthContext from '../../store/auth-context';

export const UserLoginForm = () => {
    const [isEmailValidated, setIsEmailValidate] = useState(true);
    const [isPasswordValidated, setIsPasswordValidate] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);
    
    const location = useLocation();

    const navigate = useNavigate();

    let loginFailed;
    
    const loginFormSubmitHandler = (event) => {
        setIsLoading(true);
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsEmailValidate(true);
        setIsPasswordValidate(true);

        if (!validateEmail(enteredEmail)) {
            setIsEmailValidate(false);
            setIsLoading(false);

            return;
        }

        if (!validatePassword(enteredPassword)) {
            setIsPasswordValidate(false);
            setIsLoading(false);

            return;
        }

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxHp6YwD1AVTMF940zkkkWeSc3GkSnD8E', {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
        }).then(response => {
            const expirationTime = new Date(new Date().getTime() + +response.data.expiresIn * 1000)

            authCtx.login(response.data.idToken, expirationTime.toISOString())
        
            return navigate('/panel_klienta'); 
        })
        .catch(() => {
            loginFailed = true;
        })
        setIsLoading(false);
    }

    useEffect(() => {
        if (authCtx.userIsLoggedIn) {
            return navigate('/panel_klienta'); 
        }  
    },[navigate, authCtx.userIsLoggedIn]);

    return <MainWrapper>
        { location.state && renderAlert(location.state.text, location.state.type) }
        { (!isEmailValidated || !isPasswordValidated || loginFailed) && renderAlert(LOGIN_FAILED, 'danger') }
        <Form className='mt-5 mb-5' onSubmit={loginFormSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Adres email</Form.Label>
                <Form.Control ref={emailInputRef} type="email" placeholder="Wprowadź adres email" />
                <Form.Text className="text-muted">
                    Nigdy nie udostępnimy Twojego e-maila nikomu innemu.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control ref={passwordInputRef} type="password" placeholder="Hasło" />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
                Zaloguj
            </Button>
            <p className='mt-5'>Nie posiadasz konta? <a href='/rejestracja'>Zarejestruj się</a> już dziś</p>
        </Form>
    </MainWrapper>
}
