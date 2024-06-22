import React, {FC, ReactElement, useContext} from "react";
import {FiLogOut, FiChevronDown, FiX, FiMenu} from "react-icons/fi";
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
    IconButton,
    DrawerCloseButton,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Stack,
    Accordion,
    AccordionItem,
    AccordionIcon,
    AccordionPanel,
    AccordionButton,
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
        <Box>
            <Header />

            <Box mt={{base: "8vh", md: "15vh"}} zIndex={1} w="full" px={6}>
                <Outlet />
            </Box>

            <Footer />
        </Box>
    );
};

const Header: FC = (): ReactElement => {
    return (
        <Box w="full" position="fixed" top={0} zIndex={2} bg="white">
            <Flex h="8vh" alignItems={"center"} justifyContent={"space-between"} borderBottomWidth={1} px={6}>
                <MobileMenu />

                <Heading as={Link} to="/" fontSize="2xl" display={{base: "none", md: "flex"}}>
                    {appInfo.name}
                </Heading>

                <HStack alignItems={"center"}>
                    <LocaleSwitcher />
                    <SideMenu />
                </HStack>
            </Flex>

            <HStack as="nav" display={{base: "none", md: "flex"}} h="7vh" px={6} spacing={1} shadow="default">
                <HeaderMenu />
            </HStack>
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

                <MenuDivider borderColor={"gray.300"} />

                <SubMenuItem items={sideMenu} />

                <MenuDivider borderColor={"gray.300"} />

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
            {headerMenu.map((menu: MainRouteType | {subMenuLabel: string, subMenuIcon: any, subMenuItems: Array<MainRouteType>}, index: number): ReactElement => {
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
                    <Menu key={index}>
                        <MenuButton
                            as={Button}
                            rightIcon={<FiChevronDown />}
                            border={0}
                            color={hasActiveRoute(menu.subMenuItems) ? "purple.500" : "gray.600"}
                            _hover={{bg: hasActiveRoute(menu.subMenuItems) ? "purple.100" : "gray.100", color: "purple.500"}}
                            _active={{color: "purple.500", bg: "purple.100"}}
                            bg={hasActiveRoute(menu.subMenuItems) ? "purple.100" : ""}
                        >
                            <Flex alignItems={"center"}>
                                <Icon mr="2" as={menu.subMenuIcon} fontSize={"lg"} />
                                {t(menu.subMenuLabel)}
                            </Flex>
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
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {t} = useTranslation();
    const {pathname} = useLocation();

    const hasActiveRoute = (routes: Array<MainRouteType>) => {
        return routes.find((route: MainRouteType): boolean => route.path === pathname);
    }

    return (
        <Box display={{base: "flex", md: "none"}}>
            <IconButton
                colorScheme="purple"
                onClick={isOpen ? onClose : onOpen}
                aria-label="open menu"
                icon={isOpen ? <FiX /> : <FiMenu />}
                border={0}
                variant={"outline"}
                bg={"purple.100"}
                color={"purple.500"}
            />
            <Drawer isOpen={isOpen} onClose={onClose} placement={"left"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton bg={"purple.100"} color={"purple.500"} />

                    <DrawerHeader>
                        <Heading as={Link} to="/" fontSize="2xl">
                            {appInfo.name}
                        </Heading>
                    </DrawerHeader>

                    <DrawerBody as={Stack} spacing={2}>
                        <Accordion allowToggle>
                            {headerMenu.map((menu: MainRouteType | {subMenuLabel: string, subMenuIcon: any, subMenuItems: Array<MainRouteType>}, index: number): ReactElement => {
                                if("path" in menu) {
                                    return (
                                        <AccordionItem border={0} key={index}>
                                            <NavLink to={menu.path}>
                                                {(props: any) => (
                                                    <h2>
                                                        <AccordionButton
                                                            _hover={{bg: props?.isActive ? "purple.100" : "gray.100", color: "purple.500"}}
                                                            color={props?.isActive ? "purple.500" : ""}
                                                            bg={props?.isActive ? "purple.100" : ""}
                                                            rounded={"md"}
                                                        >
                                                        <Flex alignItems={"center"}>
                                                            <Icon mr="2" as={menu.icon} fontSize={"lg"} />
                                                            {t(menu.title || "")}
                                                        </Flex>
                                                        </AccordionButton>
                                                    </h2>
                                                )}
                                            </NavLink>
                                        </AccordionItem>
                                    );
                                }

                                return (
                                    <AccordionItem border={0} key={index}>
                                        <h2>
                                            <AccordionButton
                                                color={hasActiveRoute(menu.subMenuItems) ? "purple.500" : "gray.600"}
                                                _hover={{bg: hasActiveRoute(menu.subMenuItems) ? "purple.100" : "gray.100", color: "purple.500"}}
                                                bg={hasActiveRoute(menu.subMenuItems) ? "purple.100" : ""}
                                                _expanded={{color: "purple.500", bg: "purple.100"}}
                                                rounded={"md"}
                                                as={HStack}
                                                justifyContent={"space-between"}
                                            >
                                                <Flex alignItems={"center"}>
                                                    <Icon mr="2" as={menu.subMenuIcon} fontSize={"lg"} />
                                                    {t(menu.subMenuLabel)}
                                                </Flex>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel as={Stack} spacing={2}>
                                            {menu.subMenuItems.map((route: MainRouteType, index: number): ReactElement => (
                                                <NavLink to={route.path} key={index}>
                                                    {(props: any) => (
                                                        <Box
                                                            _hover={{color: "purple.500"}}
                                                            py={0}
                                                            bg={"none"}
                                                            color={props?.isActive ? "purple.500" : ""}
                                                        >
                                                            <Flex px={4} py={2} alignItems={"center"} w={"full"}>
                                                                <Icon mr="2" as={route.icon} fontSize={"lg"} />
                                                                {t(route.title || "")}
                                                            </Flex>
                                                        </Box>
                                                    )}
                                                </NavLink>
                                            ))}
                                        </AccordionPanel>
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
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