import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Stack, Container, Button, ButtonGroup, Flex} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import useEditGroupHook from "./useEditGroupHook";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import PageHeader from "../../../components/menu/PageHeader";
import {EditGroupFormType, EditGroupHookType, editGroupSchema} from "./editGroupData";
import NotFoundPage from "../../NotFoundPage";

const EditGroupPage = (): ReactElement => {
    const {
        editGroupAlertData,
        handleEditGroup,
        groupResponseData,
        isGroupPending,
        groupAlertData,
        formGroup,
        pageHeaderItems,
        isEditGroupPending
    }: EditGroupHookType = useEditGroupHook();

    return (
        <>
            <PageHeader
                title={`Modifier groupe ${groupResponseData.name}`}
                items={pageHeaderItems}
            />
            <Container maxW={'3xl'}>
                <CustomAlert data={groupAlertData} />
                <CustomAlert data={editGroupAlertData} />
                {groupAlertData.show ? <NotFoundPage /> : (
                    <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                        <Formik initialValues={formGroup} validationSchema={editGroupSchema} onSubmit={handleEditGroup} enableReinitialize>
                            {(props: FormikProps<EditGroupFormType>) => (
                                <Form>
                                    <Flex>
                                        <TextField label="Nom" name="name" isLoading={isGroupPending} formikProps={props} />
                                        <TextField label="Slug" name="slug" isLoading={isGroupPending} formikProps={props} />
                                    </Flex>
                                    <TextField label="Titre SEO" name="seoTitle" isLoading={isGroupPending} formikProps={props} />
                                    <Flex>
                                        <TextareaField label="Description SEO" name="seoDescription" isLoading={isGroupPending} formikProps={props} />
                                        <TextareaField label="Description" name="description" isLoading={isGroupPending} formikProps={props} />
                                    </Flex>
                                    <ButtonGroup>
                                        <Button
                                            colorScheme={"green"}
                                            isLoading={isEditGroupPending}
                                            isDisabled={isGroupPending}
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

export default EditGroupPage;