import { lazy, LazyExoticComponent, ReactElement } from "react";

const LazyLoginPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/login/LoginPage'));

const login: AuthRoutType = {
    name: 'login',
    title: 'Connexion',
    component: LazyLoginPage,
    path: '/',
};

interface AuthRoutType {
    name: string,
    title: string,
    component: LazyExoticComponent<() => ReactElement>,
    path: string,
}

export const authRoutes: any = {
    login
};