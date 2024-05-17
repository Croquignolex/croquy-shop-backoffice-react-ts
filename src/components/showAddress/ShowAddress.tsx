import React, { FC, ReactElement } from "react";
import {Button, Table, Tbody, Badge, Stack, Flex, useDisclosure} from "@chakra-ui/react";
import {FiEdit, FiPlusSquare} from "react-icons/fi";
import {Link} from "react-router-dom";

import {AddressType} from "../../helpers/globalTypesHelper";
import ListSkeletonLoader from "../skeletonLoader/ListSkeletonLoader";
import {mainRoutes} from "../../routes/mainRoutes";
import {stringDateFormat} from "../../helpers/generalHelpers";
import FormModal from "../FormModal";
import UpdateAddressForm from "./add/UpdateAddressForm";

const ShowAddress: FC<DefaultAddressComponentProps> = ({address, isLoading, addressBaseUrl, handleAddressUpdate}): ReactElement => {
    const { onOpen: onUpdateAddressModalOpen, isOpen: isUpdateAddressModalOpen, onClose: onUpdateAddressModalClose } = useDisclosure();

    return (
        <Stack>
            <Flex justifyContent="flex-end">
                <Button
                    fontWeight="none"
                    colorScheme={"green"}
                    variant={"outline"}
                    leftIcon={address ? <FiEdit /> : <FiPlusSquare />}
                    size={"sm"}
                    onClick={onUpdateAddressModalOpen}
                >
                    {address ? "Modifier" : "Ajouter"}
                </Button>
            </Flex>
            <Table size={"sm"}>
                <Tbody>
                    <ListSkeletonLoader isLoading={isLoading} label={"Quartier"}>{address?.streetAddress}</ListSkeletonLoader>
                    <ListSkeletonLoader isLoading={isLoading} label={"Code postal"}>{address?.zipcode}</ListSkeletonLoader>
                    <ListSkeletonLoader isLoading={isLoading} label={"Téléphone 1"}>{address?.phoneNumberOne}</ListSkeletonLoader>
                    <ListSkeletonLoader isLoading={isLoading} label={"Téléphone 2"}>{address?.phoneNumberTwo}</ListSkeletonLoader>
                    <ListSkeletonLoader isLoading={isLoading} label={"Ville"}>
                        <Link
                            to={`${mainRoutes.states.path}/${address?.state?.id}`}
                            className="link"
                            state={address?.state}
                        >
                            {address?.state?.name}
                        </Link>
                    </ListSkeletonLoader>
                    <ListSkeletonLoader isLoading={isLoading} label={"Créer par"}>
                        <Link
                            to={`${mainRoutes.users.path}/${address?.creator?.id}`}
                            className="link"
                            state={address?.creator}
                        >
                            {address?.creator?.username}
                        </Link>
                    </ListSkeletonLoader>
                    <ListSkeletonLoader isLoading={isLoading} label={"Créer le"}>
                        <Badge rounded="md">{stringDateFormat(address?.createdAt, true)}</Badge>
                    </ListSkeletonLoader>
                    <ListSkeletonLoader isLoading={isLoading} label={"Description"}>{address?.description}</ListSkeletonLoader>
                </Tbody>
            </Table>
            <FormModal
                title={`${address ? "Modifier addresse" : "Ajouter une addresse"}`}
                isOpen={isUpdateAddressModalOpen}
                onClose={onUpdateAddressModalClose}
            >
                <UpdateAddressForm
                    baseUrl={addressBaseUrl}
                    address={address}
                    handleAddressUpdate={(a: AddressType | null) => {
                        onUpdateAddressModalClose();
                        handleAddressUpdate(a);
                    }}
                ></UpdateAddressForm>
            </FormModal>
        </Stack>
    )
};

interface DefaultAddressComponentProps {
    address: AddressType | null,
    isLoading: boolean,
    addressBaseUrl: string,
    handleAddressUpdate: (a: AddressType | null) => void,
}

export default ShowAddress;