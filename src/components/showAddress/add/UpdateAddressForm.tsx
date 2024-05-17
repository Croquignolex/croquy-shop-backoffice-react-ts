import React, {FC, ReactElement} from "react";
import {Box, Button, Flex, Stack, Text, useDisclosure} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";

import CustomAlert from "../../alert/CustomAlert";
import TextField from "../../form/TextField";
import TextareaField from "../../form/TextareaField";
import useUpdateAddressFormHook from "./useUpdateAddressFormHook";
import useStatesSelectListHook, {StatesSelectListHookType} from "../../../hooks/useStatesSelectListHook";
import SelectField from "../../form/SelectField";
import StateCreateForm from "../../createForm/state/StateCreateForm";
import FormModal from "../../FormModal";
import {AddressType} from "../../../helpers/globalTypesHelper";
import {
    addAddressSchema,
    UpdateAddressFormHookType,
    UpdateAddressFormType,
    updateAddressInitialStaticValues,
} from "./updateaAdressFormData";

const UpdateAddressForm: FC<UpdateAddressFormProps> = ({baseUrl, address, handleAddressUpdate}): ReactElement => {
    const { onOpen: onAddStateModalOpen, isOpen: isAddStateModalOpen, onClose: onAddStateModalClose } = useDisclosure();
    const {selectListStates, isSelectListStatesPending, setStatesQueryEnabled}: StatesSelectListHookType = useStatesSelectListHook();
    const {
        addAddressAlertData,
        isAddAddressPending,
        handleAddAddress,
    }: UpdateAddressFormHookType = useUpdateAddressFormHook({baseUrl, address, handleAddressUpdate});

    let addressInitialValues: UpdateAddressFormType = {...updateAddressInitialStaticValues};
    if(address) {
        addressInitialValues.streetAddress = address.streetAddress;
        addressInitialValues.stateId = address.state?.id;
        addressInitialValues.zipcode = address.zipcode;
        addressInitialValues.description = address.description;
        addressInitialValues.phoneNumberTwo = address.phoneNumberTwo;
        addressInitialValues.phoneNumberOne = address.phoneNumberOne;
    }

    return (
        <Stack>
            <CustomAlert data={addAddressAlertData} />
            <Formik initialValues={addressInitialValues} validationSchema={addAddressSchema} onSubmit={handleAddAddress}>
                {(props: FormikProps<UpdateAddressFormType>) => (
                    <Form>
                        <Box textAlign="right">
                            <Text
                                as={"span"}
                                fontSize="sm"
                                className="link"
                                onClick={onAddStateModalOpen}
                            >
                                Ajouter une ville
                            </Text>
                        </Box>
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
                                {`${address ? "Modifier" : "Ajouter"}`}
                            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
            <FormModal
                title="Ajouter une ville"
                isOpen={isAddStateModalOpen}
                onClose={onAddStateModalClose}
            >
                <StateCreateForm
                    modal
                    handleAdd={(): void => setStatesQueryEnabled(true)}
                    handleFinish={(): void => {
                        onAddStateModalClose();
                        setStatesQueryEnabled(true);
                    }}
                />
            </FormModal>
        </Stack>
    );
};

interface UpdateAddressFormProps {
    baseUrl: string;
    address: AddressType | null,
    handleAddressUpdate: (a: AddressType | null) => void,
}

export default UpdateAddressForm;