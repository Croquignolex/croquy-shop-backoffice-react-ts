import React, { FC, ReactElement } from "react";
import {Link} from "react-router-dom";
import {HStack, Stack, Image, Text, Avatar} from "@chakra-ui/react";

import defaultFlag from "../assets/img/default-flag.png";
import defaultSquareImage from "../assets/img/default-square-image.png.png";
import defaultRectangleImage from "../assets/img/default-retangle-image.png";

import {MediaType} from "../helpers/globalTypesHelper";
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
        banner = false,
        user = false,
        plain = false,
        unlink = false,
        state
    }): ReactElement | null => {

    const src: string = image?.base64 || (image?.path ? API_MEDIA_V1_URL + image?.path : "");
    let fallbackSrc: string = "";

    if(flag) fallbackSrc = defaultFlag;
    if(logo) fallbackSrc = defaultSquareImage;
    if(banner) fallbackSrc = defaultRectangleImage;

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
                {unlink ? (
                    <Text fontSize={"sm"}>
                        {title}
                    </Text>
                ) : (
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
                )}
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
    banner?: boolean,
    user?: boolean,
    url?: string,
    state?: any,
    plain?: boolean,
    unlink?: boolean
}

export default RowImage;