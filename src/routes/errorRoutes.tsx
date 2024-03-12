import { lazy, LazyExoticComponent, ReactElement } from "react";

const LazyNotFoundPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/NotFoundPage'));

const notFound: ErrorRouteType = {
    name: 'notFound',
    title: 'Page introuvable',
    component: LazyNotFoundPage,
    path: '*',
};

interface ErrorRouteType {
    name: string,
    title: string,
    component: LazyExoticComponent<() => ReactElement>,
    path: string,
}

export const errorRoutes: any = {
    notFound
};