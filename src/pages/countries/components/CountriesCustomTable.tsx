import React, {FC, ReactElement, useState} from "react";
import {useTranslation} from "react-i18next";
import {IconFlagCog} from "@tabler/icons-react";
import {
    Badge,
    CreateToastFnReturn,
    HStack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tr,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";

import EmptyTableAlert from "../../../components/alert/EmptyTableAlert";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import {mainRoutes} from "../../../routes/mainRoutes";
import TableSkeletonLoader from "../../../components/skeletonLoader/TableSkeletonLoader";
import {CountryType, defaultSelectedCountry} from "../show/showCountryData";
import RowImage from "../../../components/RowImage";
import EditIconButton from "../../../components/form/EditIconButton";
import DeleteIconButton from "../../../components/form/DeleteButtonIcon";
import MoreIconButton from "../../../components/form/MoreButtonIcon";
import TableHeader from "../../../components/table/TableHeader";
import DrawerForm from "../../../components/DrawerForm";
import CountryEditForm from "./CountryEditForm";
import ImageUpdateForm from "../../../components/ImageUpdateForm";
import {countriesApiURI} from "../../../constants/apiURIConstants";
import MoreMenuItem from "../../../components/form/MoreMenuItem";
import {PaginationType} from "../../../helpers/globalTypesHelper";
import {SortAndFilterRequestDataType} from "../../../hooks/useSortAndFilterHook";
import useIDActionRequestHook, {
    IDActionRequestHookType,
    IDActionRequestType
} from "../../../hooks/useIDActionRequestHook";

const CountriesCustomTable: FC<CustomTableProps> = (
    {
        showCreator = false,
        isCountriesPending,
        handleSort,
        reloadList,
        sortAndFilterData,
        countriesResponseData
    }): ReactElement => {

    const {onOpen: onEditCountryDrawerOpen, isOpen: isEditCountryDrawerOpen, onClose: onEditCountryDrawerClose} = useDisclosure();
    const {onOpen: onChangeCountryFlagDrawerOpen, isOpen: isChangeCountryFlagDrawerOpen, onClose: onChangeCountryFlagDrawerClose} = useDisclosure();
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [selectedCountry, setSelectedCountry] = useState<CountryType>(defaultSelectedCountry);

    const flagBaseUrl: string = countriesApiURI.flag;
    const deleteBaseUrl: string = countriesApiURI.destroy;
    const toggleBaseUrl: string = countriesApiURI.toggle;

    const deleteDone = (): void => {
        toast({
            title: t("delete"),
            description: `${t("country_deleted", {name: selectedCountry.name})}`
        });
        reloadList();
    };

    const toggleDone = (): void => {
        toast({
            title: t(`toggle_${selectedCountry.enabled}`),
            description: `${t(`country_toggled_${selectedCountry.enabled}`, {name: selectedCountry.name})}`
        });
        reloadList();
    };

    const {
        onModalClose: onDeleteModalClose,
        showModal: showDeleteModal,
        isModalOpen: isDeleteModalOpen,
        alertData: deleteCountryAlertData,
        isPending: isDeleteCountryPending,
        handleRequest: handleDeleteCountry,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: deleteDone,
        item: selectedCountry,
        baseUrl: deleteBaseUrl,
        type: IDActionRequestType.DELETE
    });

    const {
        onModalClose: onToggleModalClose,
        showModal: showToggleModal,
        isModalOpen: isToggleModalOpen,
        alertData: toggleCountryAlertData,
        isPending: isToggleCountryPending,
        handleRequest: handleToggleCountry,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: toggleDone,
        item: selectedCountry,
        baseUrl: toggleBaseUrl,
        type: IDActionRequestType.TOGGLE
    });

    const fields: Array<{field: string, label: string, show: boolean, sort: boolean, search: boolean}> = [
        {field: "name", label: "country", show: true, sort: true, search: true},
        {field: "phoneCode", label: "phone_code", show: true, sort: true, search: true},
        {field: "enabled", label: "status", show: true, sort: true, search: false},
        {field: "createdAt", label: "created_at", show: true, sort: true, search: false},
        {field: "creator", label: "created_by", show: showCreator, sort: false, search: false},
    ];

    return (
        <TableContainer>
            <Table size={"sm"}>
                <TableHeader fields={fields} handleSort={handleSort} sortAndFilterData={sortAndFilterData} />
                <Tbody>
                    {isCountriesPending ? <TableSkeletonLoader /> : (
                        countriesResponseData.empty ? <EmptyTableAlert /> : (
                            countriesResponseData.content.map((country: CountryType, index: number) => (
                                <Tr key={index}>
                                    <Td>
                                        <RowImage
                                            flag
                                            image={country.flag}
                                            title={country.name}
                                            state={country}
                                            url={`${mainRoutes.countries.path}/${country.id}`}
                                            description={country.description}
                                        />
                                    </Td>
                                    <Td>{country.phoneCode}</Td>
                                    <Td>
                                        <Badge colorScheme={`${country.enabled ? "green" : "red"}`}>
                                            {t(`status_${country.enabled}`)}
                                        </Badge>
                                    </Td>
                                    <Td>{t("date_time", {value: country.createdAt})}</Td>
                                    {showCreator && (
                                        <Td>
                                            <RowImage
                                                user
                                                image={country.creator?.avatar}
                                                title={country.creator?.firstName}
                                                state={country.creator}
                                                url={`${mainRoutes.users.path}/${country.creator?.id}`}
                                                description={country.creator?.email || country.creator?.username}
                                            />
                                        </Td>
                                    )}
                                    <Td>
                                        <HStack>
                                            <EditIconButton
                                                showEditDrawer={(): void => {
                                                    onEditCountryDrawerOpen();
                                                    setSelectedCountry(country);
                                                }}
                                            />
                                            <DeleteIconButton
                                                showDeleteModal={(): void => {
                                                    showDeleteModal();
                                                    setSelectedCountry(country);
                                                }}
                                            />
                                            <MoreIconButton
                                                url={`${mainRoutes.countries.path}/${country.id}`}
                                                state={country}
                                                status={country.enabled}
                                                showStatusToggleModal={(): void => {
                                                    showToggleModal();
                                                    setSelectedCountry(country);
                                                }}
                                            >
                                                <MoreMenuItem
                                                    label={t("change_flag")}
                                                    icon={IconFlagCog}
                                                    showDrawer={(): void => {
                                                        onChangeCountryFlagDrawerOpen();
                                                        setSelectedCountry(country);
                                                    }}
                                                />
                                            </MoreIconButton>
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))
                        )
                    )}
                </Tbody>
            </Table>

            <ConfirmAlertDialog
                danger
                handleConfirm={handleDeleteCountry}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteCountryPending}
                alertData={deleteCountryAlertData}
            >
                {t("delete_country")} <strong>{selectedCountry.name}</strong>?
            </ConfirmAlertDialog>

            <ConfirmAlertDialog
                title={t(`toggle_${selectedCountry.enabled}`)}
                handleConfirm={handleToggleCountry}
                isOpen={isToggleModalOpen}
                onClose={onToggleModalClose}
                isLoading={isToggleCountryPending}
                alertData={toggleCountryAlertData}
            >
                {t(`toggle_country_${selectedCountry.enabled}`)} <strong>{selectedCountry.name}</strong>?
            </ConfirmAlertDialog>

            <DrawerForm
                title={t("edit_country")}
                isOpen={isEditCountryDrawerOpen}
                onClose={onEditCountryDrawerClose}
            >
                <CountryEditForm
                    selectedCountry={selectedCountry}
                    finished={(): void => {
                        onEditCountryDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>

            <DrawerForm
                title={t("change_flag")}
                isOpen={isChangeCountryFlagDrawerOpen}
                onClose={onChangeCountryFlagDrawerClose}
            >
                <ImageUpdateForm
                    flag
                    item={selectedCountry}
                    image={selectedCountry.flag}
                    baseUrl={flagBaseUrl}
                />
            </DrawerForm>
        </TableContainer>
    );
};


interface CountriesResponseDataType extends PaginationType {
    content: Array<CountryType>,
}

interface CustomTableProps {
    showCreator?: boolean;
    reloadList: () => void,
    isCountriesPending: boolean;
    handleSort: (a: string, b: string) => void
    sortAndFilterData: SortAndFilterRequestDataType,
    countriesResponseData: CountriesResponseDataType,

}

export default CountriesCustomTable;