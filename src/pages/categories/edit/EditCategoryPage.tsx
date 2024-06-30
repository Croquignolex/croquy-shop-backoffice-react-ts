import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Stack, Container, Button, ButtonGroup, Flex, useDisclosure} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import useEditCategoryHook from "./useEditCategoryHook";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import PageHeader from "../../../components/PageHeader";
import {EditCategoryFormType, EditCategoryHookType, editCategorySchema} from "./editCategoryData";
import NotFoundPage from "../../NotFoundPage";
import SelectField from "../../../components/form/SelectField";
import SelectLink from "../../../components/form/SelectLink";
// import useGroupsSelectListHook, {GroupsSelectListHookType} from "../../../hooks/useGroupsSelectListHook";
import FormModal from "../../../components/FormModal";
// import GroupCreateForm from "../../../components/createForm/group/GroupCreateForm";

const EditCategoryPage = (): ReactElement => {
    const { onOpen: onAddGroupModalOpen, isOpen: isAddGroupModalOpen, onClose: onAddGroupModalClose } = useDisclosure();
    const {
        editCategoryAlertData,
        handleEditCategory,
        categoryResponseData,
        isCategoryPending,
        categoryAlertData,
        formCategory,
        pageHeaderItems,
        isEditCategoryPending
    }: EditCategoryHookType = useEditCategoryHook();

    return (
        <>
            {/*<PageHeader
                title={`Modifier catégorie ${categoryResponseData.name}`}
                items={pageHeaderItems}
            />*/}
            <Container maxW={'3xl'}>
                <CustomAlert data={categoryAlertData} />
                <CustomAlert data={editCategoryAlertData} />
                {categoryAlertData.show ? <NotFoundPage /> : (
                    <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                        <Formik initialValues={formCategory} validationSchema={editCategorySchema} onSubmit={handleEditCategory} enableReinitialize>
                            {(props: FormikProps<EditCategoryFormType>) => (
                                <Form>
                                    <SelectLink onModalOpen={onAddGroupModalOpen} label={"Ajouter un groupe"} />
                                    <Flex>
                                        <TextField label="Nom" name="name" isLoading={isCategoryPending} formikProps={props} />
                                        {/*<SelectField
                                            label="Group"
                                            name="groupId"
                                            formikProps={props}
                                            values={selectListGroups}
                                            isLoading={isSelectListGroupsPending}
                                        />*/}
                                    </Flex>
                                    <Flex>
                                        <TextField label="Slug" name="slug" isLoading={isCategoryPending} formikProps={props} />
                                        <TextField label="Titre SEO" name="seoTitle" isLoading={isCategoryPending} formikProps={props} />
                                    </Flex>
                                    <Flex>
                                        <TextareaField label="Description SEO" name="seoDescription" isLoading={isCategoryPending} formikProps={props} />
                                        <TextareaField label="Description" name="description" isLoading={isCategoryPending} formikProps={props} />
                                    </Flex>
                                    <ButtonGroup>
                                        <Button
                                            colorScheme={"green"}
                                            isLoading={isEditCategoryPending}
                                            isDisabled={isCategoryPending}
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
                        <FormModal
                            title="Ajouter un group"
                            isOpen={isAddGroupModalOpen}
                            onClose={onAddGroupModalClose}
                        >
                            {/*<GroupCreateForm
                                modal
                                handleAdd={(): void => setGroupsQueryEnabled(true)}
                                handleFinish={(): void => {
                                    onAddGroupModalClose();
                                    setGroupsQueryEnabled(true);
                                }}
                            />*/}
                        </FormModal>
                    </Stack>
                )}
            </Container>
        </>
    );
};

export default EditCategoryPage;