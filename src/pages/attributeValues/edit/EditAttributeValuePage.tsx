import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Stack, Container, Button, ButtonGroup, Flex} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import useEditAttributeValueHook from "./useEditAttributeValueHook";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import PageHeader from "../../../components/menu/PageHeader";
import {EditAttributeValueFormType, EditAttributeValueHookType, editAttributeValueSchema} from "./editAttributeValueData";
import NotFoundPage from "../../NotFoundPage";

const EditAttributeValuePage = (): ReactElement => {
    const {
        editAttributeValueAlertData,
        handleEditAttributeValue,
        attributeValueResponseData,
        isAttributeValuePending,
        attributeValueAlertData,
        formAttributeValue,
        pageHeaderItems,
        isEditAttributeValuePending
    }: EditAttributeValueHookType = useEditAttributeValueHook();

    return (
        <>
            <PageHeader
                title={`Modifier marque ${attributeValueResponseData.name}`}
                items={pageHeaderItems}
            />
            <Container maxW={'3xl'}>
                <CustomAlert data={attributeValueAlertData} />
                <CustomAlert data={editAttributeValueAlertData} />
                {attributeValueAlertData.show ? <NotFoundPage /> : (
                    <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                        <Formik initialValues={formAttributeValue} validationSchema={editAttributeValueSchema} onSubmit={handleEditAttributeValue} enableReinitialize>
                            {(props: FormikProps<EditAttributeValueFormType>) => (
                                <Form>
                                    <Flex>
                                        <TextField label="Nom" name="name" isLoading={isAttributeValuePending} formikProps={props} />
                                        <TextField label="Valeur" name="value" isLoading={isAttributeValuePending} formikProps={props} />
                                    </Flex>
                                    <TextareaField label="Description" name="description" isLoading={isAttributeValuePending} formikProps={props} />
                                    <ButtonGroup>
                                        <Button
                                            colorScheme={"green"}
                                            isLoading={isEditAttributeValuePending}
                                            isDisabled={isAttributeValuePending}
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

export default EditAttributeValuePage;