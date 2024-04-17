import React, { FC, ReactElement } from "react";
import {Skeleton, Box, Center, Stack} from "@chakra-ui/react";

import DisplayImage from "../DisplayImage";
import {ImageSizeEnumType} from "../../helpers/globalTypesHelper";

const ShowImage: FC<ShowImageProps> = ({image, isLoading}): ReactElement => {
   /* const {
        address, addressAlertData, isAddressPending
    }: DefaultAddressHookType = useDefaultAddressHook({url});*/

    return (
        <>
            <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                <Center>
                    {isLoading ? <Skeleton height={200} width={200} rounded={"xl"} /> : (
                        <div>
                            <DisplayImage image={image} size={ImageSizeEnumType.small} />
                        </div>
                    )}
                </Center>
            </Stack>
        </>
    )
};

interface ShowImageProps {
    image: string | null,
    isLoading: boolean,
}

export default ShowImage;