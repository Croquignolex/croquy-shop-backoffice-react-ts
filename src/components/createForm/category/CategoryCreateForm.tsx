import React, {FC, ReactElement} from "react";
import {Flex, Stack, useDisclosure} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";

import CustomAlert from "../../alert/CustomAlert";
import TextField from "../../form/TextField";
import TextareaField from "../../form/TextareaField";
import DoubleSaveButton from "../../form/DoubleSaveButton";
import useCategoryCreateFormHook from "./useCategoryCreateFormHook";
import SelectLink from "../../form/SelectLink";
import useGroupsSelectListHook, {GroupsSelectListHookType} from "../../../hooks/useGroupsSelectListHook";
import SelectField from "../../form/SelectField";
import FormModal from "../../FormModal";
import GroupCreateForm from "../group/GroupCreateForm";
import {
    CategoryCreateFormHookType,
    CreateCategoryFormType,
    createCategoryInitialStaticValues,
    createCategorySchema
} from "./categoryCreateFormData";

const CategoryCreateForm: FC<CategoryCreateFormProps> = ({modal = false, handleFinish, handleAdd}): ReactElement => {
    const { onOpen: onAddGroupModalOpen, isOpen: isAddGroupModalOpen, onClose: onAddGroupModalClose } = useDisclosure();
    const {
        selectListGroups,
        isSelectListGroupsFetching,
        reloadList
    }: GroupsSelectListHookType = useGroupsSelectListHook();
    const {
        createCategoryAlertData,
        handleCreateCategory,
        handleCreateCategoryAndContinue,
        sequence,
        isCreateCategoryPending
    }: CategoryCreateFormHookType = useCategoryCreateFormHook({modal, handleFinish, handleAdd});

    return (
        <Stack key={sequence}>
            <CustomAlert data={createCategoryAlertData} />
            <Formik initialValues={createCategoryInitialStaticValues} validationSchema={createCategorySchema} onSubmit={handleCreateCategory}>
                {(props: FormikProps<CreateCategoryFormType>) => (
                    <Form>
                        <SelectLink onModalOpen={onAddGroupModalOpen} label={"Ajouter un groupe"} />
                        <Flex>
                            <TextField label="Nom" name="name" formikProps={props} />
                            {/*<SelectField
                                label="Group"
                                name="groupId"
                                formikProps={props}
                                values={selectListGroups}
                                isLoading={isSelectListGroupsPending}
                            />*/}
                        </Flex>
                        <Flex>
                            <TextField label="Slug" name="slug" formikProps={props} />
                            <TextField label="Titre SEO" name="seoTitle" formikProps={props} />
                        </Flex>
                        <Flex>
                            <TextareaField label="Description SEO" name="seoDescription" formikProps={props} />
                            <TextareaField label="Description" name="description" formikProps={props} />
                        </Flex>
                        <Stack>
                            <DoubleSaveButton
                                isLoading={isCreateCategoryPending}
                                formikProps={props}
                                handleSaveAndContinue={() => handleCreateCategoryAndContinue(props.values)}
                            />
                        </Stack>
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
    );
};

interface CategoryCreateFormProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export default CategoryCreateForm;