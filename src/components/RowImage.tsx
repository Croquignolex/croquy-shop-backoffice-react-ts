import React, { FC, ReactElement } from "react";
import {Avatar, Icon} from "@chakra-ui/react";
import {FiExternalLink, FiFlag} from "react-icons/fi";

const RowImage: FC<RowImageProps> = ({image}): ReactElement => {
    if(!image) {
        return <Avatar bg='gray.300' icon={<FiFlag fontSize='1.5rem' color='white' />} />;
    }

    return (
        <div>
            <Icon mr="2" as={FiExternalLink} fontSize='1rem' />
        </div>
    );
};

interface RowImageProps {
    image: string | null,
}

export default RowImage;