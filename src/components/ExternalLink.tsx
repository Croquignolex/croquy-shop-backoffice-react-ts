import React, { FC, ReactElement } from "react";
import {Icon} from "@chakra-ui/react";
import {FiExternalLink} from "react-icons/fi";
import {Link} from "react-router-dom";

const ExternalLink: FC<ExternalLinkProps> = ({label, path, state = null}): ReactElement | null => {
    if(!label) {
        return null;
    }

    return (
        <Link to={path} className="link" state={state}>
            <Icon mr="2" as={FiExternalLink} fontSize='1rem' />
            {label}
        </Link>
    );
};

interface ExternalLinkProps {
    label?: string,
    path: string,
    state?: any
}

export default ExternalLink;