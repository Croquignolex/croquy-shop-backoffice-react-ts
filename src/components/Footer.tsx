import React, {FC, ReactElement} from "react";
import {Box, Center} from "@chakra-ui/react";

import {appInfo} from "../constants/envConstants";

const Footer: FC = (): ReactElement => {
    return (
        <Box bg="gray.200" position="fixed" bottom={0} left={0} right={0} borderTopWidth={1}>
            <Center h="7vh">© 2024 {appInfo.name}. All rights reserved.</Center>
        </Box>
    );
};

export default Footer;