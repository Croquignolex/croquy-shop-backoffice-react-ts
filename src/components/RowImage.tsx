import React, { FC, ReactElement } from "react";
import {Link} from "react-router-dom";
import {HStack, Stack, Image, Text, Avatar} from "@chakra-ui/react";

import {MediaType} from "../helpers/globalTypesHelper";
import defaultFlag from "../assets/img/default-flag.png";
import defaultImage from "../assets/img/default-image.png";
import {API_MEDIA_V1_URL} from "../helpers/apiRequestsHelpers";
import {formatString} from "../helpers/generalHelpers";

const RowImage: FC<RowImageProps> = (
    {
        image,
        title,
        description,
        url,
        flag = false,
        logo = false,
        user = false,
        plain = false,
        state
    }): ReactElement | null => {

    const src: string = image?.base64 || (image?.path ? API_MEDIA_V1_URL + image?.path : "");
    let fallbackSrc: string = "";

    if(flag) fallbackSrc = defaultFlag;
    if(logo) fallbackSrc = defaultImage;

    if(!title) {
        return null;
    }

    return (
        <HStack>
            {!plain && (
                (user)
                    ? (<Avatar bg="gray.800" src={src} w={35} h={35} />)
                    : (<Image src={src} fallbackSrc={fallbackSrc} alt='...' maxW={35} maxH={35} />)
            )}
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
                <Text fontSize={"xs"} title={description}>{formatString(description, 30)}</Text>
            </Stack>
        </HStack>
    );
};

interface RowImageProps {
    image?: MediaType | null | undefined,
    title?: string,
    description?: string,
    flag?: boolean,
    logo?: boolean,
    user?: boolean,
    url: string,
    state: any,
    plain?: boolean,
}

export default RowImage;