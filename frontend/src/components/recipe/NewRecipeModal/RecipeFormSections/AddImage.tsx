/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-props-no-spreading */
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import compress from 'browser-image-compression';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

/** Types */
interface AddImageProps {
    image: string | null; // base64
    setImage: (image: string | null) => void;
}

interface GetColorProps {
    isDragAccept: boolean;
    isDragReject: boolean;
    isDragActive: boolean;
}

/** Styles */
const getColor = (props: GetColorProps) => {
    if (props.isDragAccept) {
        return '#028a48';
    }
    if (props.isDragReject) {
        return '#ad1735';
    }
    if (props.isDragActive) {
        return '#165486';
    }
    return '#eeeeee';
};

const DropZone = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 300px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${(props: GetColorProps) => getColor(props)};
    border-style: dashed;
    background-color: #242424;
    color: #b1b1b1;
    justify-content: center;
    text-align: center;
    outline: none;
    transition: border 0.24s ease-in-out;
    cursor: pointer !important;

    &:hover {
        color: #ffffff;
    }
`;

const RecipeImage = styled.img`
    height: 400px;
    width: -webkit-fill-available;
    object-fit: cover;
    padding: 8px 0;
    z-index: -1;
`;

const HoverIcon = styled.div`
    height: 300px;
    width: 364px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    visibility: hidden;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ImageContainer = styled.div`
    &:hover ${HoverIcon} {
        visibility: visible;
    }

    &:hover ${RecipeImage} {
        opacity: 0.3;
    }
`;

export function AddImage(props: AddImageProps) {
    const { image, setImage } = props;

    const onDrop = useCallback(
        async (files) => {
            // compress the image
            const compressed_image = await compress(files[0], { maxSizeMB: 1 });

            // convert to base64
            const base64 = await blobToBase64(compressed_image);
            setImage(base64);
        },
        [setImage],
    );

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
    });

    return image ? (
        <ImageContainer>
            <RecipeImage src={image} />
            <HoverIcon>
                <IconButton onClick={() => setImage(null)}>
                    <Delete />
                </IconButton>
            </HoverIcon>
        </ImageContainer>
    ) : (
        <DropZone
            {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>{`Drop the image here ...`}</p>
            ) : (
                <p>{`Drag 'n' drop an image here, or click to select an image`}</p>
            )}
        </DropZone>
    );
}

function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
    });
}
