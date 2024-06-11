import React, {ReactElement} from "react";
import {Box, Container, Stack} from "@chakra-ui/react";

import AttributeCreateForm from "../../components/createForm/attribute/AttributeCreateForm";
import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/PageHeader";

const CreateAttributePage = (): ReactElement => {
    return (
        <>
            {/*<PageHeader title={"Nouvel attribut"} items={[{path: mainRoutes.attributes.path, label: 'Attributs'}]} />*/}
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                    <AttributeCreateForm />
                </Stack>
            </Container>
        </>
    );
};

export default CreateAttributePage;