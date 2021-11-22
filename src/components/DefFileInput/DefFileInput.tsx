import 'pages/login/login.scss';
import { Box, BoxProps, IconProps, Image, Flex } from '@chakra-ui/react';
import React from 'react';
import { useDropzone } from 'react-dropzone';

import { Colors } from 'utils/global';
import './DefFileInput.scss';

type DefFileInputProps = {
    placeholder: string;
    onChange: any;
    value?: string | undefined;
    leftIcon?: React.ReactElement<IconProps, string | React.JSXElementConstructor<any>>;
    rightIcon?: React.ReactElement<IconProps, string | React.JSXElementConstructor<any>>;
    noDrag?: boolean;
    acceptedFormats: string;
    //    size?: string;
    //    variant?: string;
} & BoxProps;

export default function DefFileInput({
    placeholder,
    value,
    onChange,
    leftIcon,
    rightIcon,
    noDrag = true,
    acceptedFormats,
    ...props
}: DefFileInputProps) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        noDrag: noDrag,
        maxFiles: 1,
        accept: acceptedFormats,
    });

    acceptedFiles.map((file: any) => {
        console.log('selected files:', file);
        onChange(file);
    });

    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    const handleClick = () => {
        hiddenFileInput?.current?.click();
    };

    const image = acceptedFiles.map((file) => (
        <Box key={file.name}>
            <Image src={URL.createObjectURL(file)} w="200px" alt="preview" />
        </Box>
    ));

    return (
        <>
            <Flex
                onClick={handleClick}
                border={`1.2px dashed ${Colors.bgColor2}`}
                borderRadius="6px"
                direction="column"
                px={5}
                py={3}
                cursor="pointer"
                fontSize="12px"
                fontWeight="600"
                {...getRootProps()}
                {...props}
            >
                <Box>
                    {leftIcon && leftIcon}
                    {value && noDrag ? value : placeholder}
                    {rightIcon && rightIcon}
                </Box>
                {!noDrag && value && <Box mt={3}>{image}</Box>}
            </Flex>
            <input
                className="file-input"
                type="file"
                ref={hiddenFileInput}
                //onChange={handleChange}
                {...getInputProps()}
                style={{ display: 'none' }}
            />
        </>
    );
}
