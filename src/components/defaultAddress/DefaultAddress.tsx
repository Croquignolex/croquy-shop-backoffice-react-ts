import React, { FC, ReactElement } from "react";
import {HStack, Button, Tbody, Badge, Table} from "@chakra-ui/react";
import {FiEdit, FiPlusSquare} from "react-icons/fi";
import {Link} from "react-router-dom";

import CustomAlert from "../alert/CustomAlert";
import useDefaultAddressHook from "./useDefaultAddressHook";
import {DefaultAddressHookType} from "./showDefaultAddressData";

const DefaultAddressComponent: FC<DefaultAddressComponentProps> = ({url}): ReactElement => {
    const {
        address, addressAlertData, isAddressPending
    }: DefaultAddressHookType = useDefaultAddressHook({url});

    return (
        <>
            <strong>Addresse par défaut</strong>
            <CustomAlert data={addressAlertData} />
            <HStack>
                <Button
                    fontWeight="none"
                    colorScheme={"orange"}
                    leftIcon={address ? <FiEdit /> : <FiPlusSquare />}
                    size={"sm"}
                    as={Link}
                    to={"edithPath"}
                    // state={shopResponseData}
                >
                    {address ? "Ajouter une addresse" : "Modifier addesse"}
                </Button>
                {!address && (
                    <Table size={"sm"}>
                        {/*<Tbody>
                            <ListSkeletonLoader isLoading={isAddressPending} label={"Quartier"}>{address.streetAddress}</ListSkeletonLoader>
                            <ListSkeletonLoader isLoading={isAddressPending} label={"Code postal"}>{address.slug}</ListSkeletonLoader>
                            <ListSkeletonLoader isLoading={isAddressPending} label={"Téléphone 1"}>{address.slug}</ListSkeletonLoader>
                            <ListSkeletonLoader isLoading={isAddressPending} label={"Téléphone 2"}>{address.slug}</ListSkeletonLoader>
                            <ListSkeletonLoader isLoading={isAddressPending} label={"Créer par"}>
                                <ExternalLink
                                    state={address.creator}
                                    label={address.creator?.username}
                                    path={`${mainRoutes.users.path}/${address.creator?.id}`}
                                />
                            </ListSkeletonLoader>
                            <ListSkeletonLoader isLoading={isAddressPending} label={"Créer par"}>
                                <ExternalLink
                                    state={address.creator}
                                    label={address.creator?.username}
                                    path={`${mainRoutes.users.path}/${address.creator?.id}`}
                                />
                            </ListSkeletonLoader>
                            <ListSkeletonLoader isLoading={isAddressPending} label={"Créer le"}>
                                <Badge rounded="md">{stringDateFormat(address.createdAt, true)}</Badge>
                            </ListSkeletonLoader>
                            <ListSkeletonLoader isLoading={isAddressPending} label={"Modifié le"}>
                                <Badge rounded="md">{stringDateFormat(address.updatedAt, true)}</Badge>
                            </ListSkeletonLoader>
                            <ListSkeletonLoader isLoading={isAddressPending} label={"Description"}>{address.description}</ListSkeletonLoader>
                        </Tbody>*/}
                    </Table>
                )}
            </HStack>
        </>
    )
};

interface DefaultAddressComponentProps {
    url: string
}

export default DefaultAddressComponent;