import React, {FC, ReactElement} from "react";
import {Box} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import DoubleSaveButton from "../../../components/form/DoubleSaveButton";
import useShopAddHook, {
    ShopAddHookType,
    ShopAddFormType,
    addShopSchema, shopAddInitialStaticValues
} from "../hooks/useShopAddHook";

const ShopAddForm: FC<ShopAddFormProps> = ({added, finished}): ReactElement => {
    const {t} = useTranslation();
    const {
        addShopAlertData,
        handleAddShop,
        handleAddShopAndContinue,
        sequence,
        isAddShopPending
    }: ShopAddHookType = useShopAddHook({added, finished});

    return (
        <Box key={sequence}>

            <CustomAlert data={addShopAlertData} />

            <Formik initialValues={shopAddInitialStaticValues} validationSchema={addShopSchema} onSubmit={handleAddShop}>
                {(props: FormikProps<ShopAddFormType>) => (
                    <Form>
                        <TextField label={t("name")} name="name" formikProps={props} />

                        <TextField label={t("slug")} name="slug" formikProps={props} />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <DoubleSaveButton
                            isLoading={isAddShopPending}
                            formikProps={props}
                            handleSaveAndContinue={() => handleAddShopAndContinue(props.values)}
                        />
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

interface ShopAddFormProps {
    finished: () => void;
    added: () => void;
}

export default ShopAddForm;