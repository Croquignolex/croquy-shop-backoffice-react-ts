import React, { FC, ReactElement } from "react";
import {Image} from "@chakra-ui/react";

import {ImageSizeEnumType, MediaType} from "../helpers/globalTypesHelper";

import noImage from "../assets/img/no-image.jpg";
import {API_MEDIA_V1_URL} from "../helpers/apiRequestsHelpers";

const ImageDisplay: FC<ImageDisplayProps> = ({image, size, height = 0, width= 0}): ReactElement => {
    let h: number = height;
    let w: number = width;
    let r: string = "md";

    switch (size) {
        case ImageSizeEnumType.ROW:
            h = 35;
            w = 35;
        break;
        case ImageSizeEnumType.SMALL:
            h = 120;
            w = 120;
            r = "xl";
        break;
        case ImageSizeEnumType.LARGE:
            h = 200;
            w = 500;
            r = "xl";
        break;
    }

    const src: string = image?.base64 || (image?.path ? API_MEDIA_V1_URL + image?.path : "");

    return (
        <Image
            maxW={w}
            maxH={h}
            // width={width ? width : undefined}
            // height={height ? height : undefined}
            rounded={r}
            objectFit='cover'
            src={src}
            fallbackSrc={noImage}
            borderWidth={1}
            alt='...'
        />
    );
};

interface ImageDisplayProps {
    image: MediaType | null,
    size?: ImageSizeEnumType,
    width?: number,
    height?: number,
}

export default ImageDisplay;