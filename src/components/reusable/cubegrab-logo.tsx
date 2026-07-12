import Image from "next/image"

interface CubeGrabLogoProps {
    width: number;
    height: number;
    alt?: string;
}

export const CubeGrabLogo = ({ width, height, alt }: CubeGrabLogoProps) => {
    return (
        <Image
            src="/images/CubeGrab.png"
            alt={alt || "CubeGrab Logo"}
            height={height}
            width={width}
            className="mx-auto mb-4"
        />
    )
}