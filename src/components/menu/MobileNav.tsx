import React, { FC, ReactElement, useContext } from "react";
import { NavigateFunction, useNavigate, NavLink } from "react-router-dom";
import { FiLogOut, FiChevronDown, FiMenu, FiSettings, FiHelpCircle, FiUser } from "react-icons/fi";
import {
    Box, Flex, FlexProps, IconButton, Text, HStack, MenuGroup,
    Menu, MenuButton, Avatar, VStack, MenuList, MenuItem, Icon, MenuDivider,
} from "@chakra-ui/react";

import { USER_GLOBAL_STATE_CLEAR_DATA, UserContext } from "../../contexts/UserContext";
import { authRoutes } from "../../routes/authRoutes";
import { removeLocaleStorageItem } from "../../helpers/localStorageHelpers";
import { log } from "../../helpers/generalHelpers";
import { MenuItemType } from "../../helpers/globalTypesHelper";

const MobileNav: FC<MobileNavProps> = ({ onOpen, menuItems, ...rest }) => {
    const { globalUserState, setGlobalUserState } = useContext(UserContext);
    const navigate: NavigateFunction = useNavigate();

    const handleLogout = (): void => {
        log("Logout successful", globalUserState);

        removeLocaleStorageItem('user');

        setGlobalUserState({ type: USER_GLOBAL_STATE_CLEAR_DATA });

        navigate(authRoutes.login.path);
    };

    return (
        <Flex
            height="60px"
            alignItems="center"
            bg={"white"}
            // borderBottomWidth={1}
            // boxShadow={1}
            boxShadow='md'
            px={5}
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
                            // _focus={{ fontWeight: 'none' }}
                            // _hover={{ fontWeight: 'bold' }}
                            // _expanded={{ fontWeight: 'bold' }}
                        >
                            <Avatar bg='green.500' icon={<FiUser fontSize='1.5rem' color='white' />} />
                        </MenuButton>
                        <MenuList>
                            <MenuGroup title={globalUserState.firstName}>
                            <MenuDivider />
                                {menuItems.map((route: MenuItemType, index: number): ReactElement => (
                                    <Box as={NavLink} to={route.path} key={index}>
                                        {(props: any) => (
                                            <MenuItem
                                                key={index}
                                                background={props?.isActive ? 'orange.500' : ''}
                                                _hover={{ fontWeight: props?.isActive ? '' : 'bold' }}
                                                color={props?.isActive ? 'white' : ''}
                                            >
                                                <Icon mr="2" as={route.icon} />
                                                {route.title}
                                            </MenuItem>
                                        )}
                                    </Box>
                                ))}
                            </MenuGroup>
                            <MenuItem icon={<FiSettings />} _hover={{ fontWeight: 'bold' }}>
                                Paramètres
                            </MenuItem>
                            <MenuItem icon={<FiHelpCircle />} _hover={{ fontWeight: 'bold' }}>
                                Centre d'aide
                            </MenuItem>
                            <MenuItem color={'red'} icon={<FiLogOut />} onClick={handleLogout} _hover={{ fontWeight: 'bold' }}>
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
    menuItems: Array<MenuItemType>,
}

export default MobileNav;