import React, {FC, ReactElement} from "react";
import {Button, ButtonGroup, Flex, Stack, useDisclosure} from "@chakra-ui/react";
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
import SelectLink from "../../form/SelectLink";
import {
    addAddressSchema,
    UpdateAddressFormHookType,
    UpdateAddressFormType,
    updateAddressInitialStaticValues,
} from "./updateaAdressFormData";

const UpdateAddressForm: FC<UpdateAddressFormProps> = ({baseUrl, address, handleAddressUpdate}): ReactElement => {
    const { onOpen: onAddStateModalOpen, isOpen: isAddStateModalOpen, onClose: onAddStateModalClose } = useDisclosure();
    const {selectListStates, isSelectListStatesFetching, reloadList}: StatesSelectListHookType = useStatesSelectListHook();
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
                        <SelectLink onModalOpen={onAddStateModalOpen} label={"Ajouter une ville"} />
                        {/*<SelectField
                            label="Ville"
                            name="stateId"
                            formikProps={props}
                            values={selectListStates}
                            isLoading={isSelectListStatesPending}
                        />*/}
                        <Flex>
                            <TextField label="Address" name="streetAddress" formikProps={props} />
                            <TextField label="Boite postale" name="zipcode" formikProps={props} />
                        </Flex>
                        <Flex>
                            <TextField label="Téléphone 1" name="phoneNumberOne" formikProps={props} />
                            <TextField label="Téléphone 2" name="phoneNumberTwo" formikProps={props} />
                        </Flex>
                        <TextareaField label="Description" name="description" formikProps={props} />
                        <ButtonGroup>
                            <Button
                                colorScheme={"green"}
                                isLoading={isAddAddressPending}
                                type='submit'
                                fontWeight="none"
                                leftIcon={<FiCheck />}
                            >
                                {`${address ? "Modifier" : "Ajouter"}`}
                            </Button>
                        </ButtonGroup>
                    </Form>
                )}
            </Formik>
            <FormModal
                title="Ajouter une ville"
                isOpen={isAddStateModalOpen}
                onClose={onAddStateModalClose}
            >
                {/*<StateCreateForm
                    modal
                    handleAdd={(): void => setStatesQueryEnabled(true)}
                    handleFinish={(): void => {
                        onAddStateModalClose();
                        setStatesQueryEnabled(true);
                    }}
                />*/}
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