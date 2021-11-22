import 'pages/login/login.scss';
import {
    IconProps,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    InputProps,
} from '@chakra-ui/react';

import { Colors } from 'utils/global';
import './DefInput.scss';

type PropType = {
    placeholder: string;
    type?: string;
    value: string | undefined;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    leftIcon?: React.ReactElement<IconProps, string | React.JSXElementConstructor<any>>;
    rightIcon?: React.ReactElement<IconProps, string | React.JSXElementConstructor<any>>;
    size?: string;
    variant?: string;
} & InputProps;

export default function DefInput({
    placeholder,
    type = 'text',
    value,
    onChange,
    leftIcon,
    rightIcon,
    size = 'lg',
    variant = 'outline',
    ...props
}: PropType) {
    return (
        <InputGroup size={size} width="auto">
            {leftIcon && (
                <InputLeftElement color={Colors.grey} fontSize="1.2em">
                    {leftIcon}
                </InputLeftElement>
            )}
            <Input
                type={type}
                color={Colors.orange}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                variant={variant}
                className={variant}
                {...props}
            />
            {rightIcon && (
                <InputRightElement color={Colors.grey} fontSize="1.2em">
                    {rightIcon}
                </InputRightElement>
            )}
        </InputGroup>
    );
}
