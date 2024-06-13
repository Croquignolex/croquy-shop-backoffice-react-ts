import React, {FC, ReactElement} from "react";
import {FiBell, FiX} from "react-icons/fi";
import {Box, Icon, UseToastOptions, Text, Flex, Divider} from "@chakra-ui/react";

import {AlertStatusEnumType} from "../../helpers/globalTypesHelper";

const ToastAlert: FC<RenderProps> = (
    {
        title,
        description,
        status,
        isClosable,
        onClose
    }): ReactElement => {

    let color: string = "";

    switch (status) {
        case AlertStatusEnumType.INFO: color = "purple.500"; break;
        case AlertStatusEnumType.SUCCESS: color = "green.500"; break;
        case AlertStatusEnumType.ERROR: color = "red.500"; break;
        case AlertStatusEnumType.WARNING: color = "yellow.600"; break;
    }

    return (
        <Box rounded="lg" shadow="default" bg={"purple.100"}>
            <Flex alignItems={"center"} justifyContent={"space-between"} px={4} pt={2} pb={1} >
                <Flex alignItems={"center"}>
                    <Icon mr="2" as={FiBell} color={color} />
                    <Text fontSize={"sm"} alignItems="center" color={"purple.500"}>
                        {title}
                    </Text>
                </Flex>
                {(isClosable) &&  (
                    <Icon
                        cursor={"pointer"}
                        as={FiX}
                        fontSize={"sm"}
                        color="gray.500"
                        _hover={{color: "gray.800"}}
                        onClick={() => onClose()}
                    />
                )}
            </Flex>
            <Divider />
            <Text fontSize={"sm"} px={4} py={3} bg={"white"}>
                {description}
            </Text>
        </Box>
    );
};

interface RenderProps extends UseToastOptions {
    onClose(): void;
}

export default ToastAlert;