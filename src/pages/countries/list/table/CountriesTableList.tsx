import React, {FC, ReactElement} from "react";
import {
    Badge,
    Box,
    Divider,
    HStack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";

import EmptyTableAlert from "../../../../components/alert/EmptyTableAlert";
import ConfirmAlertDialog from "../../../../components/ConfirmAlertDialog";
import {mainRoutes} from "../../../../routes/mainRoutes";
import TableSkeletonLoader from "../../../../components/skeletonLoader/TableSkeletonLoader";
import useCountriesTableListHook, {CountriesResponseDataType, CountriesTableListHookType} from "./useCountriesTableListHook";
import CustomAlert from "../../../../components/alert/CustomAlert";
import {CountryType} from "../../show/showCountryData";
import {useTranslation} from "react-i18next";
import RowImage from "../../../../components/RowImage";
import EditIconButton from "../../../../components/form/EditIconButton";
import DeleteIconButton from "../../../../components/form/DeleteButtonIcon";
import MoreIconButton from "../../../../components/form/MoreButtonIcon";
import useCountryDeleteHook, {CountryDeleteHookType} from "./useCountryDeleteHook";
import useCountryToggleHook, {CountryToggleHookType} from "./useCountryToggleHook";
import TableActions from "../../../../components/table/TableActions";
import useSortAndFilterHook, {SortAndFilterHookType} from "../../../../hooks/useSortAndFilterHook";
import TableHeaderCel from "../../../../components/table/TableHeaderCel";

const CountriesTableList: FC<CountriesTableListProps> = (
    {
        showCreator,
        fetchCountries = false,
        countriesBaseUrl
    }): ReactElement => {

    const {t} = useTranslation();
    const {showItems, search, sortAndFilterData}: SortAndFilterHookType = useSortAndFilterHook({baseUrl: countriesBaseUrl});
    const {
        countriesResponseData,
        isCountriesFetching,
        countriesAlertData,
        reloadList,
    }: CountriesTableListHookType = useCountriesTableListHook({fetchCountries, sortAndFilterData});
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


    return (
        <>
            <TableActions showItems={showItems} search={search} />

            <Divider mt={6} />

            <Box px={6}><CustomAlert data={countriesAlertData} /></Box>

            <CustomTable
                isCountriesPending={isCountriesFetching}
                showCreator={showCreator}
                showDeleteModal={showDeleteModal}
                showToggleModal={showToggleModal}
                countriesResponseData={countriesResponseData}
            />

            {/*<Pagination
                show={!countriesResponseData.empty}
                handleNextPage={() => fetchPaginatedCountries(true)}
                handlePreviousPage={() => fetchPaginatedCountries(false)}
                currentPage={countriesResponseData.number + 1}
                pages={countriesResponseData.totalPages}
                totalElements={countriesResponseData.totalElements}
                currentPageElements={countriesResponseData.numberOfElements}
            />*/}
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
        </>
    );
};

const CustomTable: FC<CustomTableProps> = (
    {
        showCreator,
        isCountriesPending,
        showDeleteModal,
        showToggleModal,
        countriesResponseData
    }): ReactElement => {

    const {t} = useTranslation();

    return (
        <TableContainer>
            <Table size={"sm"}>
                <Thead>
                    <Tr>
                        <TableHeaderCel label={"country"} field={"name"} />
                        <TableHeaderCel label={"phone_code"} field={"phoneCode"} />
                        <TableHeaderCel label={"status"} field={"enabled"} />
                        <TableHeaderCel label={"created_at"} field={"createdAt"} />
                        {showCreator && <TableHeaderCel label={"created_by"} field={"creator"} />}
                        <Th>{t("actions")}</Th>
                    </Tr>
                </Thead>
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
                                            />
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))
                        )
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

interface CustomTableProps {
    showCreator?: boolean;
    isCountriesPending: boolean;
    showDeleteModal: (a: CountryType) => void,
    showToggleModal: (a: CountryType) => void,
    countriesResponseData: CountriesResponseDataType,
}

interface CountriesTableListProps {
    showCreator?: boolean;
    fetchCountries?: boolean;
    countriesBaseUrl: string;
}

export default CountriesTableList;