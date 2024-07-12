import React, {FC, ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Button, ButtonGroup} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import {BrandType} from "../show/showBrandData";
import useCouponEditHook, {
    BrandEditFormType,
    BrandEditHookType,
    brandEditSchema,
} from "../hooks/useCouponEditHook";

const CouponEditForm: FC<BrandEditFormProps> = ({selectedBrand, finished}): ReactElement => {
    const {t} = useTranslation();

    const {
        editBrandAlertData,
        handleEditBrand,
        formBrand,
        isEditBrandPending
    }: BrandEditHookType = useCouponEditHook({selectedBrand, finished});

    return (
        <Box>

            <CustomAlert data={editBrandAlertData} />

            <Formik initialValues={formBrand} validationSchema={brandEditSchema} onSubmit={handleEditBrand} enableReinitialize>
                {(props: FormikProps<BrandEditFormType>) => (
                    <Form>
                        <TextField label={t("name")} name="name" formikProps={props} />

                        <TextField label={t("slug")} name="slug" formikProps={props} />

                        <TextField label={t("website")} name="website" formikProps={props} />

                        <TextField label={t("seo_title")} name="seoTitle" formikProps={props} />

                        <TextareaField label={t("seo_description")} name="seoDescription" formikProps={props} />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <ButtonGroup>
                            <Button
                                isLoading={isEditBrandPending}
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

interface BrandEditFormProps {
    selectedBrand: BrandType;
    finished: () => void;
}

export default CouponEditForm;