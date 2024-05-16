import React, {ReactElement} from "react";
import {Box, Container, Stack} from "@chakra-ui/react";

import ShopCreateForm from "../../components/createForm/shop/ShopCreateForm";
import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";

const CreateShopPage = (): ReactElement => {
    return (
        <>
            <PageHeader title={"Nouvelle boutique"} items={[{path: mainRoutes.shops.path, label: 'Boutiques'}]} />
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                    <ShopCreateForm />
                </Stack>
            </Container>
        </>
    );
};

export default CreateShopPage;