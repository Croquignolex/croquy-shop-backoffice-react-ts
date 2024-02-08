import React, {FC, ReactElement} from "react";
import {Outlet} from "react-router-dom";
import {Box} from "@chakra-ui/react";

const AuthLayout: FC = (): ReactElement => {
    return (
        <Box minH="100vh">
            CustomerAuthLayout
            <Outlet />
        </Box>
    );
};

export default AuthLayout;