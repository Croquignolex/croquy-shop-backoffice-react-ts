import React, {FC, ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Button, ButtonGroup} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import {ShopType} from "../show/showShopData";
import useShopEditHook, {
    ShopEditFormType,
    ShopEditHookType,
    shopEditSchema
} from "../hooks/useShopEditHook";

const ShopEditForm: FC<ShopEditFormProps> = ({selectedShop, finished}): ReactElement => {
    const {t} = useTranslation();

    const {
        editShopAlertData,
        handleEditShop,
        formShop,
        isEditShopPending
    }: ShopEditHookType = useShopEditHook({selectedShop, finished});

    return (
        <Box>

            <CustomAlert data={editShopAlertData} />

            <Formik initialValues={formShop} validationSchema={shopEditSchema} onSubmit={handleEditShop} enableReinitialize>
                {(props: FormikProps<ShopEditFormType>) => (
                    <Form>
                        <TextField label={t("name")} name="name" formikProps={props} />

                        <TextField label={t("slug")} name="slug" formikProps={props} />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <ButtonGroup>
                            <Button
                                isLoading={isEditShopPending}
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

interface ShopEditFormProps {
    selectedShop: ShopType;
    finished: () => void;
}

export default ShopEditForm;