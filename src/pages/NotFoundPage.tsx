import React, {ReactElement} from "react";
import {Button, Heading, Stack, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {FiHome} from "react-icons/fi";

const NotFoundPage = (): ReactElement => {
    return (
        <Stack w={"full"} alignItems="center">
            <Heading fontSize={"9xl"} color="purple.500">
                404
            </Heading>
            <Text fontSize="18px" mx={5} fontWeight="bold">
                Page introuvable
            </Text>
            <Text mb={6}>
                La page que vous cherchez semble ne pas exister
            </Text>
            <Button colorScheme="purple" as={Link} to="/" rounded="md" leftIcon={<FiHome />} size="lg">
                Retour à l"accueil
            </Button>
        </Stack>
    );
};

export default NotFoundPage;