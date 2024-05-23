import React, {ReactElement} from "react";
import {Box, Container, Stack} from "@chakra-ui/react";

import CategoryCreateForm from "../../components/createForm/category/CategoryCreateForm";
import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";

const CreateCategoryPage = (): ReactElement => {
    return (
        <>
            <PageHeader title={"Nouvelle catégorie"} items={[{path: mainRoutes.categories.path, label: 'Catégories'}]} />
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                    <CategoryCreateForm />
                </Stack>
            </Container>
        </>
    );
};

export default CreateCategoryPage;