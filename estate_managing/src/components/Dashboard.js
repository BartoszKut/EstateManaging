import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { TOKEN_FAILED } from '../constants/global';
import AuthContext from '../store/auth-context';
import { MainWrapper } from './MainWrapper';

export const Dashboard = () => {
    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);
    const userIsLoggedIn = authCtx.isLoggedIn;

    useEffect(() => {
        if (!userIsLoggedIn) {
            return navigate('/logowanie', {state: {text: TOKEN_FAILED, type: 'danger'}}) 
        }  
    }, [userIsLoggedIn, navigate]);
    
    return <MainWrapper>
        Zalogowano
    </MainWrapper>
}
