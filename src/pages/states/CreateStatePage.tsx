import React, {ReactElement} from "react";
import {Box, Container, Stack} from "@chakra-ui/react";

import StateCreateForm from "../../components/createForm/state/StateCreateForm";
import PageHeader from "../../components/PageHeader";
import {mainRoutes} from "../../routes/mainRoutes";

const CreateStatePage = (): ReactElement => {
    return (
        <>
            {/*<PageHeader title={"Nouvelle ville"} items={[{path: mainRoutes.states.path, label: 'Villes'}]} />*/}
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                    <StateCreateForm />
                </Stack>
            </Container>
        </>
    );
};

export default CreateStatePage;