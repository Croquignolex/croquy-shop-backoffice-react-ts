import React, {FC, ReactElement} from "react";
import {Stack} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";

import CustomAlert from "../../alert/CustomAlert";
import TextField from "../../form/TextField";
import TextareaField from "../../form/TextareaField";
import DoubleSaveButton from "../../form/DoubleSaveButton";
import useVendorCreateFormHook from "./useVendorCreateFormHook";
import {
    VendorCreateFormHookType,
    CreateVendorFormType,
    createVendorInitialStaticValues,
    createVendorSchema
} from "./vendorCreateFormData";

const VendorCreateForm: FC<VendorCreateFormProps> = ({modal = false, handleFinish, handleAdd}): ReactElement => {
    const {
        createVendorAlertData,
        handleCreateVendor,
        handleCreateVendorAndContinue,
        sequence,
        isCreateVendorPending
    }: VendorCreateFormHookType = useVendorCreateFormHook({modal, handleFinish, handleAdd});

    return (
        <Stack key={sequence}>
            <CustomAlert data={createVendorAlertData} />
            <Formik initialValues={createVendorInitialStaticValues} validationSchema={createVendorSchema} onSubmit={handleCreateVendor}>
                {(props: FormikProps<CreateVendorFormType>) => (
                    <Form>
                        <TextField label="Nom" name="name" formikProps={props} />
                        <TextareaField label="Description" name="description" formikProps={props} />
                        <Stack>
                            <DoubleSaveButton
                                isLoading={isCreateVendorPending}
                                formikProps={props}
                                handleSaveAndContinue={() => handleCreateVendorAndContinue(props.values)}
                            />
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

interface VendorCreateFormProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export default VendorCreateForm;