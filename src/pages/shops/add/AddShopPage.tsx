import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {Box, Stack, Container, Flex} from "@chakra-ui/react";

import DisplayAlert from "../../../components/DisplayAlert";
import useAddShopHook from "./useAddShopHook";
import TextField from "../../../components/form/TextField";
import {AddShopFormType, AddShopHookType, addShopInitialStaticValues, addShopSchema} from "./addShopData";
import TextareaField from "../../../components/form/TextareaField";
import DoubleSaveButton from "../../../components/form/DoubleSaveButton";
import PageHeader from "../../../components/menu/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";

const AddShopPage = (): ReactElement => {
    const {addShopAlertData, handleAddShop, handleAddShopAndContinue, sequence, isAddShopPending}: AddShopHookType = useAddShopHook();

    return (
        <>
            <PageHeader title={"Nouvelle boutique"} items={[{path: mainRoutes.shops.path, label: 'Boutiques'}]} />
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} borderWidth='1px' borderRadius='3xl' key={sequence}>
                    <DisplayAlert data={addShopAlertData} />
                    <Formik initialValues={addShopInitialStaticValues} validationSchema={addShopSchema} onSubmit={handleAddShop}>
                        {(props: FormikProps<AddShopFormType>) => (
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
                                    <DoubleSaveButton
                                        isLoading={isAddShopPending}
                                        formikProps={props}
                                        handleSaveAndContinue={() => handleAddShopAndContinue(props.values)}
                                    />
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