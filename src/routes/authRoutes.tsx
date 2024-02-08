import { AuthRoutType } from "../types/otherTypes";
import { lazy, LazyExoticComponent, ReactElement } from "react";

const LazyLoginPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/login/LoginPage'));

const login: AuthRoutType = {
    name: 'login',
    title: 'Connexion',
    component: LazyLoginPage,
    path: '/',
};

export const authRoutes: any = {
    login
};