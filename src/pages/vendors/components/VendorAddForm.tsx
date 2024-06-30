import React, {FC, ReactElement} from "react";
import {Box} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import DoubleSaveButton from "../../../components/form/DoubleSaveButton";
import useVendorAddHook, {
    VendorAddHookType,
    VendorAddFormType,
    addVendorSchema,
    vendorAddInitialStaticValues
} from "../hooks/useVendorAddHook";

const VendorAddForm: FC<VendorAddFormProps> = ({added, finished}): ReactElement => {
    const {t} = useTranslation();
    const {
        addVendorAlertData,
        handleAddVendor,
        handleAddVendorAndContinue,
        sequence,
        isAddVendorPending
    }: VendorAddHookType = useVendorAddHook({added, finished});

    return (
        <Box key={sequence}>

            <CustomAlert data={addVendorAlertData} />

            <Formik initialValues={vendorAddInitialStaticValues} validationSchema={addVendorSchema} onSubmit={handleAddVendor}>
                {(props: FormikProps<VendorAddFormType>) => (
                    <Form>
                        <TextField label={t("name")} name="name" formikProps={props} />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <DoubleSaveButton
                            isLoading={isAddVendorPending}
                            formikProps={props}
                            handleSaveAndContinue={() => handleAddVendorAndContinue(props.values)}
                        />
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

interface VendorAddFormProps {
    finished: () => void;
    added: () => void;
}

export default VendorAddForm;