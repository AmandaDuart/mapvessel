import { Select, SelectProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

import { Colors } from 'utils/global';
import './DefSelect.scss';

type DefSelectProps = {
    onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
    children?: ReactNode;
    value: string | undefined;
    placeholder: string;
} & SelectProps;

const DefSelect = ({ onChange, placeholder, value, children, ...props }: DefSelectProps) => {
    return (
        <Select
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            color={Colors.grey}
            {...props}
        >
            {children}
        </Select>
    );
};

export default DefSelect;
