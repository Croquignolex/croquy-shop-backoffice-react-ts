import React, {FC, ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Button, ButtonGroup, useDisclosure} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import {CategoryType} from "../show/showCategoryData";
import useSelectListHook, {SelectListHookType} from "../../../hooks/useSelectListHook";
import {groupsApiURI} from "../../../constants/apiURIConstants";
import SelectField from "../../../components/form/SelectField";
import DrawerForm from "../../../components/DrawerForm";
import GroupAddForm from "../../groups/components/GroupAddForm";
import useCategoryEditHook, {
    CategoryEditHookType,
    CategoryEditFormType,
    categoryEditSchema
} from "../hooks/useCategoryEditHook";

const CategoryEditForm: FC<CategoryEditFormProps> = ({selectedCategory, finished}): ReactElement => {
    const {onOpen: onAddGroupDrawerOpen, isOpen: isAddGroupDrawerOpen, onClose: onAddGroupDrawerClose} = useDisclosure();
    const {t} = useTranslation();

    const {
        editCategoryAlertData,
        handleEditCategory,
        formCategory,
        isEditCategoryPending
    }: CategoryEditHookType = useCategoryEditHook({selectedCategory, finished});

    const {
        selectList: groupsSelectList,
        isSelectListFetching: isGroupsSelectListFetching,
        reloadList
    }: SelectListHookType = useSelectListHook({baseUrl: groupsApiURI.index});

    return (
        <Box>

            <CustomAlert data={editCategoryAlertData} />

            <Formik initialValues={formCategory} validationSchema={categoryEditSchema} onSubmit={handleEditCategory} enableReinitialize>
                {(props: FormikProps<CategoryEditFormType>) => (
                    <Form>
                        <SelectField
                            label={t("group")}
                            linkLabel={t("add_group")}
                            onLinkOpen={onAddGroupDrawerOpen}
                            name="groupId"
                            formikProps={props}
                            values={groupsSelectList}
                            isLoading={isGroupsSelectListFetching}
                        />

                        <TextField label={t("name")} name="name" formikProps={props} />

                        <TextField label={t("slug")} name="slug" formikProps={props} />

                        <TextField label={t("seo_title")} name="seoTitle" formikProps={props} />

                        <TextareaField label={t("seo_description")} name="seoDescription" formikProps={props} />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <ButtonGroup>
                            <Button
                                isLoading={isEditCategoryPending}
                                type='submit'
                                leftIcon={<FiCheck />}
                            >
                                {t("update")}
                            </Button>
                        </ButtonGroup>
                    </Form>
                )}
            </Formik>
            <DrawerForm
                title={t("add_group")}
                isOpen={isAddGroupDrawerOpen}
                onClose={onAddGroupDrawerClose}
            >
                <GroupAddForm
                    added={reloadList}
                    finished={(): void => {
                        onAddGroupDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </Box>
    );
};

interface CategoryEditFormProps {
    selectedCategory: CategoryType;
    finished: () => void;
}

export default CategoryEditForm;