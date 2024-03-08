import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";

import { log } from "../helpers/generalHelpers";

const HomePage = (): ReactElement => {
    log("HomePage component");

    return (
        <>
            <Box minH="100vh">
                HomePage
            </Box>
        </>
    );
};

export default HomePage;