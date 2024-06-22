import React, {FC, ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Button, ButtonGroup, useDisclosure} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import {StateType} from "../show/showStateData";
import useSelectListHook, {SelectListHookType} from "../../../hooks/useSelectListHook";
import {countriesApiURI} from "../../../constants/apiURIConstants";
import SelectField from "../../../components/form/SelectField";
import CountryAddForm from "../../countries/components/CountryAddForm";
import DrawerForm from "../../../components/DrawerForm";
import useStateEditHook, {
    StateEditHookType,
    EditStateFormType,
    editStateSchema
} from "../hooks/useStateEditHook";

const StateEditForm: FC<StateEditFormProps> = ({selectedState, finished}): ReactElement => {
    const {onOpen: onAddCountryDrawerOpen, isOpen: isAddCountryDrawerOpen, onClose: onAddCountryDrawerClose} = useDisclosure();
    const {t} = useTranslation();

    const {
        editStateAlertData,
        handleEditState,
        formState,
        isEditStatePending
    }: StateEditHookType = useStateEditHook({selectedState, finished});

    const {
        selectList: countriesSelectList,
        isSelectListFetching: isCountriesSelectListFetching,
        reloadList
    }: SelectListHookType = useSelectListHook({baseUrl: countriesApiURI.index});

    return (
        <Box>

            <CustomAlert data={editStateAlertData} />

            <Formik initialValues={formState} validationSchema={editStateSchema} onSubmit={handleEditState} enableReinitialize>
                {(props: FormikProps<EditStateFormType>) => (
                    <Form>
                        <TextField label="Nom" name="name" formikProps={props} />

                        <SelectField
                            label={t("countries")}
                            linkLabel={t("add_country")}
                            onLinkOpen={onAddCountryDrawerOpen}
                            name="countryId"
                            formikProps={props}
                            values={countriesSelectList}
                            isLoading={isCountriesSelectListFetching}
                        />

                        <TextareaField label="Description" name="description" formikProps={props} />

                        <ButtonGroup>
                            <Button
                                isLoading={isEditStatePending}
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
                title={t("add_country")}
                isOpen={isAddCountryDrawerOpen}
                onClose={onAddCountryDrawerClose}
            >
                <CountryAddForm
                    added={reloadList}
                    finished={(): void => {
                        onAddCountryDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </Box>
    );
};

interface StateEditFormProps {
    selectedState: StateType;
    finished: () => void;
}

export default StateEditForm;