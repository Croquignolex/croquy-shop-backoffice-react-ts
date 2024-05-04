import React, {FC, ReactElement} from "react";
import {Box, Container, Flex, Stack} from "@chakra-ui/react";

import {mainRoutes} from "../../../routes/mainRoutes";
import CustomAlert from "../../alert/CustomAlert";
import PageHeader from "../../menu/PageHeader";
import {Form, Formik, FormikProps} from "formik";
import TextField from "../../form/TextField";
import TextareaField from "../../form/TextareaField";
import DoubleSaveButton from "../../form/DoubleSaveButton";
import useCountryCreateFormHook from "./useCountryCreateFormHook";
import {
    CountryCreateFormHookType, CreateCountryFormType,
    createCountryInitialStaticValues, createCountrySchema
} from "./CountryCreateFormData";

const CountryCreateForm: FC<CountryCreateFormProps> = ({modal = false, handleFinish}): ReactElement => {
    const {
        createCountryAlertData, handleCreateCountry, handleCreateCountryAndContinue, sequence, isCreateCountryPending
    }: CountryCreateFormHookType = useCountryCreateFormHook({modal, handleFinish});

    return (
        <>
            <PageHeader title={"Nouveau pays"} items={[{path: mainRoutes.countries.path, label: 'Pays'}]} />
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"} key={sequence}>
                    <CustomAlert data={createCountryAlertData} />
                    <Formik initialValues={createCountryInitialStaticValues} validationSchema={createCountrySchema} onSubmit={handleCreateCountry}>
                        {(props: FormikProps<CreateCountryFormType>) => (
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
                                    <DoubleSaveButton
                                        isLoading={isCreateCountryPending}
                                        formikProps={props}
                                        handleSaveAndContinue={() => handleCreateCountryAndContinue(props.values)}
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

interface CountryCreateFormProps {
    modal?: boolean;
    handleFinish?: () => void;
}

export default CountryCreateForm;