import React, {FC, ReactElement} from "react";
import {Outlet} from "react-router-dom";
import {Box} from "@chakra-ui/react";

const MainLayout: FC = (): ReactElement => {
    return (
        <Box minH="100vh">
            CustomerLayout
            <Outlet />
        </Box>
    );
};

export default MainLayout;