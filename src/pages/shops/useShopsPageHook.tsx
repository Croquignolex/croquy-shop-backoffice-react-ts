import { useState } from "react";
import { AxiosError } from "axios";
import {useDisclosure} from "@chakra-ui/react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { shopsRequest } from "../../helpers/apiRequestsHelpers";
import { ErrorAlertType } from "../../helpers/globalTypesHelper";
import {errorAlert, log} from "../../helpers/generalHelpers";
import {defaultSelectedShop, defaultShopsResponseData, ShopsResponseDataType, ShopType} from "./shopsPageData";

const useShopsPageHook = (): any => {
    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    let alertData: ErrorAlertType = {show: false};

    const [searchNeedle, setSearchNeedle] = useState<string>("");
    const [selectedShop, setSelectedShop] = useState<ShopType>(defaultSelectedShop);
    const [shopsQueryEnabled, setShopsQueryEnabled] = useState<boolean>(true);
    const [shopsResponseData, setShopsResponseData] = useState<ShopsResponseDataType>(defaultShopsResponseData);

    const usersResponse: UseQueryResult<any, AxiosError> = useQuery({
        queryKey: ["shops"],
        queryFn: () => shopsRequest(shopsResponseData.number, shopsResponseData.size, searchNeedle),
        enabled: shopsQueryEnabled,
    });

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

    const handleDelete = (): void => {
        console.log({selectedShop})

        onDeleteModalClose();
    }

    if(usersResponse.isError) {
        alertData = errorAlert(usersResponse.error);

        log("Shops list failure", usersResponse);
    }

    if(shopsQueryEnabled && usersResponse.isSuccess && !usersResponse.isFetching) {
        setShopsQueryEnabled(false);

        setShopsResponseData(usersResponse.data.data);

        log("Shops list successful", usersResponse);
    }

    const isPending: boolean = usersResponse.isFetching;

    return {
        shopsResponseData,
        isPending,
        alertData,
        fetchPaginatedShops,
        fetchPaginatedNeedleShops,
        handleDelete,
        selectedShop,
        showDeleteModal,
        isDeleteModalOpen,
        onDeleteModalClose
    };
};

export default useShopsPageHook;