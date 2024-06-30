import React, {FC, ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Button, ButtonGroup} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import {VendorType} from "../show/showVendorData";
import useVendorEditHook, {
    VendorEditFormType,
    VendorEditHookType,
    vendorEditSchema
} from "../hooks/useVendorEditHook";

const VendorEditForm: FC<VendorEditFormProps> = ({selectedVendor, finished}): ReactElement => {
    const {t} = useTranslation();

    const {
        editVendorAlertData,
        handleEditVendor,
        formVendor,
        isEditVendorPending
    }: VendorEditHookType = useVendorEditHook({selectedVendor, finished});

    return (
        <Box>

            <CustomAlert data={editVendorAlertData} />

            <Formik initialValues={formVendor} validationSchema={vendorEditSchema} onSubmit={handleEditVendor} enableReinitialize>
                {(props: FormikProps<VendorEditFormType>) => (
                    <Form>
                        <TextField label={t("name")} name="name" formikProps={props} />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <ButtonGroup>
                            <Button
                                isLoading={isEditVendorPending}
                                type='submit'
                                leftIcon={<FiCheck />}
                            >
                                {t("update")}
                            </Button>
                        </ButtonGroup>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

interface VendorEditFormProps {
    selectedVendor: VendorType;
    finished: () => void;
}

export default VendorEditForm;