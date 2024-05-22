import React, {ReactElement, FC, ChangeEvent} from "react";
import {Field, FormikProps} from "formik";
import {Input} from "@chakra-ui/react";

import {defaultMedia, MediaType} from "../../helpers/globalTypesHelper";
import {log, readFile} from "../../helpers/generalHelpers";


const HiddenFileField: FC<HiddenFileFieldProps> = ({id, image, handleImageUpdate, formikProps}): ReactElement => {
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length > 0) {
            const file: File = e.target.files[0];
            readFile(file)
                .then((imageDataUrl: string | null): void => {
                    if(image === null) handleImageUpdate({...defaultMedia, base64: imageDataUrl});
                    else handleImageUpdate({...image, base64: imageDataUrl});

                    formikProps.setFieldValue("image", file).then();
                })
                .catch(() => log("Erreur lors de la lecture de l'image"));
        }
    };

    return <Field as={Input} name="fake" type="file" accept="image/*" id={id} hidden onChange={handleFileUpload} />;
};

export interface HiddenFileFieldProps {
    handleImageUpdate: (a: MediaType | null) => void,
    image: MediaType | null,
    id: string,
    formikProps: FormikProps<any>;
}

export default HiddenFileField;