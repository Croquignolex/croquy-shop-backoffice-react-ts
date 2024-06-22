import React, {FC, ReactElement} from "react";
import {Box} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import DoubleSaveButton from "../../../components/form/DoubleSaveButton";
import useBrandAddHook, {
    BrandAddHookType,
    AddBrandFormType,
    addBrandInitialStaticValues,
    addBrandSchema
} from "../hooks/useBrandAddHook";

const BrandAddForm: FC<BrandAddFormProps> = ({added, finished}): ReactElement => {
    const {t} = useTranslation();
    const {
        addBrandAlertData,
        handleAddBrand,
        handleAddBrandAndContinue,
        sequence,
        isAddBrandPending
    }: BrandAddHookType = useBrandAddHook({added, finished});

    return (
        <Box key={sequence}>

            <CustomAlert data={addBrandAlertData} />

            <Formik initialValues={addBrandInitialStaticValues} validationSchema={addBrandSchema} onSubmit={handleAddBrand}>
                {(props: FormikProps<AddBrandFormType>) => (
                    <Form>
                        <TextField label={t("name")} name="name" formikProps={props} />

                        <TextField label={t("slug")} name="slug" formikProps={props} />

                        <TextField label={t("website")} name="website" formikProps={props} />

                        <TextField label={t("seo_title")} name="seoTitle" formikProps={props} />

                        <TextareaField label={t("seo_description")} name="seoDescription" formikProps={props} />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <DoubleSaveButton
                            isLoading={isAddBrandPending}
                            formikProps={props}
                            handleSaveAndContinue={() => handleAddBrandAndContinue(props.values)}
                        />
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

interface BrandAddFormProps {
    finished: () => void;
    added: () => void;
}

export default BrandAddForm;