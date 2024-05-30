import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {BrandType, defaultSelectedBrand, destroyBrand} from "../../../pages/brands/show/showBrandData";
import {
    BrandsResponseDataType,
    BrandsTableListHookProps,
    BrandsTableListHookType,
    defaultBrandsResponseData,
    DestroyBrandRequestDataType,
    brandsRequest,
} from "./brandsTableListData";

const useBrandsTableListHook = ({fetchBrands, brandsBaseUrl}: BrandsTableListHookProps): BrandsTableListHookType => {
    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const toast: CreateToastFnReturn = useToast();

    const [searchNeedle, setSearchNeedle] = useState<string>("");
    const [brandsQueryEnabled, setBrandsQueryEnabled] = useState<boolean>(fetchBrands);
    const [brandsAlertData, setBrandsAlertData] = useState<ErrorAlertType>({show: false});
    const [deleteBrandAlertData, setDeleteBrandAlertData] = useState<ErrorAlertType>({show: false});
    const [selectedBrand, setSelectedBrand] = useState<BrandType>(defaultSelectedBrand);
    const [brandsResponseData, setBrandsResponseData] = useState<BrandsResponseDataType>(defaultBrandsResponseData);

    const brandsResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["brands"],
        queryFn: () => brandsRequest(brandsResponseData.number, brandsResponseData.size, searchNeedle, brandsBaseUrl),
        enabled: brandsQueryEnabled,
    });

    const destroyBrandBrandResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyBrandRequestDataType, any> = useMutation({
        mutationFn: destroyBrand,
        onError: (error: AxiosError): void => {
            setDeleteBrandAlertData(errorAlert(error));
            setBrandsQueryEnabled(false);

            log("Destroy brand failure", destroyBrandBrandResponse);
        },
        onSuccess: (): void => {
            setDeleteBrandAlertData({show: false});
            setBrandsQueryEnabled(true);

            const toastMessage: string = `Marque ${selectedBrand.name} supprimée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onDeleteModalClose();

            log("Destroy brand successful", destroyBrandBrandResponse);
        }
    });

    if(brandsQueryEnabled && brandsResponse.isError) {
        setBrandsQueryEnabled(false);
        setBrandsAlertData(errorAlert(brandsResponse.error));

        log("Brands list failure", brandsResponse);
    }

    if(brandsQueryEnabled && brandsResponse.isSuccess && !brandsResponse.isFetching) {
        setBrandsQueryEnabled(false);
        setBrandsAlertData({show: false});

        setBrandsResponseData(brandsResponse.data.data);

        log("Brands list successful", brandsResponse);
    }

    const isBrandsPending: boolean = brandsResponse.isFetching;
    const isDeleteBrandPending: boolean = destroyBrandBrandResponse.isPending;

    const handleDeleteBrand = (): void => {
        setDeleteBrandAlertData({show: false});

        destroyBrandBrandResponse.mutate({id: selectedBrand.id});
    }

    const showDeleteModal = (brand: BrandType): void => {
        onDeleteModalOpen();
        setSelectedBrand(brand);
        setDeleteBrandAlertData({show: false});
    }

    const fetchPaginatedBrands = (next: boolean): void => {
        if(next && !brandsResponseData.last) setBrandsResponseData({...brandsResponseData, number: brandsResponseData.number + 1});
        else if(!next && !brandsResponseData.first) setBrandsResponseData({...brandsResponseData, number: brandsResponseData.number - 1})

        setBrandsQueryEnabled(true);

        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const fetchPaginatedNeedleBrands = (needle: string): void => {
        setSearchNeedle(needle);
        setBrandsResponseData({...brandsResponseData, number: 0});

        setBrandsQueryEnabled(true);
    }

    return {
        brandsResponseData,
        isBrandsPending,
        brandsAlertData,
        fetchPaginatedBrands,
        fetchPaginatedNeedleBrands,
        onDeleteModalClose,
        selectedBrand,
        showDeleteModal,
        isDeleteModalOpen,
        deleteBrandAlertData,
        isDeleteBrandPending,
        handleDeleteBrand,
    };
};

export default useBrandsTableListHook;