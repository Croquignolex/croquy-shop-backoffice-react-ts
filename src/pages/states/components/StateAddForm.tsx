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
import {countriesApiURI} from "../../../constants/apiURIConstants";
import DrawerForm from "../../../components/DrawerForm";
import CountryAddForm from "../../countries/components/CountryAddForm";
import useStateAddHook, {
    StateAddFormType,
    StateAddHookType,
    stateAddInitialStaticValues,
    stateAddSchema
} from "../hooks/useStateAddHook";

const StateAddForm: FC<StateAddFormProps> = ({added, finished}): ReactElement => {
    const {onOpen: onAddCountryDrawerOpen, isOpen: isAddCountryDrawerOpen, onClose: onAddCountryDrawerClose} = useDisclosure();
    const {t} = useTranslation();

    const {
        addStateAlertData,
        handleAddState,
        handleAddStateAndContinue,
        sequence,
        isAddStatePending
    }: StateAddHookType = useStateAddHook({added, finished});

    const {
        selectList: countriesSelectList,
        isSelectListFetching: isCountriesSelectListFetching,
        reloadList
    }: SelectListHookType = useSelectListHook({baseUrl: countriesApiURI.index});

    return (
        <Box key={sequence}>

            <CustomAlert data={addStateAlertData} />

            <Formik initialValues={stateAddInitialStaticValues} validationSchema={stateAddSchema} onSubmit={handleAddState}>
                {(props: FormikProps<StateAddFormType>) => (
                    <Form>
                        <TextField label={t("name")} name="name" formikProps={props} />

                        <SelectField
                            label={t("countries")}
                            linkLabel={t("add_country")}
                            onLinkOpen={onAddCountryDrawerOpen}
                            name="countryId"
                            formikProps={props}
                            values={countriesSelectList}
                            isLoading={isCountriesSelectListFetching}
                        />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <DoubleSaveButton
                            isLoading={isAddStatePending}
                            formikProps={props}
                            handleSaveAndContinue={() => handleAddStateAndContinue(props.values)}
                        />
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

interface StateAddFormProps {
    finished: () => void;
    added: () => void;
}

export default StateAddForm;