import React, { FC, ReactElement } from 'react';
import { Box, Flex, Text, CloseButton, BoxProps } from "@chakra-ui/react";

import NavItem from "./NavItem";
import { appInfo } from "../../constants/envConstants";
import { MenuItemType } from "../../helpers/globalTypesHelper";

const SidebarContent: FC<SidebarContentProps> = ({ onClose, menuItems, ...rest }): ReactElement => {
    return (
        <Box transition="3s ease" w={{ base: 'full', md: 60 }} pos="fixed" h="full"{...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="xl" fontWeight="bold" align='center'>
                    {appInfo.name}
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {menuItems.map((route: MenuItemType, index: number): ReactElement => (
                <NavItem key={index} path={route.path} icon={route.icon}>
                    {route.title}
                </NavItem>
            ))}
        </Box>
    );
};

interface SidebarContentProps extends BoxProps {
    onClose: () => void,
    menuItems: Array<MenuItemType>,
}

export default SidebarContent;