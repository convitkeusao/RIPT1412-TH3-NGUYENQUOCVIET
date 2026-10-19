import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

interface IconProps extends SvgProps {
    size?: number;
    color?: string;
}

const CloseIcon = ({ size = 24, color = "currentColor", ...props }: IconProps) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        {...props}
    >
        <Path d="M18 6 6 18M6 6l12 12" />
    </Svg>
);

export default CloseIcon;