import React, {FC, ReactElement} from "react";
import {Link, Outlet} from "react-router-dom";
import {Box, Center, Container, Flex, Heading} from "@chakra-ui/react";

import Footer from "../components/Footer";
import {appInfo} from "../constants/envConstants";
import LocaleSwitcher from "../components/LocaleSwitcher";

const AuthLayout: FC = (): ReactElement => {
    return (
        <Box>
            <Flex align="center" justify="center" minH="100vh">
                <Container maxW={"lg"}>
                    <Box p={8} rounded="lg" shadow="default" bg="white">
                        <Flex justifyContent="right">
                            <LocaleSwitcher />
                        </Flex>
                        <Center h="10vh">
                            <Heading as={Link} to="/" fontSize="3xl">
                                {appInfo.name}
                            </Heading>
                        </Center>
                        <Outlet />
                    </Box>
                </Container>
            </Flex>

            <Footer fixed />
        </Box>
    );
};

export default AuthLayout;