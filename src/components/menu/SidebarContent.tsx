import React, { FC, ReactElement } from 'react';
import { Box, Flex, Text, CloseButton, BoxProps } from "@chakra-ui/react";

import NavItem from "./NavItem";
import { MenuItemType } from "../../types/otherTypes";
import { appInfo } from "../../constants/envConstants";
import { log } from "../../helpers/generalHelpers";

const SidebarContent: FC<SidebarContentProps> = ({ onClose, menuItems, ...rest }): ReactElement => {
    log("PageBreadcrumb component", {onClose, menuItems, rest});

    return (
        <Box transition="3s ease" w={{ base: 'full', md: 60 }} pos="fixed" h="full"{...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="xl" fontWeight="bold" align='center'>
                    {appInfo.name}
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {menuItems.map((route: MenuItemType): ReactElement => (
                <NavItem key={route.name} path={route.path} icon={route.icon} isActive={true}>
                    {route.title}
                </NavItem>
            ))}
        </Box>
    );
};

interface SidebarContentProps extends BoxProps {
    onClose: () => void,
    menuItems: MenuItemType[],
}

export default SidebarContent;