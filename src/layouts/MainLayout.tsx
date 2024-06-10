import React, {FC, ReactElement, useContext} from "react";
import {FiX, FiMenu, FiUser, FiLogOut} from "react-icons/fi";
import {Link, NavigateFunction, NavLink, Outlet, useNavigate} from "react-router-dom";
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
    MenuItem, Heading, Image,
} from "@chakra-ui/react";

import Footer from "../components/Footer";
import {appInfo} from "../constants/envConstants";
import {headerMenu, MainRouteType, sideMenu} from "../routes/mainRoutes";
import {USER_GLOBAL_STATE_CLEAR_DATA, UserContext} from "../contexts/UserContext";
import {removeAllLocaleStorageItems} from "../helpers/localStorageHelpers";
import {authRoutes} from "../routes/authRoutes";
import {ImageSizeEnumType, MenuItemType} from "../helpers/globalTypesHelper";
import {roleEnumConverter} from "../helpers/enumsHelpers";
import LocaleSwitcher from "../components/LocaleSwitcher";
import ImageDisplay from "../components/ImageDisplay";
import noImage from "../assets/img/no-image.jpg";
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
    const { globalUserState } = useContext(UserContext);

    return (
        <Box
            w="full"
            h="8vh"
            px={4}
            borderBottomWidth="1px"
            position="fixed"
            top={0}
            zIndex={2}
            bg="white"
        >
            <Flex h="full" alignItems={"center"} justifyContent={"space-between"}>
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
                    {/*<SideMenu />*/}
                    {/*<SideMenu />*/}
                    <ProfileMenu />
                </HStack>
            </Flex>
            <MobileMenu />
        </Box>
    );
};

const ProfileMenu = (): ReactElement => {
    const {globalUserState, setGlobalUserState} = useContext(UserContext);
    const navigate: NavigateFunction = useNavigate();

    const handleLogout = (): void => {
        removeAllLocaleStorageItems();
        setGlobalUserState({ type: USER_GLOBAL_STATE_CLEAR_DATA });
        navigate(authRoutes.login.path);
    };

    return (
        <Menu>
            <MenuButton>
                <Avatar bg="purple.500" src={API_MEDIA_V1_URL + globalUserState.avatar?.path} />
            </MenuButton>
            <MenuList shadow="default" rounded="lg">
                <MenuItem>
                    <Flex px={4} py={2} alignItems={"center"}>
                        <Avatar size="sm" bg="purple.500" src={API_MEDIA_V1_URL + globalUserState.avatar?.path} />
                        <Box ml={4}>
                            <Text fontSize="md">{globalUserState.firstName}</Text>
                            <Text fontSize="sm" color="gray.400">{roleEnumConverter(globalUserState.role).label}</Text>
                        </Box>
                    </Flex>
                </MenuItem>



                {sideMenu.map((route: MenuItemType, index: number): ReactElement => (
                    <Box as={NavLink} to={route.path} key={index}>
                        {(props: any) => (
                            <MenuItem
                                key={index}
                                bg={props?.isActive ? "purple.500" : ""}
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
                    <Icon mr="2" as={FiLogOut} />
                    Déconnexion
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

const HeaderOld: FC = (): ReactElement => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const { globalUserState } = useContext(UserContext);

    return (
        <Box
            w="full"
            h="10vh"
            px={4}
            borderBottomWidth="1px"
            position="fixed"
            top={0}
            zIndex={2}
            bg="purple.500"
        >
            <Flex h="full" alignItems={"center"} justifyContent={"space-between"}>
                <IconButton
                    colorScheme="purple"
                    display={{ base: "flex", md: "none"}}
                    onClick={isOpen ? onClose : onOpen}
                    aria-label="open menu"
                    icon={isOpen ? <FiX /> : <FiMenu />}
                />
                <HStack spacing={8} alignItems={"center"}>
                    <Box>
                        <Text fontSize="2xl" fontWeight="bold" color="white">
                            {appInfo.name}
                        </Text>
                    </Box>
                    <HeaderMenu />
                </HStack>
                <HStack alignItems={"center"}>
                    <Box textAlign="right">
                        <Text fontSize="1rem" color="white">{globalUserState.firstName}</Text>
                        <Text fontSize="0.8rem" color="white">{roleEnumConverter(globalUserState.role).label}</Text>
                    </Box>
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
                    bg={props.isActive ? "purple.600" : ""}
                >
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