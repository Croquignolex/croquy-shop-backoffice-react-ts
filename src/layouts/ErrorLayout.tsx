import React, { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import {Box} from "@chakra-ui/react";

const ErrorLayout: FC = (): ReactElement => {
    return (
        <>
            <Box minH="100vh">
                ErrorLayout
                <Outlet />
            </Box>
        </>
    );
};

export default ErrorLayout;