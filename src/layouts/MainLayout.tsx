import React, { FC, ReactElement, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import lodash from "lodash";
import { Box, Container, Drawer, DrawerContent, Heading, useDisclosure, Stack } from "@chakra-ui/react";

import { log } from "../helpers/generalHelpers";
import { BreadcrumbItemsType, MenuItemType, MainRouteType } from "../types/otherTypes";
import SidebarContent from "../components/menu/SidebarContent";
import MobileNav from "../components/menu/MobileNav";
import PageBreadcrumb from "../components/menu/PageBreadcrumb";
import Footer from "../components/Footer";
import { mainRoutes } from "../routes/mainRoutes";

const MainLayout: FC = (): ReactElement => {
    log("MainLayout component");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { pathname: currentPath } = useLocation();

    const headerMenuItems: MenuItemType[] = useMemo((): any[] => (
        lodash.toArray(mainRoutes)
            .filter((route: MainRouteType): boolean => route.onHeader)
            .map((route: MainRouteType): MenuItemType => ({
                path: route.path,
                name: route.name,
                key: route.name,
                icon: route.icon,
                title: route.title,
                isActive: currentPath === route.path
            }))
    ), [currentPath]);

    const sidebarMenuItems: MenuItemType[] = useMemo((): any[] => (
        lodash.toArray(mainRoutes)
            .filter((route: MainRouteType): boolean => route.onSidebar)
            .map((route: MainRouteType): MenuItemType => ({
                path: route.path,
                name: route.name,
                key: route.name,
                icon: route.icon,
                title: route.title,
                isActive: currentPath === route.path
            }))
    ), [currentPath]);

    const {pageTitle, breadcrumbItems}: any = useMemo((): any => {
        const currentRoute: MainRouteType = lodash.toArray(mainRoutes).find((route: MainRouteType): boolean => currentPath === route.path);

        const breadcrumbItems: BreadcrumbItemsType[] = currentRoute.breadcrumb.map((item: any) => ({
            path: item?.path,
            label: item?.label,
            key: item?.label
        }));

        return {pageTitle: currentRoute.title, breadcrumbItems}
    }, [currentPath]);

    return (
        <Box minH="100vh">
            <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} menuItems={sidebarMenuItems} />
            <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} menuItems={sidebarMenuItems} />
                </DrawerContent>
            </Drawer>
            <Container maxW='9xl' pos="fixed">
                <MobileNav onOpen={onOpen} menuItems={headerMenuItems} />
            </Container>
            <Stack ml={{ base: 0, md: 60 }} pb={75}>
                <Container maxW='7xl' mt={70}>
                    <PageBreadcrumb pageTitle={pageTitle} items={breadcrumbItems} />
                    <Heading as='h1' pt={2} pb={4}>{pageTitle}</Heading>
                    <Outlet />
                </Container>
            </Stack>
            {/*<Box h={100} />*/}
            <Footer />
        </Box>
    );
};

export default MainLayout;