import React, { FC, ReactElement } from "react";
import lodash from "lodash";
import { Outlet, Navigate, Route, Routes as ReactRoutes } from "react-router-dom";

import { generateFlattenRoutes } from "../helpers/generalHelpers";
import { mainRoutes } from "./mainRoutes";
import MainLayout from "../layouts/MainLayout";
import ErrorLayout from "../layouts/ErrorLayout";
import { errorRoutes } from "./errorRoutes";
import AuthLayout from "../layouts/AuthLayout";
import { authRoutes } from "./authRoutes";

export const routesDefinition = [
    {
        layout: MainLayout,
        routes: mainRoutes
    },
    {
        layout: AuthLayout,
        isAuthPage: true,
        routes: authRoutes
    },
    {
        layout: ErrorLayout,
        isErrorPage: true,
        routes: errorRoutes
    },
];

const ProtectedRoute: FC<ProtectedRouteProps> = ({ isAuthorized, isErrorPage, isAuthPage }): ReactElement => {
    if(!isErrorPage) {
        if(isAuthorized && isAuthPage) {
            return <Navigate to={mainRoutes.dashboard.path} />;
        }

        if(!isAuthorized && !isAuthPage) {
            return <Navigate to={authRoutes.login.path} />;
        }
    }

    return <Outlet />;
};

const renderRoutes = (allRoutes: Array<any>) => {
    const Routes: FC<{ isAuthorized: boolean }> = ({ isAuthorized }) => {
        const layouts: Array<ReactElement> = allRoutes.map(({ layout: Layout, routes, isAuthPage, isErrorPage }, index: number) => {
            const subRoutes: Array<any> = generateFlattenRoutes(lodash.toArray(routes));

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