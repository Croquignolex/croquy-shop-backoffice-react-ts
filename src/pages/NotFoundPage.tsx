import React, {ReactElement} from "react";
import {Button, Heading, Stack, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {FiHome} from "react-icons/fi";
import {useTranslation} from "react-i18next";

const NotFoundPage = (): ReactElement => {
    const {t} = useTranslation();

    return (
        <Stack w={"full"} alignItems="center">
            <Heading fontSize={"9xl"} color="purple.500">
                404
            </Heading>
            <Text fontSize="18px" mx={5} fontWeight="bold">
                {t("page_not_found")}
            </Text>
            <Text mb={6}>
                {t("not_found_description")}
            </Text>
            <Button colorScheme="purple" as={Link} to="/" rounded="md" leftIcon={<FiHome />}>
                {t("back_to_home")}
            </Button>
        </Stack>
    );
};

export default NotFoundPage;