"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import clsx from "clsx";

type Props = {
    fallbackSrc?: string;
} & Omit<ImageProps, "src"> & {
        src: string;
    };

export const ImageWithFallback = ({
    src,
    alt,
    fallbackSrc = "/images/logo/icon.svg",
    className,
    ...rest
}: Props) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasLoaded, setHasLoaded] = useState(false);

    return (
        <Image
            {...rest}
            alt={alt}
            src={imgSrc}
            onError={() => setImgSrc(fallbackSrc)}
            onLoad={() => setHasLoaded(true)}
            className={clsx(
                "transition-opacity duration-700 ease-in-out",
                !hasLoaded && "scale-105 opacity-0 blur-sm",
                hasLoaded && "scale-100 opacity-100 blur-0",
                className,
            )}
        />
    );
};
