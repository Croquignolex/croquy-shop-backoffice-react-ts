import React, {ReactElement} from "react";
import {Box, Container, Stack} from "@chakra-ui/react";

import GroupCreateForm from "../../components/createForm/group/GroupCreateForm";
import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";

const CreateGroupPage = (): ReactElement => {
    return (
        <>
            <PageHeader title={"Nouveau groupe"} items={[{path: mainRoutes.groups.path, label: 'Groupes'}]} />
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                    <GroupCreateForm />
                </Stack>
            </Container>
        </>
    );
};

export default CreateGroupPage;