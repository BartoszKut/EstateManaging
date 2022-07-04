import { MainPage } from './components/MainPage';
import { Routes, Route } from 'react-router';
import { AboutUs } from './components/Header/AboutUs';
import { Contact } from './components/Header/Contact';
import { Dashboard } from './components/Dashboard';
import { UserLoginForm } from './components/Auth/UserLoginForm';
import { CreateAccountForm } from './components/Auth/CreateAccountForm';
import './App.css';

function App() {  
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/onas' element={<AboutUs />} />
            <Route path='/kontakt' element={<Contact />} />
            <Route path='/logowanie' element={<UserLoginForm />} />
            <Route path='/rejestracja' element={<CreateAccountForm />} />
            <Route path='/panel_klienta' element={<Dashboard />} />
        </Routes>
    );
}

export default App;
