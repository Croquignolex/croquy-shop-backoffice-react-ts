import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";

import { log } from "../../helpers/generalHelpers";

const DashboardPage = (): ReactElement => {
    log("DashboardPage component");

    return (
        <>
            <Box minH="100vh">
                DashboardPage
            </Box>
        </>
    );
};

export default DashboardPage;