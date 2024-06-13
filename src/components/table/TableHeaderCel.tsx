import React, {FC, ReactElement} from "react";
import {HStack, Th, Text, Icon} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {IconArrowsSort} from '@tabler/icons-react';

const TableHeaderCel: FC<TableHeaderCelProps> = ({label, field}): ReactElement => {
    const {t} = useTranslation();

    return (
        <Th>
            <HStack justifyContent={"space-between"}>
                <Text>{t(label)}</Text>
                <Icon
                    as={IconArrowsSort}
                    cursor={"pointer"}
                    fontSize={"lg"}
                    _hover={{color: "gray.900"}}
                />
            </HStack>
        </Th>
    );
};

interface TableHeaderCelProps {
    label: string,
    field: string,
}

export default TableHeaderCel;