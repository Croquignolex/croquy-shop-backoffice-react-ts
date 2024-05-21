import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Stack, Container, Button, ButtonGroup} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import useEditVendorHook from "./useEditVendorHook";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import PageHeader from "../../../components/menu/PageHeader";
import {EditVendorFormType, EditVendorHookType, editVendorSchema} from "./editVendorData";
import NotFoundPage from "../../NotFoundPage";

const EditVendorPage = (): ReactElement => {
    const {
        editVendorAlertData,
        handleEditVendor,
        vendorResponseData,
        isVendorPending,
        vendorAlertData,
        formVendor,
        pageHeaderItems,
        isEditVendorPending
    }: EditVendorHookType = useEditVendorHook();

    return (
        <>
            <PageHeader
                title={`Modifier fournisseur ${vendorResponseData.name}`}
                items={pageHeaderItems}
            />
            <Container maxW={'3xl'}>
                <CustomAlert data={vendorAlertData} />
                <CustomAlert data={editVendorAlertData} />
                {vendorAlertData.show ? <NotFoundPage /> : (
                    <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                        <Formik initialValues={formVendor} validationSchema={editVendorSchema} onSubmit={handleEditVendor} enableReinitialize>
                            {(props: FormikProps<EditVendorFormType>) => (
                                <Form>
                                    <TextField label="Nom" name="name" isLoading={isVendorPending} formikProps={props} />
                                    <TextareaField label="Description" name="description" isLoading={isVendorPending} formikProps={props} />
                                    <ButtonGroup>
                                        <Button
                                            colorScheme={"green"}
                                            isLoading={isEditVendorPending}
                                            isDisabled={isVendorPending}
                                            type='submit'
                                            fontWeight="none"
                                            leftIcon={<FiCheck />}
                                        >
                                            Confirmer
                                        </Button>
                                    </ButtonGroup>
                                </Form>
                            )}
                        </Formik>
                    </Stack>
                )}
            </Container>
        </>
    );
};

export default EditVendorPage;