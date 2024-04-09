import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {Box, Stack, Container, Flex, Button} from "@chakra-ui/react";

import DisplayAlert from "../../../components/DisplayAlert";
import useEditShopHook from "./useEditShopHook";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import PageHeader from "../../../components/menu/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";
import {EditShopFormType, EditShopHookType, editShopSchema} from "./editShopData";
import {FiCheck} from "react-icons/fi";

const AddShopPage = (): ReactElement => {
    const {editShopAlertData, handleEditShop, shop, isEditShopPending}: EditShopHookType = useEditShopHook();

    return (
        <>
            <PageHeader
                title={`Modifier boutique ${shop.name}`}
                items={[
                    {path: mainRoutes.shops.path, label: 'Boutiques'},
                    {path: `${mainRoutes.shops.path}/${shop.id}`, label: `Detail boutique ${shop.name}`, state: shop}
                ]}
            />
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} borderWidth='1px' borderRadius='3xl'>
                    <DisplayAlert data={editShopAlertData} />
                    <Formik initialValues={shop} validationSchema={editShopSchema} onSubmit={handleEditShop} enableReinitialize>
                        {(props: FormikProps<EditShopFormType>) => (
                            <Form>
                                <Flex>
                                    <TextField
                                        label="Nom"
                                        name="name"
                                        isInvalid={!!props.errors.name && !!props.touched.name}
                                        errorMessage={props.errors.name}
                                    />
                                    <Box mx={3} />
                                    <TextField
                                        label="Slug"
                                        name="slug"
                                        isInvalid={!!props.errors.slug && !!props.touched.slug}
                                        errorMessage={props.errors.slug}
                                    />
                                </Flex>
                                <Flex>
                                    <TextareaField
                                        label="Description"
                                        name="description"
                                        isInvalid={!!props.errors.description && !!props.touched.description}
                                        errorMessage={props.errors.description}
                                    />
                                </Flex>
                                <Flex>
                                    <Button
                                        colorScheme={"orange"}
                                        variant={"solid"}
                                        isLoading={isEditShopPending}
                                        type='submit'
                                        size='md'
                                        fontWeight="none"
                                        leftIcon={<FiCheck />}
                                    >
                                        Confirmer
                                    </Button>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </Stack>
            </Container>
        </>
    );
};

export default AddShopPage;