import React, {FC, ReactElement} from "react";
import {Flex, Stack} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";

import CustomAlert from "../../alert/CustomAlert";
import TextField from "../../form/TextField";
import TextareaField from "../../form/TextareaField";
import DoubleSaveButton from "../../form/DoubleSaveButton";
import useBrandCreateFormHook from "./useBrandCreateFormHook";
import {
    BrandCreateFormHookType,
    CreateBrandFormType,
    createBrandInitialStaticValues,
    createBrandSchema
} from "./brandCreateFormData";

const BrandCreateForm: FC<BrandCreateFormProps> = ({modal = false, handleFinish, handleAdd}): ReactElement => {
    const {
        createBrandAlertData,
        handleCreateBrand,
        handleCreateBrandAndContinue,
        sequence,
        isCreateBrandPending
    }: BrandCreateFormHookType = useBrandCreateFormHook({modal, handleFinish, handleAdd});

    return (
        <Stack key={sequence}>
            <CustomAlert data={createBrandAlertData} />
            <Formik initialValues={createBrandInitialStaticValues} validationSchema={createBrandSchema} onSubmit={handleCreateBrand}>
                {(props: FormikProps<CreateBrandFormType>) => (
                    <Form>
                        <Flex>
                            <TextField label="Nom" name="name" formikProps={props} />
                            <TextField label="Slug" name="slug" formikProps={props} />
                        </Flex>
                        <Flex>
                            <TextField label="Site web" name="website" formikProps={props} />
                            <TextField label="Titre SEO" name="seoTitle" formikProps={props} />
                        </Flex>
                        <Flex>
                            <TextareaField label="Description SEO" name="seoDescription" formikProps={props} />
                            <TextareaField label="Description" name="description" formikProps={props} />
                        </Flex>
                        <Stack>
                            <DoubleSaveButton
                                isLoading={isCreateBrandPending}
                                formikProps={props}
                                handleSaveAndContinue={() => handleCreateBrandAndContinue(props.values)}
                            />
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

interface BrandCreateFormProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export default BrandCreateForm;