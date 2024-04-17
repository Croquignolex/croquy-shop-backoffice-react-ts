import React, { FC, ReactElement } from "react";
import {Image} from "@chakra-ui/react";

import {ImageSizeEnumType} from "../helpers/globalTypesHelper";

import noImage from "../assets/img/no-image.jpg";

const DisplayImage: FC<DisplayImageProps> = ({image, size, height = 0, width= 0}): ReactElement => {
    let h: number = height;
    let w: number = width;

    switch (size) {
        case ImageSizeEnumType.row:
            h = 35;
            w = 35;
        break;
        case ImageSizeEnumType.small:
            h = 200;
            w = 200;
        break;
        case ImageSizeEnumType.large:
            h = 200;
            w = 200;
        break;
    }

    return (
        <Image
            maxW={w}
            maxH={h}
            width={width ? width : undefined}
            height={height ? height : undefined}
            rounded={"xl"}
            objectFit='cover'
            src={image || ""}
            fallbackSrc={noImage}
            borderWidth={1}
            alt='...'
        />
    );
};

interface DisplayImageProps {
    image: string | null,
    size?: ImageSizeEnumType,
    width?: number,
    height?: number,
}

export default DisplayImage;