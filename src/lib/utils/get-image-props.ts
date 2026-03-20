import type { DirectusFile } from "@lib/directus/types";
import type { ImageInputFormat } from "astro";
import type { ComponentProps } from "astro/types";
import type { LocalImageProps, Picture, RemoteImageProps } from "astro:assets";
import { getEntry } from "astro:content";

const files = import.meta.glob<{ default: ImageMetadata }>(`/src/assets/directus/*`, {
    eager: true,
});

export async function getImageProps(
    image?: string | DirectusFile | null,
    options?: { isDirectusFile: boolean } & Partial<ComponentProps<typeof Picture>>
): Promise<ComponentProps<typeof Picture> | undefined> {
    if (!image) return;

    let imageFile = image as string | (Omit<DirectusFile, 'type'> & { format?: ImageInputFormat })
    if (typeof imageFile === 'string' && options?.isDirectusFile) {
        const res = await getEntry("Files", imageFile)
        if (res && 'id' in res.data) {
            const format = res.data.type?.replace('image/', '') as ImageInputFormat
            imageFile = res.data as DirectusFile
            imageFile['format'] = format
        }
    }

    const sharedProps = {
        formats: ["avif", "webp", "jpeg"],
        position: "center",
        fit: "contain",
        widths: [400, 600, 800],
        src: imageFile,
        alt: options?.alt || "",
        ...options,
    } as ComponentProps<typeof Picture>;

    if (typeof imageFile === "string") {
        if (sharedProps.width && sharedProps.height) {
            return {
                ...sharedProps,
                width: sharedProps.width,
                height: sharedProps.height,
                inferSize: false,
            };
        }
        return {
            ...sharedProps,
            inferSize: true,
        };

    }

    const src = {
        src: imageFile.filename_download ? files[imageFile.filename_download].default.src : '',
        width: sharedProps.width ?? imageFile.width,
        height: sharedProps.height ?? imageFile.height,
        format: sharedProps.format ?? imageFile.format
    }

    if (src.width && src.height && src.format) {
        return {
            ...sharedProps,
            src,
            width: src.width,
            height: src.height,
            format: src.format,
            alt: sharedProps.alt || imageFile.description || "",
        } as LocalImageProps;
    }

    return {
        ...sharedProps,
        ...src,
        inferSize: true,
        alt: options?.alt || imageFile.description || "",
    } as RemoteImageProps;


}