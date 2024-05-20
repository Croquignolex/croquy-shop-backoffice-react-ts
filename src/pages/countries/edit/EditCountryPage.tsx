import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Stack, Container, Flex, Button} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import useEditCountryHook from "./useEditCountryHook";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import PageHeader from "../../../components/menu/PageHeader";
import {EditCountryFormType, EditCountryHookType, editCountrySchema} from "./editCountryData";
import NotFoundPage from "../../NotFoundPage";

const EditCountryPage = (): ReactElement => {
    const {
        editCountryAlertData,
        handleEditCountry,
        countryResponseData,
        isCountryPending,
        countryAlertData,
        formCountry,
        pageHeaderItems,
        isEditCountryPending
    }: EditCountryHookType = useEditCountryHook();

    return (
        <>
            <PageHeader
                title={`Modifier pays ${countryResponseData.name}`}
                items={pageHeaderItems}
            />
            <Container maxW={'3xl'}>
                <CustomAlert data={countryAlertData} />
                <CustomAlert data={editCountryAlertData} />
                {countryAlertData.show ? <NotFoundPage /> : (
                    <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                        <Formik initialValues={formCountry} validationSchema={editCountrySchema} onSubmit={handleEditCountry} enableReinitialize>
                            {(props: FormikProps<EditCountryFormType>) => (
                                <Form>
                                    <Flex>
                                        <TextField label="Nom" name="name" isLoading={isCountryPending} formikProps={props} />
                                        <TextField label="Indice téléphonique" name="phoneCode" isLoading={isCountryPending} formikProps={props} />
                                    </Flex>
                                    <TextareaField label="Description" name="description" isLoading={isCountryPending} formikProps={props} />
                                    <Stack>
                                        <Button
                                            colorScheme={"green"}
                                            isLoading={isEditCountryPending}
                                            isDisabled={isCountryPending}
                                            type='submit'
                                            fontWeight="none"
                                            leftIcon={<FiCheck />}
                                        >
                                            Confirmer
                                        </Button>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </Stack>
                )}
            </Container>
        </>
    );
};

export default EditCountryPage;