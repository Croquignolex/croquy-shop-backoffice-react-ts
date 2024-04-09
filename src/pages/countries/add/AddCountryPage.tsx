import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {Box, Stack, Container, Flex} from "@chakra-ui/react";

import DisplayAlert from "../../../components/DisplayAlert";
import useAddCountryHook from "./useAddCountryHook";
import TextField from "../../../components/form/TextField";
import {AddCountryFormType, AddCountryHookType, addCountryInitialStaticValues, addCountrySchema} from "./addCountryData";
import TextareaField from "../../../components/form/TextareaField";
import DoubleSaveButton from "../../../components/form/DoubleSaveButton";
import PageHeader from "../../../components/menu/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";

const AddCountryPage = (): ReactElement => {
    const {addCountryAlertData, handleAddCountry, handleAddCountryAndContinue, sequence, isAddCountryPending}: AddCountryHookType = useAddCountryHook();

    return (
        <>
            <PageHeader title={"Nouvelle boutique"} items={[{path: mainRoutes.shops.path, label: 'Boutiques'}]} />
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} borderWidth='1px' borderRadius='3xl' key={sequence}>
                    <DisplayAlert data={addCountryAlertData} />
                    <Formik initialValues={addCountryInitialStaticValues} validationSchema={addCountrySchema} onSubmit={handleAddCountry}>
                        {(props: FormikProps<AddCountryFormType>) => (
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
                                        name="phoneCode"
                                        isInvalid={!!props.errors.phoneCode && !!props.touched.phoneCode}
                                        errorMessage={props.errors.phoneCode}
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
                                        isLoading={isAddCountryPending}
                                        formikProps={props}
                                        handleSaveAndContinue={() => handleAddCountryAndContinue(props.values)}
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

export default AddCountryPage;