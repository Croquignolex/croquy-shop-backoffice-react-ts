import React, {FC, ReactElement} from "react";
import {Box, Center} from "@chakra-ui/react";

import {appInfo} from "../constants/envConstants";

const Footer: FC<FooterProps> = ({fixed = false}): ReactElement => {
    if(fixed) {
        return (
            <Box w="full" h="7vh" bg="gray.200" position="fixed" bottom={0} borderTopWidth={2}>
                <Center h="full">© 2024 {appInfo.name}. All rights reserved.</Center>
            </Box>
        );
    }

    return (
        <Box w="full" h="7vh" bg="gray.200" borderTopWidth={2}>
            <Center h="full">© 2024 {appInfo.name}. All rights reserved.</Center>
        </Box>
    );
};

interface FooterProps {
    fixed?: boolean,
}

export default Footer;