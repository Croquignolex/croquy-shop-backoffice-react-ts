import { useState } from "react";
import { AxiosError } from "axios";
import {useDisclosure} from "@chakra-ui/react";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

import {shopsRequest} from "../../helpers/apiRequestsHelpers";
import { ErrorAlertType } from "../../helpers/globalTypesHelper";
import {errorAlert, log} from "../../helpers/generalHelpers";
import {
    defaultSelectedShop, defaultShopsResponseData,
    ShopsHookType, ShopsResponseDataType, ShopType
} from "./shopsData";

const useShopsHook = (): ShopsHookType => {
    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    let shopsAlertData: ErrorAlertType = {show: false};

    const [searchNeedle, setSearchNeedle] = useState<string>("");
    const [selectedShop, setSelectedShop] = useState<ShopType>(defaultSelectedShop);
    const [shopsQueryEnabled, setShopsQueryEnabled] = useState<boolean>(true);
    const [shopsResponseData, setShopsResponseData] = useState<ShopsResponseDataType>(defaultShopsResponseData);

    const shopsResponse: UseQueryResult<any, AxiosError> = useQuery({
        queryKey: ["shops"],
        queryFn: () => shopsRequest(shopsResponseData.number, shopsResponseData.size, searchNeedle),
        enabled: shopsQueryEnabled,
    });

    if(shopsResponse.isError) {
        shopsAlertData = errorAlert(shopsResponse.error);

        log("Shops list failure", shopsResponse);
    }

    if(shopsQueryEnabled && shopsResponse.isSuccess && !shopsResponse.isFetching) {
        setShopsQueryEnabled(false);

        setShopsResponseData(shopsResponse.data.data);

        log("Shops list successful", shopsResponse);
    }

    const isShopsPending: boolean = shopsResponse.isFetching;

    const fetchPaginatedShops = (next: boolean): void => {
        if(next && !shopsResponseData.last) setShopsResponseData({...shopsResponseData, number: shopsResponseData.number + 1});
        else if(!next && !shopsResponseData.first) setShopsResponseData({...shopsResponseData, number: shopsResponseData.number - 1})

        setShopsQueryEnabled(true);
    }

    const fetchPaginatedNeedleShops = (needle: string): void => {
        setSearchNeedle(needle);
        setShopsResponseData({...shopsResponseData, number: 0});

        setShopsQueryEnabled(true);
    }

    const showDeleteModal = (shop: ShopType): void => {
        setSelectedShop(shop);
        onDeleteModalOpen();
    }

    const closeModal = (reloadShops: boolean = false): void => {
        // onDeleteModalClose();
console.log({reloadShops})
        // if(reloadShops) setShopsQueryEnabled(true);
    }

    return {
        shopsResponseData, isShopsPending, shopsAlertData, fetchPaginatedShops, fetchPaginatedNeedleShops,
        selectedShop, showDeleteModal, isDeleteModalOpen, closeModal, setShopsQueryEnabled
    };
};

export default useShopsHook;