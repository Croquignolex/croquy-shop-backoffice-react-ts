import React, { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import {Box, Container, Flex, Stack, Text} from "@chakra-ui/react";

import { log } from "../helpers/generalHelpers";
import {appInfo} from "../constants/envConstants";
import Footer from "../components/Footer";

const ErrorLayout: FC = (): ReactElement => {
    log("ErrorLayout component");

    return (
        <Box minH="100vh">
            <Flex h={20} alignItems="center" borderBottomWidth={1}>
                <Container maxW={'6xl'}>
                    <Flex>
                        <Box>
                            <Text fontSize="xl" fontWeight="bold">
                                {appInfo.name}
                            </Text>
                        </Box>
                    </Flex>
                </Container>
            </Flex>
            <Stack mt={10} pb={75}>
                <Outlet />
            </Stack>
            <Footer />
        </Box>
    );
};

export default ErrorLayout;