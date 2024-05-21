import React, {ReactElement} from "react";
import {Box, Container, Stack} from "@chakra-ui/react";

import VendorCreateForm from "../../components/createForm/vendor/VendorCreateForm";
import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";

const CreateVendorPage = (): ReactElement => {
    return (
        <>
            <PageHeader title={"Nouveau fournisseur"} items={[{path: mainRoutes.vendors.path, label: 'Fournisseurs'}]} />
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                    <VendorCreateForm />
                </Stack>
            </Container>
        </>
    );
};

export default CreateVendorPage;