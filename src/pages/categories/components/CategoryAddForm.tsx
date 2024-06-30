import React, {FC, ReactElement} from "react";
import {Box, useDisclosure} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import DoubleSaveButton from "../../../components/form/DoubleSaveButton";
import SelectField from "../../../components/form/SelectField";
import useSelectListHook, {SelectListHookType} from "../../../hooks/useSelectListHook";
import {groupsApiURI} from "../../../constants/apiURIConstants";
import DrawerForm from "../../../components/DrawerForm";
import GroupAddForm from "../../groups/components/GroupAddForm";
import useCategoryAddHook, {
    CategoryAddFormType,
    CategoryAddHookType,
    categoryAddInitialStaticValues,
    categoryAddSchema
} from "../hooks/useCategoryAddHook";

const CategoryAddForm: FC<CategoryAddFormProps> = ({added, finished}): ReactElement => {
    const {onOpen: onAddGroupDrawerOpen, isOpen: isAddGroupDrawerOpen, onClose: onAddGroupDrawerClose} = useDisclosure();
    const {t} = useTranslation();

    const {
        addCategoryAlertData,
        handleAddCategory,
        handleAddCategoryAndContinue,
        sequence,
        isAddCategoryPending
    }: CategoryAddHookType = useCategoryAddHook({added, finished});

    const {
        selectList: groupsSelectList,
        isSelectListFetching: isGroupsSelectListFetching,
        reloadList
    }: SelectListHookType = useSelectListHook({baseUrl: groupsApiURI.index});

    return (
        <Box key={sequence}>

            <CustomAlert data={addCategoryAlertData} />

            <Formik initialValues={categoryAddInitialStaticValues} validationSchema={categoryAddSchema} onSubmit={handleAddCategory}>
                {(props: FormikProps<CategoryAddFormType>) => (
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

                        <DoubleSaveButton
                            isLoading={isAddCategoryPending}
                            formikProps={props}
                            handleSaveAndContinue={() => handleAddCategoryAndContinue(props.values)}
                        />
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

interface CategoryAddFormProps {
    finished: () => void;
    added: () => void;
}

export default CategoryAddForm;