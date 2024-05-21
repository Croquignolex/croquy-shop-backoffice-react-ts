import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Stack, Container, Button, ButtonGroup, Flex} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import useEditBrandHook from "./useEditBrandHook";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import PageHeader from "../../../components/menu/PageHeader";
import {EditBrandFormType, EditBrandHookType, editBrandSchema} from "./editBrandData";
import NotFoundPage from "../../NotFoundPage";

const EditBrandPage = (): ReactElement => {
    const {
        editBrandAlertData,
        handleEditBrand,
        brandResponseData,
        isBrandPending,
        brandAlertData,
        formBrand,
        pageHeaderItems,
        isEditBrandPending
    }: EditBrandHookType = useEditBrandHook();

    return (
        <>
            <PageHeader
                title={`Modifier marque ${brandResponseData.name}`}
                items={pageHeaderItems}
            />
            <Container maxW={'3xl'}>
                <CustomAlert data={brandAlertData} />
                <CustomAlert data={editBrandAlertData} />
                {brandAlertData.show ? <NotFoundPage /> : (
                    <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                        <Formik initialValues={formBrand} validationSchema={editBrandSchema} onSubmit={handleEditBrand} enableReinitialize>
                            {(props: FormikProps<EditBrandFormType>) => (
                                <Form>
                                    <Flex>
                                        <TextField label="Nom" name="name" isLoading={isBrandPending} formikProps={props} />
                                        <TextField label="Slug" name="slug" isLoading={isBrandPending} formikProps={props} />
                                    </Flex>
                                    <Flex>
                                        <TextField label="Site web" name="website" isLoading={isBrandPending} formikProps={props} />
                                        <TextField label="Titre SEO" name="seoTitle" isLoading={isBrandPending} formikProps={props} />
                                    </Flex>
                                    <Flex>
                                        <TextareaField label="Description SEO" name="seoDescription" isLoading={isBrandPending} formikProps={props} />
                                        <TextareaField label="Description" name="description" isLoading={isBrandPending} formikProps={props} />
                                    </Flex>
                                    <ButtonGroup>
                                        <Button
                                            colorScheme={"green"}
                                            isLoading={isEditBrandPending}
                                            isDisabled={isBrandPending}
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

export default EditBrandPage;