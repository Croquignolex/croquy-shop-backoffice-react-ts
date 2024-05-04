import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {Link} from "react-router-dom";
import {Box, Stack, Container, Flex, Text} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import useAddStateHook from "./useAddStateHook";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import DoubleSaveButton from "../../../components/form/DoubleSaveButton";
import PageHeader from "../../../components/menu/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";
import SelectField from "../../../components/form/SelectField";
import useCountriesSelectListHook, {CountriesSelectListHookType} from "../../../hooks/useCountriesSelectListHook";
import {AddStateFormType, AddStateHookType, addStateInitialStaticValues, addStateSchema} from "./addStateData";

const AddStatePage = (): ReactElement => {
    const {isAddStatePending, handleAddState, handleAddStateAndContinue, sequence, addStateAlertData}: AddStateHookType = useAddStateHook();
    const {selectListCountries, isSelectListCountriesPending}: CountriesSelectListHookType = useCountriesSelectListHook();

    return (
        <>
            <PageHeader title={"Nouvelle ville"} items={[{path: mainRoutes.states.path, label: 'Villes'}]} />
            <Container maxW={'3xl'}>
                <Stack as={Box} p={4} borderWidth='1px' borderRadius='3xl' key={sequence}>
                    <CustomAlert data={addStateAlertData} />
                    <Formik initialValues={addStateInitialStaticValues} validationSchema={addStateSchema} onSubmit={handleAddState}>
                        {(props: FormikProps<AddStateFormType>) => (
                            <Form>
                                <Box textAlign="right">
                                    <Text fontSize="sm" color="green.500" _hover={{textDecoration: "underline"}}>
                                        <Link to={mainRoutes.countries.path}>Ajouter un pays</Link>
                                    </Text>
                                </Box>
                                <Flex>
                                    <TextField
                                        label="Nom"
                                        name="name"
                                        isInvalid={!!props.errors.name && !!props.touched.name}
                                        errorMessage={props.errors.name}
                                    />
                                    <Box mx={3} />
                                    <SelectField
                                        label="Pays"
                                        name="countryId"
                                        isInvalid={!!props.errors.countryId && !!props.touched.countryId}
                                        errorMessage={props.errors.countryId}
                                        values={selectListCountries}
                                        isLoading={isSelectListCountriesPending}
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
                                        isLoading={isAddStatePending}
                                        formikProps={props}
                                        handleSaveAndContinue={() => handleAddStateAndContinue(props.values)}
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

export default AddStatePage;