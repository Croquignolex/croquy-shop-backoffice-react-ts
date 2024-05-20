import React, {FC, ReactElement} from "react";
import {Flex, Stack, useDisclosure} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";

import CustomAlert from "../../alert/CustomAlert";
import TextField from "../../form/TextField";
import TextareaField from "../../form/TextareaField";
import DoubleSaveButton from "../../form/DoubleSaveButton";
import useStateCreateFormHook from "./useStateCreateFormHook";
import SelectField from "../../form/SelectField";
import useCountriesSelectListHook, {CountriesSelectListHookType} from "../../../hooks/useCountriesSelectListHook";
import FormModal from "../../FormModal";
import CountryCreateForm from "../country/CountryCreateForm";
import SelectLink from "../../form/SelectLink";
import {
    StateCreateFormHookType,
    CreateStateFormType,
    createStateInitialStaticValues,
    createStateSchema
} from "./stateCreateFormData";

const StateCreateForm: FC<StateCreateFormProps> = ({modal = false, handleFinish, handleAdd}): ReactElement => {
    const { onOpen: onAddCountryModalOpen, isOpen: isAddCountryModalOpen, onClose: onAddCountryModalClose } = useDisclosure();
    const {
        selectListCountries,
        setCountriesQueryEnabled,
        isSelectListCountriesPending
    }: CountriesSelectListHookType = useCountriesSelectListHook();
    const {
        createStateAlertData,
        handleCreateState,
        handleCreateStateAndContinue,
        sequence,
        isCreateStatePending
    }: StateCreateFormHookType = useStateCreateFormHook({modal, handleFinish, handleAdd});

    return (
        <Stack key={sequence}>
            <CustomAlert data={createStateAlertData} />
            <Formik initialValues={createStateInitialStaticValues} validationSchema={createStateSchema} onSubmit={handleCreateState}>
                {(props: FormikProps<CreateStateFormType>) => (
                    <Form>
                        <SelectLink onModalOpen={onAddCountryModalOpen} label={"Ajouter un pays"} />
                        <Flex>
                            <TextField label="Nom" name="name" formikProps={props} />
                            <SelectField
                                label="Pays"
                                name="countryId"
                                formikProps={props}
                                values={selectListCountries}
                                isLoading={isSelectListCountriesPending}
                            />
                        </Flex>
                        <TextareaField label="Description" name="description" formikProps={props} />
                        <Stack>
                            <DoubleSaveButton
                                isLoading={isCreateStatePending}
                                formikProps={props}
                                handleSaveAndContinue={() => handleCreateStateAndContinue(props.values)}
                            />
                        </Stack>
                    </Form>
                )}
            </Formik>
            <FormModal
                title="Ajouter un pays"
                isOpen={isAddCountryModalOpen}
                onClose={onAddCountryModalClose}
            >
                <CountryCreateForm
                    modal
                    handleAdd={(): void => setCountriesQueryEnabled(true)}
                    handleFinish={(): void => {
                        onAddCountryModalClose();
                        setCountriesQueryEnabled(true);
                    }}
                />
            </FormModal>
        </Stack>
    );
};

interface StateCreateFormProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export default StateCreateForm;