import React, {FC, ReactElement} from "react";
import {Stack} from "@chakra-ui/react";
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
                        <TextField label="Nom" name="name" formikProps={props} />
                        <TextareaField label="Description" name="description" formikProps={props} />
                        <Stack>
                            <DoubleSaveButton
                                isLoading={isCreateCountryStatePending}
                                formikProps={props}
                                handleSaveAndContinue={() => handleCreateCountryStateAndContinue(props.values)}
                            />
                        </Stack>
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