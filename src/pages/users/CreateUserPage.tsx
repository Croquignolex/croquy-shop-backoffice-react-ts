import React, {ReactElement} from "react";
import {Box, Container, Stack} from "@chakra-ui/react";

import UserCreateForm from "../../components/createForm/user/UserCreateForm";
import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";

const CreateUserPage = (): ReactElement => {
    return (
        <>
            <PageHeader title={"Nouvel utilisateur"} items={[{path: mainRoutes.users.path, label: 'Utilisateurs'}]} />
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                    <UserCreateForm />
                </Stack>
            </Container>
        </>
    );
};

export default CreateUserPage;