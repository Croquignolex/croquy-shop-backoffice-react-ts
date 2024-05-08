import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Stack, Container, Flex, Button, Text, useDisclosure} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import useEditStateHook from "./useEditStateHook";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import PageHeader from "../../../components/menu/PageHeader";
import {EditStateFormType, EditStateHookType, editStateSchema} from "./editStateData";
import NotFoundPage from "../../NotFoundPage";
import SelectField from "../../../components/form/SelectField";
import useCountriesSelectListHook, {CountriesSelectListHookType} from "../../../hooks/useCountriesSelectListHook";
import CountryCreateForm from "../../../components/createForm/country/CountryCreateForm";
import FormModal from "../../../components/FormModal";

const EditStatePage = (): ReactElement => {
    const { onOpen: onAddCountryModalOpen, isOpen: isAddCountryModalOpen, onClose: onAddCountryModalClose } = useDisclosure();
    const {
        selectListCountries,
        setCountriesQueryEnabled,
        isSelectListCountriesPending
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
            <PageHeader
                title={`Modifier ville ${stateResponseData.name}`}
                items={pageHeaderItems}
            />
            <Container maxW={'3xl'}>
                <CustomAlert data={stateAlertData} />
                <CustomAlert data={editStateAlertData} />
                {stateAlertData.show ? <NotFoundPage /> : (
                    <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                        <Formik initialValues={formState} validationSchema={editStateSchema} onSubmit={handleEditState} enableReinitialize>
                            {(props: FormikProps<EditStateFormType>) => (
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
                                            isLoading={isStatePending}
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
                                            isLoading={isStatePending}
                                            isInvalid={!!props.errors.description && !!props.touched.description}
                                            errorMessage={props.errors.description}
                                        />
                                    </Flex>
                                    <Flex>
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
                )}
            </Container>
        </>
    );
};

export default EditStatePage;