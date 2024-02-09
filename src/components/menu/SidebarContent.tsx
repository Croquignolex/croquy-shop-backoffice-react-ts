import React, { FC, ReactElement } from 'react';
import { Box, Flex, Text, CloseButton, BoxProps, Button, Stack } from "@chakra-ui/react";
// import { Link } from "react-router-dom";

import NavItem from "./NavItem";
import { SidebarMenuItemType } from "../../types/otherTypes";
import { appInfo } from "../../constants/envConstants";
// import { routes } from "../../constants/routeConstants";

const SidebarContent: FC<SidebarContentProps> = ({ onClose, menuItems, ...rest }): ReactElement => {
    return (
        <Box
            transition="3s ease"
            bg={'white'}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between" my={5}>
                <Text fontSize="4xl" fontWeight="bold" align='center'>
                    {appInfo.name}
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            <Stack direction={'column'} align={'center'} alignSelf={'center'} position={'relative'} my={4}>
                {/*<Button colorScheme='blue' as={Link} to={routes.addTransfer.path} rounded='full' variant='outline'>
                    Envoyer de l'argent
                </Button>*/}
            </Stack>
            {menuItems.map((route: SidebarMenuItemType): ReactElement => (
                <NavItem key={route.name} path={route.path} icon={route.icon} isActive={route.isActive}>
                    {route.title}
                </NavItem>
            ))}
        </Box>
    );
};

interface SidebarContentProps extends BoxProps {
    onClose: () => void,
    menuItems: SidebarMenuItemType[],
}

export default SidebarContent;