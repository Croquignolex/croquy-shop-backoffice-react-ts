import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Stack, Container, Flex, Button, useDisclosure, ButtonGroup} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import useEditStateHook from "./useEditStateHook";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import PageHeader from "../../../components/PageHeader";
import {EditStateFormType, EditStateHookType, editStateSchema} from "./editStateData";
import NotFoundPage from "../../NotFoundPage";
import SelectField from "../../../components/form/SelectField";
import useCountriesSelectListHook, {CountriesSelectListHookType} from "../../../hooks/useCountriesSelectListHook";
import CountryCreateForm from "../../../components/createForm/country/CountryCreateForm";
import FormModal from "../../../components/FormModal";
import SelectLink from "../../../components/form/SelectLink";

const EditStatePage = (): ReactElement => {
    const { onOpen: onAddCountryModalOpen, isOpen: isAddCountryModalOpen, onClose: onAddCountryModalClose } = useDisclosure();
    const {
        selectListCountries,
        isSelectListCountriesFetching,
        reloadList
    }: CountriesSelectListHookType = useCountriesSelectListHook();
    const {
        editStateAlertData,
        handleEditState,
        stateResponseData,
        isStatePending,
        stateAlertData,
        formState,
        pageHeaderItems,
        isEditStatePending
    }: EditStateHookType = useEditStateHook();

    return (
        <>
            {/*<PageHeader*/}
            {/*    title={`Modifier ville ${stateResponseData.name}`}*/}
            {/*    items={pageHeaderItems}*/}
            {/*/>*/}
            <Container maxW={'3xl'}>
                <CustomAlert data={stateAlertData} />
                <CustomAlert data={editStateAlertData} />
                {stateAlertData.show ? <NotFoundPage /> : (
                    <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                        <Formik initialValues={formState} validationSchema={editStateSchema} onSubmit={handleEditState} enableReinitialize>
                            {(props: FormikProps<EditStateFormType>) => (
                                <Form>
                                    <SelectLink onModalOpen={onAddCountryModalOpen} label={"Ajouter un pays"} />
                                    <Flex>
                                        <TextField label="Nom" name="name" isLoading={isStatePending} formikProps={props} />
                                        {/*<SelectField
                                            label="Pays"
                                            name="countryId"
                                            formikProps={props}
                                            values={selectListCountries}
                                            isLoading={isSelectListCountriesPending}
                                        />*/}
                                    </Flex>
                                    <TextareaField label="Description" name="description" isLoading={isStatePending} formikProps={props} />
                                    <ButtonGroup>
                                        <Button
                                            colorScheme={"green"}
                                            isLoading={isEditStatePending}
                                            isDisabled={isStatePending}
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
                            title="Ajouter un pays"
                            isOpen={isAddCountryModalOpen}
                            onClose={onAddCountryModalClose}
                        >
                            {/*<CountryCreateForm
                                modal
                                handleAdd={(): void => setCountriesQueryEnabled(true)}
                                handleFinish={(): void => {
                                    onAddCountryModalClose();
                                    setCountriesQueryEnabled(true);
                                }}
                            />*/}
                        </FormModal>
                    </Stack>
                )}
            </Container>
        </>
    );
};

export default EditStatePage;