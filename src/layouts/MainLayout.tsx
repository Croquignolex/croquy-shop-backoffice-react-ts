import React, { FC, ReactElement, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import lodash from "lodash";
import { Box, Container, Drawer, DrawerContent, Heading, useDisclosure, Stack } from "@chakra-ui/react";

import SidebarContent from "../components/menu/SidebarContent";
import MobileNav from "../components/menu/MobileNav";
import PageBreadcrumb from "../components/menu/PageBreadcrumb";
import Footer from "../components/Footer";
import { mainRoutes, MainRouteType } from "../routes/mainRoutes";
import { MenuItemType } from "../helpers/globalTypesHelper";

const MainLayout: FC = (): ReactElement => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { pathname: currentPath } = useLocation();

    const headerMenuItems: Array<MenuItemType> = useMemo((): Array<any> => (
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

    const sidebarMenuItems: Array<MenuItemType> = useMemo((): Array<any> => (
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

    const currentRoute: any = useMemo((): MainRouteType => lodash.toArray(mainRoutes).find((route: MainRouteType): boolean => currentPath === route.path), [currentPath]);

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
                    <PageBreadcrumb pageTitle={currentRoute.title} items={currentRoute.breadcrumb} />
                    <Heading as='h1' pt={2} pb={4} fontSize={"xl"}> {currentRoute.title}</Heading>
                    <Outlet />
                </Container>
            </Stack>
            <Footer />
        </Box>
    );
};

export default MainLayout;