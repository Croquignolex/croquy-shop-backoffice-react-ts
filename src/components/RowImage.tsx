import React, { FC, ReactElement } from "react";
import {Link} from "react-router-dom";
import {HStack, Stack, Image, Text, Avatar} from "@chakra-ui/react";

import {MediaType} from "../helpers/globalTypesHelper";
import defaultFlag from "../assets/img/default-flag.png";
import {API_MEDIA_V1_URL} from "../helpers/apiRequestsHelpers";
import {formatString} from "../helpers/generalHelpers";

const RowImage: FC<RowImageProps> = (
    {
        image,
        title,
        description,
        url,
        flag,
        user,
        state
    }): ReactElement | null => {

    const src: string = API_MEDIA_V1_URL + image?.path;
    const fallbackSrc: string = flag ? defaultFlag : "";

    if(!title) {
        return null;
    }

    return (
        <HStack>
            {user
                ? (<Avatar bg="purple.500" src={src} w={35} h={35} />)
                : (<Image src={src} fallbackSrc={fallbackSrc} alt='...' maxW={35} maxH={35} />)
            }
            <Stack spacing={0}>
                <Text
                    as={Link}
                    to={url}
                    state={state}
                    fontSize={"sm"}
                    fontWeight={"bold"}
                    _hover={{color: "purple.500"}}
                >
                    {title}
                </Text>
                <Text fontSize={"xs"}>{formatString(description, 50)}</Text>
            </Stack>
        </HStack>
    );
};

interface RowImageProps {
    image: MediaType | null | undefined,
    title?: string,
    description?: string,
    flag?: boolean,
    user?: boolean,
    url: string,
    state: any,
}

export default RowImage;