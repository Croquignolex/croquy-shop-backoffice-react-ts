import React, { FC, ReactElement, useContext } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { FiLogOut, FiChevronDown, FiMenu, FiSettings, FiHelpCircle, FiUser } from "react-icons/fi";
import {
    Box, Flex, FlexProps, IconButton, Text, HStack,
    Menu, MenuButton, Avatar, VStack, MenuList, MenuItem, Icon,
} from "@chakra-ui/react";

import { USER_GLOBAL_STATE_CLEAR_DATA, UserContext } from "../../contexts/UserContext";
import { authRoutes } from "../../routes/authRoutes";
import { HeaderMenuItemType } from "../../types/otherTypes";
import { removeLocaleStorageItem } from "../../helpers/localStorageHelpers";
import { log } from "../../helpers/generalHelpers";

const MobileNav: FC<MobileNavProps> = ({ onOpen, menuItems, ...rest }) => {
    const { globalUserState, setGlobalUserState } = useContext(UserContext);
    const navigate: NavigateFunction = useNavigate();

    const handleLogout = (): void => {
        log("Handle logout event");

        removeLocaleStorageItem('user');

        setGlobalUserState({ type: USER_GLOBAL_STATE_CLEAR_DATA });

        navigate(authRoutes.login.path);
    };

    log("MobileNav component", {onOpen, menuItems, rest});

    return (
        <Flex
            height="20"
            alignItems="center"
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none'}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <HStack spacing={{ base: '0', md: '6' }}>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}
                            _hover={{ color: 'blue.500' }}
                            _expanded={{ color: 'blue.500' }}
                        >
                            <HStack>
                                <Avatar bg='gray.200' icon={<FiUser fontSize='1.5rem' color='black'/>} />
                                <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start">
                                    <Text fontSize="sm">{globalUserState.firstName}</Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList>
                            {menuItems.map((route: HeaderMenuItemType): ReactElement => (
                                <MenuItem
                                    as={Link}
                                    to={route.path}
                                    key={route.name}
                                    background={route.background}
                                    color={route.color}
                                    _hover={{ bg: 'gray.100', color: 'black' }}
                                >
                                    <Icon mr="2" as={route.icon} />
                                    {route.title}
                                </MenuItem>
                            ))}
                            <MenuItem icon={<FiSettings />}>
                                Paramètres
                            </MenuItem>
                            <MenuItem icon={<FiHelpCircle />}>
                                Centre d'aide
                            </MenuItem>
                            <MenuItem color={'red.500'} icon={<FiLogOut />} onClick={handleLogout}>
                                Déconnexion
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};

interface MobileNavProps extends FlexProps {
    onOpen: () => void,
    menuItems: HeaderMenuItemType[],
}

export default MobileNav;