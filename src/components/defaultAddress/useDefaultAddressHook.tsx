import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {Location, NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AddressType, DefaultAddressHookProps, DefaultAddressHookType} from "./showDefaultAddressData";
import {ErrorAlertType} from "../../helpers/globalTypesHelper";
import {errorAlert, log} from "../../helpers/generalHelpers";
// import {shopRequest} from "../../pages/shops/show/showShopData";

const useDefaultAddressHook = ({url}: DefaultAddressHookProps): DefaultAddressHookType => {
    let addressAlertData: ErrorAlertType = {show: false};
    let { state }:Location  = useLocation();

    const address: AddressType = state;

    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { onOpen: onToggleModalOpen, isOpen: isToggleModalOpen, onClose: onToggleModalClose } = useDisclosure();
    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const [shopQueryEnabled, setShopQueryEnabled] = useState<boolean>(true);
    const [deleteShopAlertData, setDeleteShopAlertData] = useState<ErrorAlertType>({show: false});
    const [toggleShopAlertData, setToggleShopAlertData] = useState<ErrorAlertType>({show: false});
    const [shopResponseData, setShopResponseData] = useState<AddressType>(address);

    const addressResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["shops"],
        // queryFn: () => shopRequest(address.id),
        queryFn: () => {

        },
        enabled: shopQueryEnabled,
    });

    if(addressResponse.isError) {
        addressAlertData = errorAlert(addressResponse.error);

        log("Shop show failure", addressResponse);
    }

    if(shopQueryEnabled && addressResponse.isSuccess && !addressResponse.isFetching) {
        setShopQueryEnabled(false);
        setShopResponseData(addressResponse.data.data);

        log("Shops list successful", addressResponse);
    }

    const isAddressPending: boolean = addressResponse.isFetching;

    return {
        address, addressAlertData, isAddressPending
    };
};

export default useDefaultAddressHook;