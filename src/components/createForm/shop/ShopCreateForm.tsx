import React, {FC, ReactElement} from "react";
import {Flex, Stack} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";

import CustomAlert from "../../alert/CustomAlert";
import TextField from "../../form/TextField";
import TextareaField from "../../form/TextareaField";
import DoubleSaveButton from "../../form/DoubleSaveButton";
import useShopCreateFormHook from "./useShopCreateFormHook";
import {
    ShopCreateFormHookType,
    CreateShopFormType,
    createShopInitialStaticValues,
    createShopSchema
} from "./shopCreateFormData";

const ShopCreateForm: FC<ShopCreateFormProps> = ({modal = false, handleFinish, handleAdd}): ReactElement => {
    const {
        createShopAlertData,
        handleCreateShop,
        handleCreateShopAndContinue,
        sequence,
        isCreateShopPending
    }: ShopCreateFormHookType = useShopCreateFormHook({modal, handleFinish, handleAdd});

    return (
        <Stack key={sequence}>
            <CustomAlert data={createShopAlertData} />
            <Formik initialValues={createShopInitialStaticValues} validationSchema={createShopSchema} onSubmit={handleCreateShop}>
                {(props: FormikProps<CreateShopFormType>) => (
                    <Form>
                        <Flex>
                            <TextField label="Nom" name="name" formikProps={props} />
                            <TextField label="Slug" name="slug" formikProps={props} />
                        </Flex>
                        <TextareaField label="Description" name="description" formikProps={props} />
                        <Stack>
                            <DoubleSaveButton
                                isLoading={isCreateShopPending}
                                formikProps={props}
                                handleSaveAndContinue={() => handleCreateShopAndContinue(props.values)}
                            />
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

interface ShopCreateFormProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export default ShopCreateForm;