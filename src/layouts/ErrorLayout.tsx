import React, { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { log } from "../helpers/generalHelpers";

const ErrorLayout: FC = (): ReactElement => {
    log("ErrorLayout component");

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