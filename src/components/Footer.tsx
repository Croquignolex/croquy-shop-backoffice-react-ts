import React, { FC, ReactElement } from "react";
import { Box, Container, Text } from "@chakra-ui/react";

import { appInfo } from "../constants/envConstants";
import { log } from "../helpers/generalHelpers";

const Footer: FC = (): ReactElement => {
    log("Footer component");

    return (
        <Box bg={'gray.100'} position='absolute' bottom={0} left={0} right={0}>
            <Container maxW={'6xl'} py={4}>
                <Text align='center'>© 2024 {appInfo.name}. All rights reserved</Text>
            </Container>
        </Box>
    );
};

export default Footer;