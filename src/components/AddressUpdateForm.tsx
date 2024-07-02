import React, {FC, ReactElement} from "react";
import {Box, Button, ButtonGroup, CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";
import {useTranslation} from "react-i18next";
import {FiCheck, FiTrash2} from "react-icons/fi";

import useSelectListHook, {SelectListHookType} from "../hooks/useSelectListHook";
import { statesApiURI } from "../constants/apiURIConstants";
import CustomAlert from "./alert/CustomAlert";
import TextField from "./form/TextField";
import TextareaField from "./form/TextareaField";
import DrawerForm from "./DrawerForm";
import StateAddForm from "../pages/states/components/StateAddForm";
import {AddressType} from "../helpers/globalTypesHelper";
import SelectField from "./form/SelectField";
import ConfirmAlertDialog from "./ConfirmAlertDialog";
import useAddressUpdateHook, {
    AddressUpdateFormType,
    AddressUpdateHookType,
    addressUpdateSchema
} from "../hooks/useAddressUpdateHook";
import useIDActionRequestHook, {
    IDActionRequestHookType,
    IDActionRequestType
} from "../hooks/useIDActionRequestHook";

const AddressUpdateForm: FC<AddressUpdateFormProps> = ({address, uri, finished}): ReactElement => {
    const {onOpen: onAddStateDrawerOpen, isOpen: isAddStateDrawerOpen, onClose: onAddStateDrawerClose} = useDisclosure();

    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const deleteDone = (): void => {
        toast({
            title: t("delete"),
            description: `${t("address_deleted")}`
        });
        finished();
    };

    const {
        formAddress,
        isUpdateAddressPending,
        handleUpdateAddress,
        updateAddressAlertData
    }: AddressUpdateHookType = useAddressUpdateHook({uri, address, finished});

    const {
        selectList: statesSelectList,
        isSelectListFetching: isStatesSelectListFetching,
        reloadList
    }: SelectListHookType = useSelectListHook({baseUrl: statesApiURI.index});

    const {
        onModalClose: onDeleteModalClose,
        showModal: showDeleteModal,
        isModalOpen: isDeleteModalOpen,
        alertData: deleteImageAlertData,
        isPending: isDeleteImagePending,
        handleRequest: handleDeleteImage,
    }: IDActionRequestHookType = useIDActionRequestHook({
        uri,
        done: deleteDone,
        type: IDActionRequestType.DELETE
    });

    return (
        <Box>

            <CustomAlert data={updateAddressAlertData} />

            <Formik initialValues={formAddress} validationSchema={addressUpdateSchema} onSubmit={handleUpdateAddress} enableReinitialize>
                {(props: FormikProps<AddressUpdateFormType>) => (
                    <Form>
                        <SelectField
                            label={t("states")}
                            linkLabel={t("add_state")}
                            onLinkOpen={onAddStateDrawerOpen}
                            name="stateId"
                            formikProps={props}
                            values={statesSelectList}
                            isLoading={isStatesSelectListFetching}
                        />

                        <TextField label={t("street_address")} name="streetAddress" formikProps={props} />

                        <TextField label={t("zipcode")} name="zipcode" formikProps={props} />

                        <TextField label={t("phoneNumber_one")} name="phoneNumberOne" formikProps={props} />

                        <TextField label={t("phoneNumber_two")} name="phoneNumberTwo" formikProps={props} />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <ButtonGroup>
                            <Button
                                isLoading={isUpdateAddressPending}
                                type='submit'
                                leftIcon={<FiCheck />}
                            >
                                {t("change")}
                            </Button>
                            {address?.state && (
                                <Button
                                    colorScheme={"red"}
                                    leftIcon={<FiTrash2 />}
                                    onClick={showDeleteModal}
                                >
                                    {t("delete")}
                                </Button>
                            )}
                        </ButtonGroup>
                    </Form>
                )}
            </Formik>
            <DrawerForm
                title={t("add_state")}
                isOpen={isAddStateDrawerOpen}
                onClose={onAddStateDrawerClose}
            >
                <StateAddForm
                    added={reloadList}
                    finished={(): void => {
                        onAddStateDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
            <ConfirmAlertDialog
                danger
                handleConfirm={handleDeleteImage}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteImagePending}
                alertData={deleteImageAlertData}
            >
                {t("delete_address")}?
            </ConfirmAlertDialog>
        </Box>
    );
};

interface AddressUpdateFormProps {
    finished: () => void;
    address: AddressType | null,
    uri: string;
}

export default AddressUpdateForm;