import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Stack, Container, Flex, Button} from "@chakra-ui/react";

import DisplayAlert from "../../../components/DisplayAlert";
import useEditCountryHook from "./useEditCountryHook";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import PageHeader from "../../../components/menu/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";
import {EditCountryFormType, EditCountryHookType, editCountrySchema} from "./editCountryData";

const AddCountryPage = (): ReactElement => {
    const {editCountryAlertData, handleEditCountry, country, isEditCountryPending}: EditCountryHookType = useEditCountryHook();

    return (
        <>
            <PageHeader
                title={`Modifier pays ${country.name}`}
                items={[
                    {path: mainRoutes.countries.path, label: 'Pays'},
                    {path: `${mainRoutes.countries.path}/${country.id}`, label: `Detail pays ${country.name}`, state: country}
                ]}
            />
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                    <DisplayAlert data={editCountryAlertData} />
                    <Formik initialValues={country} validationSchema={editCountrySchema} onSubmit={handleEditCountry} enableReinitialize>
                        {(props: FormikProps<EditCountryFormType>) => (
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
                                        label="Indice téléphonique"
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
                                    <Button
                                        colorScheme={"green"}
                                        isLoading={isEditCountryPending}
                                        type='submit'
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

export default AddCountryPage;