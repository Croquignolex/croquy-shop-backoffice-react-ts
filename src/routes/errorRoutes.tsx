import { ErrorRouteType } from "../types/otherTypes";
import { lazy, LazyExoticComponent, ReactElement } from "react";

const LazyNotFoundPage: LazyExoticComponent<() => ReactElement> = lazy(() => import('../pages/NotFoundPage'));

const notFound: ErrorRouteType = {
    name: 'notFound',
    title: 'Page introuvable',
    component: LazyNotFoundPage,
    path: '*',
};

export const errorRoutes: any = {
    notFound
};
