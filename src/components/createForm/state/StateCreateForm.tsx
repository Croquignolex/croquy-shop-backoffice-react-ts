import React, {FC, ReactElement} from "react";
import {Box, Flex, Stack, Text, useDisclosure} from "@chakra-ui/react";
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
                        <Box textAlign="right">
                            <Text
                                as={"span"}
                                fontSize="sm"
                                className="link"
                                onClick={onAddCountryModalOpen}
                            >
                                Ajouter un pays
                            </Text>
                        </Box>
                        <Flex>
                            <TextField
                                label="Nom"
                                name="name"
                                isInvalid={!!props.errors.name && !!props.touched.name}
                                errorMessage={props.errors.name}
                            />
                            <Box mx={3} />
                            <SelectField
                                label="Pays"
                                name="countryId"
                                isInvalid={!!props.errors.countryId && !!props.touched.countryId}
                                errorMessage={props.errors.countryId}
                                values={selectListCountries}
                                isLoading={isSelectListCountriesPending}
                            />
                        </Flex>
                        <Flex>
                            <TextareaField
                                label="Description"
                                name="description"
                                isInvalid={!!props.errors.description && !!props.touched.description}
                                errorMessage={props.errors.description}
                            />
                        </Flex>
                        <Flex>
                            <DoubleSaveButton
                                isLoading={isCreateStatePending}
                                formikProps={props}
                                handleSaveAndContinue={() => handleCreateStateAndContinue(props.values)}
                            />
                        </Flex>
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