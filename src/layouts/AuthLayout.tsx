import React, {FC, ReactElement} from "react";
import {Outlet} from "react-router-dom";
import {Box, Center, Flex, Text} from "@chakra-ui/react";

import Footer from "../components/Footer";
import {appInfo} from "../constants/envConstants";

const AuthLayout: FC = (): ReactElement => {
    return (
        <Box bg="white">
            <Box borderBottomWidth={1}>
                <Center h="10vh">
                    <Text fontSize="2xl" fontWeight="bold">
                        {appInfo.name}
                    </Text>
                </Center>
            </Box>
            <Flex align="center" justify="center" minH="80vh">
                <Outlet />
            </Flex>
            <Footer />
        </Box>
    );
};

export default AuthLayout;