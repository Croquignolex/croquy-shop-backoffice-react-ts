import React, {ReactElement} from "react";
import {Box, Container, Stack} from "@chakra-ui/react";

import BrandCreateForm from "../../components/createForm/brand/BrandCreateForm";
import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";

const CreateBrandPage = (): ReactElement => {
    return (
        <>
            <PageHeader title={"Nouvelle marque"} items={[{path: mainRoutes.brands.path, label: 'Marques'}]} />
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                    <BrandCreateForm />
                </Stack>
            </Container>
        </>
    );
};

export default CreateBrandPage;