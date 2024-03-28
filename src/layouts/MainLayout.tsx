import React, { FC, ReactElement, useMemo } from "react";
import { Outlet } from "react-router-dom";
import lodash from "lodash";
import { Box, Container, Drawer, DrawerContent, useDisclosure, Stack } from "@chakra-ui/react";

import SidebarContent from "../components/menu/SidebarContent";
import MobileNav from "../components/menu/MobileNav";
import Footer from "../components/Footer";
import { mainRoutes, MainRouteType } from "../routes/mainRoutes";
import { MenuItemType } from "../helpers/globalTypesHelper";

const MainLayout: FC = (): ReactElement => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const headerMenuItems: Array<MenuItemType> = useMemo((): Array<any> => (
        lodash.toArray(mainRoutes)
            .filter((route: MainRouteType): boolean => route.onHeader)
            .map((route: MainRouteType): MenuItemType => ({
                path: route.path, icon: route.icon, title: route.title,
            }))
    ), []);

    const sidebarMenuItems: Array<MenuItemType> = useMemo((): Array<any> => (
        lodash.toArray(mainRoutes)
            .filter((route: MainRouteType): boolean => route.onSidebar)
            .map((route: MainRouteType): MenuItemType => ({
                path: route.path, icon: route.icon, title: route.title,
            }))
    ), []);

    return (
        <Box minH="100vh">
            <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} menuItems={sidebarMenuItems} zIndex={3} />
            <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} menuItems={sidebarMenuItems} />
                </DrawerContent>
            </Drawer>
            <Container maxW='9xl' pos="fixed" zIndex={2}>
                <MobileNav onOpen={onOpen} menuItems={headerMenuItems} />
            </Container>
            <Stack ml={{ base: 0, md: 60 }} pb={75} zIndex={1}>
                <Container maxW='7xl' mt={70}>
                    <Outlet />
                </Container>
            </Stack>
            <Footer />
        </Box>
    );
};

export default MainLayout;