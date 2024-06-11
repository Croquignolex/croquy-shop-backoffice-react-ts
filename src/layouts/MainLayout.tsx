import React, {FC, ReactElement, useContext} from "react";
import {FiLogOut, FiChevronDown} from "react-icons/fi";
import {useTranslation} from "react-i18next";
import {Link, NavigateFunction, NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import {
    Box,
    Flex,
    HStack,
    useDisclosure,
    Text,
    Icon,
    Menu,
    MenuButton,
    Avatar,
    MenuList,
    MenuItem,
    Heading,
    MenuDivider,
    Button,
} from "@chakra-ui/react";

import Footer from "../components/Footer";
import {appInfo} from "../constants/envConstants";
import {headerMenu, mainRoutes, MainRouteType, sideMenu} from "../routes/mainRoutes";
import {USER_GLOBAL_STATE_CLEAR_DATA, UserContext} from "../contexts/UserContext";
import {removeAllLocaleStorageItems} from "../helpers/localStorageHelpers";
import {authRoutes} from "../routes/authRoutes";
import {roleEnumConverter} from "../helpers/enumsHelpers";
import LocaleSwitcher from "../components/LocaleSwitcher";
import {API_MEDIA_V1_URL} from "../helpers/apiRequestsHelpers";

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

    return (
        <Box
            w="full"
            borderBottomWidth="1px"
            position="fixed"
            top={0}
            zIndex={2}
            bg="white"
        >
            <Flex h="8vh" alignItems={"center"} justifyContent={"space-between"} borderBottomWidth={1} px={6}>
                {/*<IconButton
                    colorScheme="purple"
                    display={{ base: "flex", md: "none"}}
                    onClick={isOpen ? onClose : onOpen}
                    aria-label="open menu"
                    icon={isOpen ? <FiX /> : <FiMenu />}
                />*/}
                <HStack spacing={8} alignItems={"center"}>
                    <Box>
                        <Heading as={Link} to="/" fontSize="2xl">
                            {appInfo.name}
                        </Heading>
                    </Box>
                </HStack>
                <HStack alignItems={"center"}>
                    <LocaleSwitcher />
                    <SideMenu />
                </HStack>
            </Flex>
            <HStack as="nav" display={{base: "none", md: "flex"}} h="7vh" px={6} spacing={1} shadow="default">
                <HeaderMenu />
            </HStack>
            <MobileMenu />
        </Box>
    );
};

const SideMenu: FC = (): ReactElement => {
    const {globalUserState, setGlobalUserState} = useContext(UserContext);
    const navigate: NavigateFunction = useNavigate();
    const {t} = useTranslation();

    const handleLogout = (): void => {
        removeAllLocaleStorageItems();
        setGlobalUserState({ type: USER_GLOBAL_STATE_CLEAR_DATA });
        navigate(authRoutes.login.path);
    };

    return (
        <Menu>
            <MenuButton>
                <Avatar bg="purple.500" src={API_MEDIA_V1_URL + globalUserState.avatar?.path} w={10} h={10} />
            </MenuButton>
            <MenuList shadow="default" rounded="lg">
                <MenuItem bg={"none"} as={Link} to={mainRoutes.profile.path}>
                    <Flex px={4} py={2} alignItems={"center"} w={"full"} _hover={{bg: "purple.100", rounded: "md", color: "purple.500"}}>
                        <Avatar size="sm" bg="purple.500" src={API_MEDIA_V1_URL + globalUserState.avatar?.path} />
                        <Box ml={3}>
                            <Text fontSize="md" fontWeight={"bold"}>{globalUserState.firstName}</Text>
                            <Text fontSize="sm" color="gray.400">{roleEnumConverter(globalUserState.role).label}</Text>
                        </Box>
                    </Flex>
                </MenuItem>
                <MenuDivider />
                <SubMenuItem items={sideMenu} />
                <MenuDivider />
                <MenuItem color="red" onClick={handleLogout} _hover={{fontWeight: "bold"}} py={0} bg={"none"}>
                    <Flex px={5} py={2} alignItems={"center"} w={"full"} _hover={{bg: "purple.100", rounded: "md"}}>
                        <Icon mr="2" as={FiLogOut} fontSize={"lg"} />
                        {t("logout")}
                    </Flex>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

const HeaderMenu: FC = (): ReactElement => {
    const {t} = useTranslation();
    const {pathname} = useLocation();

    const hasActiveRoute = (routes: Array<MainRouteType>) => {
        return routes.find((route: MainRouteType): boolean => route.path === pathname);
    }

    return (
        <>
            {headerMenu.map((menu: MainRouteType | {subMenuLabel: string, subMenuItems: Array<MainRouteType>}, index: number): ReactElement => {
                if("path" in menu) {
                    return (
                        <NavLink to={menu.path} key={index}>
                            {(props: any) => (
                                <Button
                                    variant={"none"}
                                    _hover={{bg: props?.isActive ? "purple.100" : "gray.100", color: "purple.500"}}
                                    color={props?.isActive ? "purple.500" : ""}
                                    bg={props?.isActive ? "purple.100" : ""}
                                >
                                    <Flex alignItems={"center"}>
                                        <Icon mr="2" as={menu.icon} fontSize={"lg"} />
                                        {t(menu.title || "")}
                                    </Flex>
                                </Button>
                            )}
                        </NavLink>
                    );
                }

                return (
                    <Menu>
                        <MenuButton
                            as={Button}
                            rightIcon={<FiChevronDown />}
                            border={0}
                            color={hasActiveRoute(menu.subMenuItems) ? "purple.500" : "gray.600"}
                            _hover={{bg: hasActiveRoute(menu.subMenuItems) ? "purple.100" : "gray.100", color: "purple.500"}}
                            _active={{color: "purple.500", bg: "purple.100"}}
                            bg={hasActiveRoute(menu.subMenuItems) ? "purple.100" : ""}
                        >
                            {t(menu.subMenuLabel)}
                        </MenuButton>
                        <MenuList shadow="default" rounded="lg">
                            <SubMenuItem items={menu.subMenuItems} />
                        </MenuList>
                    </Menu>
                )
            })}
        </>
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

const SubMenuItem: FC<{items: Array<MainRouteType>}> = ({items}): ReactElement => {
    const {t} = useTranslation();

    return (
        <>
            {items.map((route: MainRouteType, index: number): ReactElement => (
                <NavLink to={route.path} key={index}>
                    {(props: any) => (
                        <MenuItem
                            key={index}
                            _hover={{color: "purple.500"}}
                            py={0}
                            bg={"none"}
                            color={props?.isActive ? "purple.500" : ""}
                        >
                            <Flex px={4} py={2} alignItems={"center"} w={"full"} _hover={{bg: "purple.100", rounded: "md", color: "purple.500"}}>
                                <Icon mr="2" as={route.icon} fontSize={"lg"} />
                                {t(route.title || "")}
                            </Flex>
                        </MenuItem>
                    )}
                </NavLink>
            ))}
        </>
    );
};

export default MainLayout;