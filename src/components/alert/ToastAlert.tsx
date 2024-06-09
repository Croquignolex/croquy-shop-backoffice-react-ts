import React, {FC, ReactElement} from "react";
import {FiBell, FiX} from "react-icons/fi";
import {Box, Icon, UseToastOptions, Text, Flex, CloseButton} from "@chakra-ui/react";
import {AlertStatusEnumType} from "../../helpers/globalTypesHelper";

const ToastAlert: FC<UseToastOptions> = ({description, status}): ReactElement => {
    let color: string = "";

    switch (status) {
        case AlertStatusEnumType.INFO: color = "purple.500"; break;
        case AlertStatusEnumType.SUCCESS: color = "green.500"; break;
        case AlertStatusEnumType.ERROR: color = "red.500"; break;
        case AlertStatusEnumType.WARNING: color = "yellow.600"; break;
    }

    return (
        <Box p={4} rounded="lg" shadow="default" bg="white">
            <Icon as={FiX} position="absolute" top={4} right={5} />
            <Flex alignItems={"center"}>
                <Icon mr="2" as={FiBell} color={color} />
                <Text fontSize={"sm"} alignItems="center">
                    {description}
                </Text>
            </Flex>
        </Box>
    );
};

export default ToastAlert;