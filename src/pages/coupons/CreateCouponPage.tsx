import React, {ReactElement} from "react";
import {Box, Container, Stack} from "@chakra-ui/react";

import CountryCreateForm from "../../components/createForm/country/CountryCreateForm";
import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";

const CreateCouponPage = (): ReactElement => {
    return (
        <>
            <PageHeader title={"Nouveau pays"} items={[{path: mainRoutes.countries.path, label: 'Pays'}]} />
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                    <CountryCreateForm />
                </Stack>
            </Container>
        </>
    );
};

export default CreateCouponPage;