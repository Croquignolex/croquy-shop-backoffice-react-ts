import React, {FC, ReactElement} from "react";
import {useTranslation} from "react-i18next";
import {IconFlagPlus, IconFlagCog} from "@tabler/icons-react";
import {
    Badge,
    Box,
    Button,
    Divider, Flex,
    HStack, Icon, MenuItem,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";

import EmptyTableAlert from "../../../components/alert/EmptyTableAlert";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import {mainRoutes} from "../../../routes/mainRoutes";
import TableSkeletonLoader from "../../../components/skeletonLoader/TableSkeletonLoader";
import CustomAlert from "../../../components/alert/CustomAlert";
import {CountryType} from "../show/showCountryData";
import RowImage from "../../../components/RowImage";
import EditIconButton from "../../../components/form/EditIconButton";
import DeleteIconButton from "../../../components/form/DeleteButtonIcon";
import MoreIconButton from "../../../components/form/MoreButtonIcon";
import useCountryDeleteHook, {CountryDeleteHookType} from "../hooks/useCountryDeleteHook";
import useCountryToggleHook, {CountryToggleHookType} from "../hooks/useCountryToggleHook";
import TableActions from "../../../components/table/TableActions";
import TableHeader from "../../../components/table/TableHeader";
import Pagination from "../../../components/Pagination";
import DrawerForm from "../../../components/DrawerForm";
import CountryAddForm from "./CountryAddForm";
import useSortAndFilterHook, {
    SortAndFilterHookType,
    SortAndFilterRequestDataType
} from "../../../hooks/useSortAndFilterHook";
import useCountriesTableListHook, {
    CountriesResponseDataType,
    CountriesTableListHookType
} from "../hooks/useCountriesTableListHook";
import {FiToggleRight} from "react-icons/fi";

const CountriesTableList: FC<CountriesTableListProps> = (
    {
        showCreator,
        fetchCountries = false,
        countriesBaseUrl
    }): ReactElement => {

    const {onOpen: onAddCountryDrawerOpen, isOpen: isAddCountryDrawerOpen, onClose: onAddCountryDrawerClose} = useDisclosure();
    const {t} = useTranslation();
    const {
        handleChangePage,
        handleShowItems,
        handleSearch,
        handleSort,
        sortAndFilterData
    }: SortAndFilterHookType = useSortAndFilterHook({baseUrl: countriesBaseUrl});
    const {
        countriesResponseData,
        isCountriesFetching,
        countriesAlertData,
        reloadList,
    }: CountriesTableListHookType = useCountriesTableListHook({fetchCountries, sortAndFilterData});

    return (
        <Box py={4} rounded="lg" shadow="default" bg="white">
            <TableActions handleShowItems={handleShowItems} handleSearch={handleSearch} baseUrl={countriesBaseUrl}>
                <Button
                    leftIcon={<IconFlagPlus />}
                    px={{base: 4, sm: 6}}
                    onClick={onAddCountryDrawerOpen}
                >
                    {t("add_country")}
                </Button>
            </TableActions>

            <Divider mt={6} />

            <Box px={6}>
                <CustomAlert data={countriesAlertData} />
            </Box>

            <CustomTable
                handleSort={handleSort}
                isCountriesPending={isCountriesFetching}
                showCreator={showCreator}
                reloadList={reloadList}
                sortAndFilterData={sortAndFilterData}
                countriesResponseData={countriesResponseData}
            />

            <Pagination
                show={!countriesResponseData.empty}
                handleGotoPage={handleChangePage}
                currentPage={countriesResponseData.number + 1}
                totalPages={countriesResponseData.totalPages}
                totalElements={countriesResponseData.totalElements}
                currentPageElements={countriesResponseData.numberOfElements}
            />

            <DrawerForm
                title={t("add_country")}
                isOpen={isAddCountryDrawerOpen}
                onClose={onAddCountryDrawerClose}
            >
                <CountryAddForm
                    added={reloadList}
                    finished={(): void => {
                        onAddCountryDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </Box>
    );
};

const CustomTable: FC<CustomTableProps> = (
    {
        showCreator = false,
        isCountriesPending,
        handleSort,
        reloadList,
        sortAndFilterData,
        countriesResponseData
    }): ReactElement => {

    const {t} = useTranslation();
    const {
        onDeleteModalClose,
        selectedCountry: deletedCountry,
        showDeleteModal,
        isDeleteModalOpen,
        deleteCountryAlertData,
        isDeleteCountryPending,
        handleDeleteCountry,
    }: CountryDeleteHookType = useCountryDeleteHook({deleted: reloadList});
    const {
        onToggleModalClose,
        selectedCountry: toggledCountry,
        showToggleModal,
        isToggleModalOpen,
        toggleCountryAlertData,
        isToggleCountryPending,
        handleToggleCountry,
    }: CountryToggleHookType = useCountryToggleHook({toggled: reloadList});

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
                                                url={`${mainRoutes.countries.path}/${country.id}/edit`}
                                                state={country}
                                            />
                                            <DeleteIconButton
                                                state={country}
                                                showDeleteModal={showDeleteModal}
                                            />
                                            <MoreIconButton
                                                url={`${mainRoutes.countries.path}/${country.id}`}
                                                state={country}
                                                status={country.enabled}
                                                showStatusToggleModal={showToggleModal}
                                            >
                                                <MenuItem py={0} bg={"none"}>
                                                    <Flex
                                                        px={4}
                                                        py={2}
                                                        alignItems={"center"}
                                                        w={"full"}
                                                        _hover={{color: "purple.500"}}
                                                        // onClick={handleStatusToggleModal}
                                                    >
                                                        <Icon mr="2" as={IconFlagCog} fontSize={"lg"} />
                                                        {t("change_flag")}
                                                    </Flex>
                                                </MenuItem>
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
                {t("delete_country")} <strong>{deletedCountry.name}</strong>?
            </ConfirmAlertDialog>
            <ConfirmAlertDialog
                title={t(`toggle_${toggledCountry.enabled}`)}
                handleConfirm={handleToggleCountry}
                isOpen={isToggleModalOpen}
                onClose={onToggleModalClose}
                isLoading={isToggleCountryPending}
                alertData={toggleCountryAlertData}
            >
                {t(`toggle_country_${toggledCountry.enabled}`)} <strong>{toggledCountry.name}</strong>?
            </ConfirmAlertDialog>
        </TableContainer>
    );
};

interface CustomTableProps {
    showCreator?: boolean;
    reloadList: () => void,
    isCountriesPending: boolean;
    handleSort: (a: string, b: string) => void
    sortAndFilterData: SortAndFilterRequestDataType,
    countriesResponseData: CountriesResponseDataType,
}

interface CountriesTableListProps {
    showCreator?: boolean;
    fetchCountries?: boolean;
    countriesBaseUrl: string;
}

export default CountriesTableList;