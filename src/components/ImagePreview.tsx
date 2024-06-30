import React, { FC, ReactElement } from "react";
import {Avatar, Image} from "@chakra-ui/react";

import defaultFlag from "../assets/img/default-flag.png";
import defaultSquareImage from "../assets/img/default-square-image.png.png";
import defaultRectangleImage from "../assets/img/default-retangle-image.png";

import {MediaType, ShapeEnumType, SizeType} from "../helpers/globalTypesHelper";
import {API_MEDIA_V1_URL} from "../helpers/apiRequestsHelpers";

const ImagePreview: FC<ImagePreviewProps> = (
    {
        image, 
        size,
        shape, 
        flag =  false,
        logo =  false,
        banner =  false,
        user =  false,
    }): ReactElement => {
    
    let h: number = 0;
    let w: number = 0;

    switch (size) {
        case SizeType.SMALL: h = 50; w = 50; break;
        case SizeType.MEDIUM: h = 100; w = 100; break;
        case SizeType.LARGE: h = 200; w = 200; break;
        case SizeType.EXTRA_LARGE: h = 300; w = 300; break;
    }

    const src: string = image?.base64 || (image?.path ? API_MEDIA_V1_URL + image?.path : "");
    let fallbackSrc: string = "";
    w = shape === ShapeEnumType.RECTANGLE ? h * 4 : w;
    h = shape === ShapeEnumType.RECTANGLE ? h * 2 : h;

    if(flag) fallbackSrc = defaultFlag;
    if(logo) fallbackSrc = defaultSquareImage;
    if(banner) fallbackSrc = defaultRectangleImage;

    return (
        <>
            {user
                ? (<Avatar bg="purple.500" src={src} maxW={w} maxH={h}/>)
                : (<Image src={src} fallbackSrc={fallbackSrc} maxW={w} maxH={h} alt="..." />)
            }
        </>
    );
};

interface ImagePreviewProps {
    image: MediaType | null,
    size: SizeType,
    shape: ShapeEnumType,
    flag?: boolean,
    logo?: boolean,
    banner?: boolean,
    user?: boolean,
}

export default ImagePreview;