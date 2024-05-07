import React, {FC, ReactElement} from "react";
import {Flex, Stack} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";

import CustomAlert from "../../../alert/CustomAlert";
import TextField from "../../../form/TextField";
import TextareaField from "../../../form/TextareaField";
import DoubleSaveButton from "../../../form/DoubleSaveButton";
import useCountryStateCreateFormHook from "./useCountryStateCreateFormHook";
import {
    CountryStateCreateFormHookType,
    CreateCountryStateFormType,
    createCountryStateInitialStaticValues,
    createCountryStateSchema
} from "./CountryStateCreateFormData";

const CountryStateCreateForm: FC<CountryStateCreateFormProps> = ({countryId, handleFinish, handleAdd}): ReactElement => {
    const {
        createCountryStateAlertData,
        handleCreateCountryState,
        handleCreateCountryStateAndContinue,
        sequence,
        isCreateCountryStatePending
    }: CountryStateCreateFormHookType = useCountryStateCreateFormHook({countryId, handleFinish, handleAdd});

    return (
        <Stack key={sequence}>
            <CustomAlert data={createCountryStateAlertData} />
            <Formik initialValues={createCountryStateInitialStaticValues} validationSchema={createCountryStateSchema} onSubmit={handleCreateCountryState}>
                {(props: FormikProps<CreateCountryStateFormType>) => (
                    <Form>
                        <Flex>
                            <TextField
                                label="Nom"
                                name="name"
                                isInvalid={!!props.errors.name && !!props.touched.name}
                                errorMessage={props.errors.name}
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
                                isLoading={isCreateCountryStatePending}
                                formikProps={props}
                                handleSaveAndContinue={() => handleCreateCountryStateAndContinue(props.values)}
                            />
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

interface CountryStateCreateFormProps {
    countryId: string;
    handleFinish: () => void;
    handleAdd: () => void;
}

export default CountryStateCreateForm;