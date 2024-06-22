import React, {FC, ReactElement} from "react";
import {useTranslation} from "react-i18next";
import {Box, Divider, useDisclosure} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import TableActions from "../../../components/table/TableActions";
import Pagination from "../../../components/Pagination";
import DrawerForm from "../../../components/DrawerForm";
import CountryAddForm from "./CountryAddForm";
import useTableListHook, {TableListHookType} from "../../../hooks/useTableListHook";
import useSortAndFilterHook, {SortAndFilterHookType} from "../../../hooks/useSortAndFilterHook";
import CountriesCustomTable from "./CountriesCustomTable";
import AddButton from "../../../components/form/AddButton";

const CountriesTableList: FC<CountriesTableListProps> = (
    {
        showCreator = false,
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
        responseData: countriesResponseData,
        isFetching: isCountriesFetching,
        alertData: countriesAlertData,
        reloadList,
    }: TableListHookType = useTableListHook({fetch: fetchCountries, sortAndFilterData});

    return (
        <Box py={4} rounded="lg" shadow="default" bg="white">
            <TableActions handleShowItems={handleShowItems} handleSearch={handleSearch} baseUrl={countriesBaseUrl}>
                <AddButton onAddDrawerOpen={onAddCountryDrawerOpen} />
            </TableActions>

            <Divider mt={6} />

            <Box px={6}>
                <CustomAlert data={countriesAlertData} />
            </Box>

            <CountriesCustomTable
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

interface CountriesTableListProps {
    showCreator?: boolean;
    fetchCountries?: boolean;
    countriesBaseUrl: string;
}

export default CountriesTableList;