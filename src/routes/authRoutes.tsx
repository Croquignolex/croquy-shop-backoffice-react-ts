import { lazy, LazyExoticComponent, ReactElement } from "react";

const LazyLoginPage: LazyExoticComponent<() => ReactElement> = lazy(() => import("../pages/login/LoginPage"));

const login: AuthRoutType = {
    path: "/",
    title: "login",
    component: LazyLoginPage,
};

interface AuthRoutType {
    title: string,
    component: LazyExoticComponent<() => ReactElement>,
    path: string,
}

export const authRoutes: any = {
    login
};