import React, {FC, ReactElement} from "react";
import {Link} from "react-router-dom";
import {Box, Flex, Stack, Text} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";

import {mainRoutes} from "../../../routes/mainRoutes";
import CustomAlert from "../../alert/CustomAlert";
import TextField from "../../form/TextField";
import TextareaField from "../../form/TextareaField";
import DoubleSaveButton from "../../form/DoubleSaveButton";
import useStateCreateFormHook from "./useStateCreateFormHook";
import SelectField from "../../form/SelectField";
import useCountriesSelectListHook, {CountriesSelectListHookType} from "../../../hooks/useCountriesSelectListHook";
import {
    StateCreateFormHookType,
    CreateStateFormType,
    createStateInitialStaticValues,
    createStateSchema
} from "./StateCreateFormData";

const StateCreateForm: FC<StateCreateFormProps> = ({modal = false, handleFinish}): ReactElement => {
    const {selectListCountries, isSelectListCountriesPending}: CountriesSelectListHookType = useCountriesSelectListHook();
    const {
        createStateAlertData,
        handleCreateState,
        handleCreateStateAndContinue,
        sequence,
        isCreateStatePending
    }: StateCreateFormHookType = useStateCreateFormHook({modal, handleFinish});

    return (
        <Stack key={sequence}>
            <CustomAlert data={createStateAlertData} />
            <Formik initialValues={createStateInitialStaticValues} validationSchema={createStateSchema} onSubmit={handleCreateState}>
                {(props: FormikProps<CreateStateFormType>) => (
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
                                isLoading={isCreateStatePending}
                                formikProps={props}
                                handleSaveAndContinue={() => handleCreateStateAndContinue(props.values)}
                            />
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

interface StateCreateFormProps {
    modal?: boolean;
    handleFinish?: () => void;
}

export default StateCreateForm;