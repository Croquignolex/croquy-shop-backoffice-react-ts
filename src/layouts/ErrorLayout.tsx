import React, { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import {Box, Center, Flex, Text} from "@chakra-ui/react";

import {appInfo} from "../constants/envConstants";
import Footer from "../components/Footer";

const ErrorLayout: FC = (): ReactElement => {
    return (
        <Box bg="white">
            <Header />

            <Flex align="center" justify="center" minH="80vh">
                <Outlet />
            </Flex>

            <Footer fixed />
        </Box>
    );
};

const Header: FC = (): ReactElement => {
    return (
        <Box w="full" h="10vh" bg="purple.500">
            <Center h="full">
                <Text fontSize="2xl" fontWeight="bold" color="white">
                    {appInfo.name}
                </Text>
            </Center>
        </Box>
    );
};

export default ErrorLayout;