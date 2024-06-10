import React, { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import {Box, Flex} from "@chakra-ui/react";

import Footer from "../components/Footer";

const ErrorLayout: FC = (): ReactElement => {
    return (
        <Box>
            <Flex align="center" justify="center" minH="100vh">
                <Outlet />
            </Flex>

            <Footer fixed />
        </Box>
    );
};

export default ErrorLayout;