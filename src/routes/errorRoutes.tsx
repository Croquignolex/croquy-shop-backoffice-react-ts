import { lazy, LazyExoticComponent, ReactElement } from "react";

const LazyNotFoundPage: LazyExoticComponent<() => ReactElement> = lazy(() => import("../pages/NotFoundPage"));

const notFound: ErrorRouteType = {
    path: "*",
    title: "not_found",
    component: LazyNotFoundPage,
};

interface ErrorRouteType {
    title: string,
    component: LazyExoticComponent<() => ReactElement>,
    path: string,
}

export const errorRoutes: any = {
    notFound
};