import React, {FC, ReactElement} from "react";
import {Box, Button, Flex, Stack} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";

import CustomAlert from "../../alert/CustomAlert";
import TextField from "../../form/TextField";
import TextareaField from "../../form/TextareaField";
import useAddressAddFormHook from "./useAddressAddFormHook";
import useStatesSelectListHook, {StatesSelectListHookType} from "../../../hooks/useStatesSelectListHook";
import SelectField from "../../form/SelectField";
import {
    AddAddressFormType,
    addAddressInitialStaticValues,
    addAddressSchema,
    AddressAddFormHookType,
} from "./addressAddFormData";

const AddressAddForm: FC<CountryCreateFormProps> = ({baseUrl, handleFinish}): ReactElement => {
    const {selectListStates, isSelectListStatesPending}: StatesSelectListHookType = useStatesSelectListHook();
    const {
        addAddressAlertData,
        isAddAddressPending,
        handleAddAddress,
    }: AddressAddFormHookType = useAddressAddFormHook({baseUrl, handleFinish});

    return (
        <Stack>
            <CustomAlert data={addAddressAlertData} />
            <Formik initialValues={addAddressInitialStaticValues} validationSchema={addAddressSchema} onSubmit={handleAddAddress}>
                {(props: FormikProps<AddAddressFormType>) => (
                    <Form>
                        <Flex>
                            <SelectField
                                label="Ville"
                                name="stateId"
                                isInvalid={!!props.errors.stateId && !!props.touched.stateId}
                                errorMessage={props.errors.stateId}
                                values={selectListStates}
                                isLoading={isSelectListStatesPending}
                            />
                        </Flex>
                        <Flex>
                            <TextField
                                label="Address"
                                name="streetAddress"
                                isInvalid={!!props.errors.streetAddress && !!props.touched.streetAddress}
                                errorMessage={props.errors.streetAddress}
                            />
                            <Box mx={3} />
                            <TextField
                                label="Boite postale"
                                name="zipcode"
                                isInvalid={!!props.errors.zipcode && !!props.touched.zipcode}
                                errorMessage={props.errors.zipcode}
                            />
                        </Flex>
                        <Flex>
                            <TextField
                                label="Téléphone 1"
                                name="phoneNumberOne"
                                isInvalid={!!props.errors.phoneNumberOne && !!props.touched.phoneNumberOne}
                                errorMessage={props.errors.phoneNumberOne}
                            />
                            <Box mx={3} />
                            <TextField
                                label="Téléphone 2"
                                name="phoneNumberTwo"
                                isInvalid={!!props.errors.phoneNumberTwo && !!props.touched.phoneNumberTwo}
                                errorMessage={props.errors.phoneNumberTwo}
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
                            <Button
                                colorScheme={"green"}
                                isLoading={isAddAddressPending}
                                type='submit'
                                fontWeight="none"
                                leftIcon={<FiCheck />}
                            >
                                Ajouter
                            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

interface CountryCreateFormProps {
    baseUrl: string;
    handleFinish: () => void;
}

export default AddressAddForm;