import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import AuthLayout from 'components/AuthLayout';
import Layout from 'components/Layout';
import { Dashboard } from 'features/dashboard';
import Models from 'features/models';
import Settings from 'features/settings';
import Support from 'features/support';
import Ticket from 'features/ticket';
import Training from 'features/training';
import ForgotPassword from 'pages/forgotPassword/forgotPassword';
import Login from 'pages/login/login';
import Register from 'pages/register/register';

const App = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

const Auth = () => {
    return (
        <AuthLayout>
            <Outlet />
        </AuthLayout>
    );
};

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/training" element={<Training />} />
                    <Route path="/models" element={<Models />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/ticket/:id" element={<Ticket />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Route>
                <Route path="/auth" element={<Auth />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="*" element={<Navigate to="/auth/login" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
