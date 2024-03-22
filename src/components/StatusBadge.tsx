import React, { FC, ReactElement } from "react";
import { Badge } from "@chakra-ui/react";

const StatusBadge: FC<StatusBadgeProps> = ({ enabled }): ReactElement => {
    return (
        enabled
        ? <Badge colorScheme="green" rounded="md">Active</Badge>
        : <Badge colorScheme="red" rounded="md">Desactivé</Badge>
    );
};

interface StatusBadgeProps {
    enabled: boolean
}

export default StatusBadge;