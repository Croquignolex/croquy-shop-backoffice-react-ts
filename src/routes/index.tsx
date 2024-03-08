import React, { FC, ReactElement } from "react";
import { Outlet, Navigate, Route, Routes as ReactRoutes } from "react-router-dom";

import { generateFlattenRoutes, log } from "../helpers/generalHelpers";
import { mainRoutes } from "./mainRoutes";
import MainLayout from "../layouts/MainLayout";
import ErrorLayout from "../layouts/ErrorLayout";
import { errorRoutes } from "./errorRoutes";
import AuthLayout from "../layouts/AuthLayout";
import { authRoutes } from "./authRoutes";

export const routesDefinition = [
    {
        layout: MainLayout,
        routes: [mainRoutes.home]
    },
    {
        layout: AuthLayout,
        isAuthPage: true,
        routes: [authRoutes.login]
    },
    {
        layout: ErrorLayout,
        isErrorPage: true,
        routes: [errorRoutes.notFound]
    },
];

const ProtectedRoute: FC<ProtectedRouteProps> = ({ isAuthorized, isErrorPage, isAuthPage }): ReactElement => {
    log("Route redirection", {isAuthorized, isErrorPage, isAuthPage});

    if(!isErrorPage) {
        if(isAuthorized && isAuthPage) {
            return <Navigate to={mainRoutes.home.path} />;
        }

        if(!isAuthorized && !isAuthPage) {
            return <Navigate to={authRoutes.login.path} />;
        }
    }

    return <Outlet />;
};

const renderRoutes = (mainRoutes: any[]) => {
    const Routes: FC<{ isAuthorized: boolean }> = ({ isAuthorized }) => {
        const layouts: ReactElement[] = mainRoutes.map(({ layout: Layout, routes, isAuthPage, isErrorPage }, index: number) => {
            const subRoutes: any[] = generateFlattenRoutes(routes);

            log("Render correspondent route component", {mainRoutes, isAuthorized, Layout, routes, isAuthPage, isErrorPage, subRoutes});

            return (
                <Route key={index} element={<Layout />}>
                    <Route element={<ProtectedRoute isAuthorized={isAuthorized} isAuthPage={isAuthPage} isErrorPage={isErrorPage} />}>
                        {
                            subRoutes.map(({ component: Component, path, name }) => {
                                return (
                                    Component && path && (
                                        <Route key={name} element={<Component />} path={path} />
                                    )
                                )
                            })
                        }
                    </Route>
                </Route>
            );
        });

        return <ReactRoutes>{layouts}</ReactRoutes>;
    };

    return Routes;
};

interface ProtectedRouteProps {
    isAuthorized: boolean,
    isErrorPage?: boolean,
    isAuthPage?: boolean,
}

export const Routes: FC<{ isAuthorized: boolean }> = renderRoutes(routesDefinition);