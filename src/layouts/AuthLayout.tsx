import React, {FC, ReactElement} from "react";
import {Outlet} from "react-router-dom";
import {Box, Center, Container, Flex, Heading} from "@chakra-ui/react";

import Footer from "../components/Footer";
import {appInfo} from "../constants/envConstants";

const AuthLayout: FC = (): ReactElement => {
    return (
        <Box>
            <Flex align="center" justify="center" minH="100vh">
                <Container maxW={"lg"}>
                    <Box p={8} rounded="lg" shadow="default" bg="white">
                        <Center h="10vh">
                            <Heading fontSize="2xl" fontWeight="bold" color="purple.500">
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