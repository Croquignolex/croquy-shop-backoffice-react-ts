import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Stack, Container, Button, ButtonGroup, Flex} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import useEditAttributeHook from "./useEditAttributeHook";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import PageHeader from "../../../components/PageHeader";
import {EditAttributeFormType, EditAttributeHookType, editAttributeSchema} from "./editAttributeData";
import NotFoundPage from "../../NotFoundPage";
import {staticSelectListAttributeTypes} from "../../../constants/generalConstants";
import SelectField from "../../../components/form/SelectField";

const EditAttributePage = (): ReactElement => {
    const {
        editAttributeAlertData,
        handleEditAttribute,
        attributeResponseData,
        isAttributePending,
        attributeAlertData,
        formAttribute,
        pageHeaderItems,
        isEditAttributePending
    }: EditAttributeHookType = useEditAttributeHook();

    return (
        <>
            {/*<PageHeader
                title={`Modifier attribut ${attributeResponseData.name}`}
                items={pageHeaderItems}
            />*/}
            <Container maxW={'3xl'}>
                <CustomAlert data={attributeAlertData} />
                <CustomAlert data={editAttributeAlertData} />
                {attributeAlertData.show ? <NotFoundPage /> : (
                    <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                        <Formik initialValues={formAttribute} validationSchema={editAttributeSchema} onSubmit={handleEditAttribute} enableReinitialize>
                            {(props: FormikProps<EditAttributeFormType>) => (
                                <Form>
                                    <Flex>
                                        <TextField label="Nom" name="name" isLoading={isAttributePending} formikProps={props} />
                                        <SelectField
                                            label="Type"
                                            name="type"
                                            formikProps={props}
                                            isLoading={isAttributePending}
                                            values={staticSelectListAttributeTypes}
                                        />
                                    </Flex>
                                    <TextareaField label="Description" name="description" isLoading={isAttributePending} formikProps={props} />
                                    <ButtonGroup>
                                        <Button
                                            colorScheme={"green"}
                                            isLoading={isEditAttributePending}
                                            isDisabled={isAttributePending}
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

export default EditAttributePage;