import React, {FC, ReactElement} from "react";
import {Link} from "react-router-dom";
import {
    Badge,
    Box,
    Button,
    Divider,
    HStack,
    Spacer,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text, Select
} from "@chakra-ui/react";

import EmptyTableAlert from "../../../../components/alert/EmptyTableAlert";
import StatusBadge from "../../../../components/StatusBadge";
import Pagination from "../../../../components/Pagination";
import ConfirmAlertDialog from "../../../../components/ConfirmAlertDialog";
import {stringDateFormat} from "../../../../helpers/generalHelpers";
import {mainRoutes} from "../../../../routes/mainRoutes";
import TableSkeletonLoader from "../../../../components/skeletonLoader/TableSkeletonLoader";
import DoubleActionButton from "../../../../components/form/DoubleActionButton";
import useCountriesTableListHook from "./useCountriesTableListHook";
import CustomAlert from "../../../../components/alert/CustomAlert";
import SearchField from "../../../../components/form/SearchField";
import {CountryType} from "../../show/showCountryData";
import ImageDisplay from "../../../../components/ImageDisplay";
import {ImageSizeEnumType} from "../../../../helpers/globalTypesHelper";
import {CountriesTableListHookType} from "./countriesTableListData";
import {FiPlusSquare} from "react-icons/fi";
import {useTranslation} from "react-i18next";
import LocaleSwitcher from "../../../../components/LocaleSwitcher";

const CountriesTableList: FC<CountriesTableListProps> = ({showCreator = false, fetchCountries = false, countriesBaseUrl}): ReactElement => {
    const {t} = useTranslation();
    const {
        countriesResponseData,
        isCountriesPending,
        countriesAlertData,
        fetchPaginatedCountries,
        fetchPaginatedNeedleCountries,
        onDeleteModalClose,
        selectedCountry,
        showDeleteModal,
        isDeleteModalOpen,
        deleteCountryAlertData,
        isDeleteCountryPending,
        handleDeleteCountry,
    }: CountriesTableListHookType = useCountriesTableListHook({fetchCountries, countriesBaseUrl});

    return (
        <>
            <Stack h={"10vh"} px={6}>
                <Text>{t("filter")}</Text>
                <HStack>
                    <Select name={"sort"} borderColor="gray.300">
                        <option value="">Choisir</option>
                    </Select>
                    <Select name={"sort"} borderColor="gray.300">
                        <option value="">Choisir</option>
                    </Select>
                    <Select name={"sort"} borderColor="gray.300">
                        <option value="">Choisir</option>
                    </Select>
                </HStack>
            </Stack>
            <Divider my={2} />
            <HStack h={"10vh"} px={6} justifyContent={"space-between"}>
                <Box>
                    <SearchField handleSearch={(needle: string) => fetchPaginatedNeedleCountries(needle)} />
                </Box>
                <HStack>
                    <HStack>
                        <Text>{t("show")}</Text>
                        <Select name={"sort"} borderColor="gray.300">
                            <option value="">Choisir</option>
                        </Select>
                        <Text>{t("items")}</Text>
                    </HStack>
                    <LocaleSwitcher />
                    <Button
                        leftIcon={<FiPlusSquare />}
                        as={Link}
                        to={mainRoutes.addCountry.path}
                    >
                        Nouveau pays
                    </Button>
                </HStack>
            </HStack>
            <Divider />
            {/*<HStack px={6}>*/}
                <Box px={6}>
                    <CustomAlert data={countriesAlertData} />
                </Box>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Drapeau</Th>
                                <Th>Nom</Th>
                                <Th>Indice</Th>
                                <Th>Statut</Th>
                                <Th>Créer le</Th>
                                {showCreator && <Th>Créer par</Th>}
                                <Th textAlign={'right'}>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {isCountriesPending ? <TableSkeletonLoader /> : (
                                countriesResponseData.empty ? <EmptyTableAlert /> : (
                                    countriesResponseData.content.map((country: CountryType, index: number) => (
                                        <Tr key={index}>
                                            <Td><ImageDisplay image={country.flag} size={ImageSizeEnumType.ROW} /></Td>
                                            <Td>
                                                <Link
                                                    to={`${mainRoutes.countries.path}/${country.id}`}
                                                    className="link"
                                                    state={country}
                                                >
                                                    {country.name}
                                                </Link>
                                            </Td>
                                            <Td>{country.phoneCode}</Td>
                                            <Td><StatusBadge enabled={country.enabled}/></Td>
                                            <Td><Badge rounded="md">{stringDateFormat(country.createdAt)}</Badge></Td>
                                            {showCreator && (
                                                <Td>
                                                    <Link
                                                        to={`${mainRoutes.users.path}/${country.creator?.id}`}
                                                        className="link"
                                                        state={country.creator}
                                                    >
                                                        {country.creator?.username}
                                                    </Link>
                                                </Td>
                                            )}
                                            <Td textAlign={'right'}>
                                                <DoubleActionButton
                                                    isListView
                                                    state={country}
                                                    showDeleteModal={showDeleteModal}
                                                    edithPath={`${mainRoutes.countries.path}/${country.id}/edit`}
                                                />
                                            </Td>
                                        </Tr>
                                    ))
                                )
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Pagination
                    show={!countriesResponseData.empty}
                    handleNextPage={() => fetchPaginatedCountries(true)}
                    handlePreviousPage={() => fetchPaginatedCountries(false)}
                    currentPage={countriesResponseData.number + 1}
                    pages={countriesResponseData.totalPages}
                    totalElements={countriesResponseData.totalElements}
                    currentPageElements={countriesResponseData.numberOfElements}
                />
            {/*</HStack>*/}
            <ConfirmAlertDialog
                handleConfirm={handleDeleteCountry}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteCountryPending}
                alertData={deleteCountryAlertData}
            >
                Supprimer le pays <strong>{selectedCountry.name}</strong>?
            </ConfirmAlertDialog>
        </>
    );
};

interface CountriesTableListProps {
    showCreator?: boolean;
    fetchCountries?: boolean;
    countriesBaseUrl: string;
}

export default CountriesTableList;