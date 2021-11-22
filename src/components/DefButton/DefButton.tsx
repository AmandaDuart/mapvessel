import 'pages/login/login.scss';
import { Button, ButtonProps, IconProps } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

import './DefButton.scss';

type GridControl = { base?: string; md?: string; lg?: string };

type PropsType = {
    title?: string;
    icon?: React.ReactElement<IconProps>;
    rightIcon?: React.ReactElement<IconProps>;
    leftIcon?: React.ReactElement<IconProps>;
    onClick: MouseEventHandler<HTMLButtonElement>;
    width?: number | GridControl;
    height?: number | GridControl;
    variant?: string;
    size?: string;
    isDisabled?: boolean;
    backgroundColor?: string;
} & ButtonProps;

export default function DefButton({
    title = '',
    onClick,
    width,
    height,
    variant = 'solid',
    size = 'md',
    rightIcon,
    leftIcon,
    isDisabled = false,
    icon,
    ...props
}: PropsType) {
    return (
        <Button
            size={size}
            onClick={onClick}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            className={`${variant} ${size}`}
            w={width}
            h={height}
            variant={variant}
            isDisabled={isDisabled}
            transition="all 0.3s linear"
            {...props}
        >
            {icon && icon}
            {title}
        </Button>
    );
}
