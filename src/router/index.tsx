import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout';
import MainPage from '../pages/mainPage';
import OrganizationsPage from '../pages/organizationsPage';

const Router = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<Navigate to='/main' />} />

                <Route path='/main' element={<MainPage />} />
                <Route path='/organizations' element={<OrganizationsPage />} />
            </Route>
        </Routes>
    );
};

export default Router;
