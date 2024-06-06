import React, {FC, ReactElement, useContext} from "react";
import {FaTimes, FaBars, FaUserAlt, FaSignOutAlt} from "react-icons/fa";
import {NavigateFunction, NavLink, Outlet, useNavigate} from "react-router-dom";
import {
    Box,
    Flex,
    HStack,
    IconButton,
    useDisclosure,
    Text,
    Icon,
    Menu,
    MenuButton,
    Avatar,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";

import Footer from "../components/Footer";
import {appInfo} from "../constants/envConstants";
import {headerMenu, MainRouteType, sideMenu} from "../routes/mainRoutes";
import {USER_GLOBAL_STATE_CLEAR_DATA, UserContext} from "../contexts/UserContext";
import {removeAllLocaleStorageItems} from "../helpers/localStorageHelpers";
import {authRoutes} from "../routes/authRoutes";
import {MenuItemType} from "../helpers/globalTypesHelper";
import EnumBadge from "../components/EnumBadge";

const MainLayout: FC = (): ReactElement => {
    return (
        <Box bg="gray.50">
            <Header />

            <Box mt="10vh" mb="7vh" zIndex={1}>
                <Outlet />
            </Box>

            <Footer />
        </Box>
    );
};

const Header: FC = (): ReactElement => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const { globalUserState } = useContext(UserContext);

    return (
        <Box
            w="full"
            h="10vh"
            px={4}
            borderBottomWidth={1}
            position="fixed"
            top={0}
            zIndex={2}
            bg="green.500"
        >
            <Flex h="full" alignItems={"center"} justifyContent={"space-between"}>
                <IconButton
                    colorScheme="green"
                    display={{ base: "flex", md: "none"}}
                    onClick={isOpen ? onClose : onOpen}
                    aria-label="open menu"
                    icon={isOpen ? <FaTimes /> : <FaBars />}
                />
                <HStack spacing={8} alignItems={"center"}>
                    <Box>
                        <Text fontSize="xl" fontWeight="bold" color="white">
                            {appInfo.name}
                        </Text>
                    </Box>
                    <HeaderMenu />
                </HStack>
                <HStack alignItems={"center"}>
                    <Box>
                        <Text fontSize="1rem" color="white" fontWeight="bold">{globalUserState.firstName}</Text>
                        <EnumBadge data={globalUserState.role} role />
                    </Box>
                    <SideMenu />
                </HStack>
            </Flex>
            <MobileMenu />
        </Box>
    );
};

const MobileMenu: FC = (): ReactElement => {
    return (
        <div>
            {/*{isOpen ? (
                    <Box pb={4} display={{ md: "none" }}>
                        <Stack as={"nav"} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}*/}
        </div>
    );
};

const SideMenu = (): ReactElement => {
    const {setGlobalUserState} = useContext(UserContext);
    const navigate: NavigateFunction = useNavigate();

    const handleLogout = (): void => {
        removeAllLocaleStorageItems();
        setGlobalUserState({ type: USER_GLOBAL_STATE_CLEAR_DATA });
        navigate(authRoutes.login.path);
    };

    return (
        <Menu closeOnSelect={false}>
            <MenuButton transition="all 0.3s">
                <Avatar bg="gray.50" icon={<FaUserAlt fontSize="1.5rem" color="gray" />} />
            </MenuButton>
            <MenuList borderWidth="1px" borderRadius="xl" boxShadow="2xl">
                {sideMenu.map((route: MenuItemType, index: number): ReactElement => (
                    <Box as={NavLink} to={route.path} key={index}>
                        {(props: any) => (
                            <MenuItem
                                key={index}
                                bg={props?.isActive ? "green.500" : ""}
                                _hover={{ fontWeight: props?.isActive ? "" : "bold" }}
                                color={props?.isActive ? "white" : ""}
                            >
                                <Icon mr="2" as={route.icon} />
                                {route.title}
                            </MenuItem>
                        )}
                    </Box>
                ))}
                <MenuItem color="red" onClick={handleLogout} _hover={{fontWeight: "bold"}}>
                    <Icon mr="2" as={FaSignOutAlt} />
                    Déconnexion
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

const HeaderMenu = () => {
    return (
        <HStack as="nav" spacing={4} display={{base: "none", md: "flex"}}>
            {headerMenu.map((menu: MainRouteType | {subMenuLabel: string, subMenuItems: Array<MainRouteType>}, index: number): ReactElement => {
                return ("path" in menu)
                    ? <CustomNavItem menu={menu} key={index} />
                    : <CustomSubMenu menu={menu} key={index} />;
            })}
        </HStack>
    );
};

const CustomNavItem = ({key, menu}: {key: number, menu: MainRouteType}) => {
    return (
        <Box as={NavLink} to={menu.path} key={key}>
            {(props: any) => (
                <Text
                    color="white"
                    rounded="xl"
                    px={2}
                    py={1}
                    alignItems="center"
                    _hover={{fontWeight: props.isActive ? "" : "bold"}}
                    bg={props.isActive ? "green.600" : ""}
                >
                    <Icon mr={1} as={menu.icon} />
                    {menu.title}
                </Text>
            )}
        </Box>
    );
};

const CustomSubMenu = ({key, menu}: {key: number, menu: {subMenuLabel: string, subMenuItems: Array<MainRouteType>}}) => {
    return (
        <div>submenu</div>
    );
};

export default MainLayout;