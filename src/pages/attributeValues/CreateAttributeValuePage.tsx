import React, {ReactElement} from "react";
import {Box, Container, Stack} from "@chakra-ui/react";

import AttributeValueCreateForm from "../../components/createForm/attributeValue/AttributeValueCreateForm";
import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";

const CreateAttributeValuePage = (): ReactElement => {
    return (
        <>
            <PageHeader title={"Nouvelle valeur d'attribut"} items={[{path: mainRoutes.attributeValues.path, label: "'Valeurs d'attributs'"}]} />
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                    <AttributeValueCreateForm />
                </Stack>
            </Container>
        </>
    );
};

export default CreateAttributeValuePage;