import React, {ChangeEvent, FC, ReactElement} from "react";
import {Link} from "react-router-dom";
import {
    Badge,
    Box,
    Button,
    Divider,
    HStack,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    Select,
    Input,
} from "@chakra-ui/react";

import EmptyTableAlert from "../../../../components/alert/EmptyTableAlert";
import ConfirmAlertDialog from "../../../../components/ConfirmAlertDialog";
import {mainRoutes} from "../../../../routes/mainRoutes";
import TableSkeletonLoader from "../../../../components/skeletonLoader/TableSkeletonLoader";
import useCountriesTableListHook, {CountriesResponseDataType, CountriesTableListHookType} from "./useCountriesTableListHook";
import CustomAlert from "../../../../components/alert/CustomAlert";
import {CountryType} from "../../show/showCountryData";
import {FiFlag, FiPlusSquare} from "react-icons/fi";
import {useTranslation} from "react-i18next";
import LocaleSwitcher from "../../../../components/LocaleSwitcher";
import RowImage from "../../../../components/RowImage";
import EditIconButton from "../../../../components/form/EditIconButton";
import DeleteIconButton from "../../../../components/form/DeleteButtonIcon";
import MoreIconButton from "../../../../components/form/MoreButtonIcon";
import useCountryDeleteHook, {CountryDeleteHookType} from "./useCountryDeleteHook";
import useCountryToggleHook, {CountryToggleHookType} from "./useCountryToggleHook";

const CountriesTableList: FC<CountriesTableListProps> = (
    {
        showCreator,
        fetchCountries = false,
        countriesBaseUrl
    }): ReactElement => {

    const {t} = useTranslation();
    const {
        countriesResponseData,
        isCountriesFetching,
        countriesAlertData,
        reloadList,
        showItems
    }: CountriesTableListHookType = useCountriesTableListHook({fetchCountries, countriesBaseUrl});
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
            <Filters />

            <Divider my={6} />

            <Actions showItems={showItems} />

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

const Filters: FC = (): ReactElement => {
    const {t} = useTranslation();

    return (
        <Stack px={6}>
            <Text>{t("filter")}</Text>
            <Stack direction={{base: "column", md: "row"}}>
                <Select name={"sort"} borderColor="gray.300">
                    <option value="">Choisir</option>
                </Select>
                <Select name={"sort"} borderColor="gray.300">
                    <option value="">Choisir</option>
                </Select>
                <Select name={"sort"} borderColor="gray.300">
                    <option value="">Choisir</option>
                </Select>
            </Stack>
        </Stack>
    );
};

const Actions: FC<{showItems: (a: number) => void}> = ({showItems}): ReactElement => {
    const {t} = useTranslation();

    return (
        <Stack px={6} justifyContent={"space-between"} direction={{base: "column", md: "row"}}>
            <Box w={{base: "full", md: "sm"}}>
                {/*<SearchField handleSearch={(needle: string) => fetchPaginatedNeedleCountries(needle)} />*/}
                <Input
                    type="text"
                    size="md"
                    placeholder="Rechercher..."
                />
            </Box>
            <Stack direction={{base: "column", md: "row"}}>
                <HStack>
                    <Text>{t("show")}</Text>
                    <Select name={"sort"} borderColor="gray.300" onChange={(event: ChangeEvent<HTMLSelectElement>) => showItems(parseInt(event.target.value))}>
                        <option value={7}>7</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={250}>250</option>
                    </Select>
                    <Text>{t("items")}</Text>
                </HStack>
                <HStack>
                    <LocaleSwitcher />
                    <Button leftIcon={<FiFlag />} as={Link} to={mainRoutes.addCountry.path}>
                        Ajouter un pays
                    </Button>
                </HStack>
            </Stack>
        </Stack>
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
                        <Th>{t("flag")}</Th>
                        <Th>{t("phone_code")}</Th>
                        <Th>{t("status")}</Th>
                        <Th>{t("created_at")}</Th>
                        {showCreator && <Th>{t("created_by")}</Th>}
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