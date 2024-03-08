import React, { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { log } from "../helpers/generalHelpers";

const MainLayout: FC = (): ReactElement => {
    log("MainLayout component");

    return (
        <Box minH="100vh">
            CustomerLayout
            <Outlet />
        </Box>
    );
};

export default MainLayout;