import { useContext } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png'
import AuthContext from '../../store/auth-context';

export const MainHeader = () => {
    const authCtx = useContext(AuthContext);

    const userIsLoggedIn = authCtx.userIsLoggedIn;

    const logoutHandler = () => {
        authCtx.logout()
    }

    return <Container>
        <Row>
            <Col>
                <img src={Logo} alt='logo'></img>
            </Col>
            <Col className='justify-content-center'>
                <Link to='/onas'>
                    <Button className='mx-1' variant="outline-secondary">O nas</Button>
                </Link>
                <Link to='/kontakt'>
                    <Button className='mx-1' variant="outline-secondary">Kontakt</Button>
                </Link>
                { !userIsLoggedIn && <Link to='/logowanie'>
                        <Button className='mx-1' variant="outline-secondary">Zaloguj</Button>    
                </Link> } 
                { userIsLoggedIn && <Link to='/'>
                    <Button className='mx-1' variant="outline-secondary" onClick={logoutHandler}>Zaloguj</Button>    
                </Link> }
            </Col>
        </Row>
    </Container>
}
