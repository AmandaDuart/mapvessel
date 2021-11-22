import { Checkbox, Icon } from '@chakra-ui/react';
import React from 'react';
import { RiCheckboxFill, RiCheckboxIndeterminateFill, RiCheckboxBlankLine } from 'react-icons/ri';

import { Colors } from 'utils/global';

import './DefCheckbox.scss';

type DefCheckboxProps = {
    label: string;
    isChecked: boolean;
    onChange: any;
    isDisabled?: boolean;
    className?: string;
    size?: string;
};

const DefCheckbox = ({
    label,
    isChecked,
    onChange,
    isDisabled,
    className,
    size = 'md',
}: DefCheckboxProps) => {
    return (
        <Checkbox
            className={className}
            onChange={onChange}
            isChecked={isChecked}
            isDisabled={isDisabled}
            color="#E4E4E4"
            bgColor="transparent"
            icon={<CustomIcon />}
            iconColor={isChecked ? Colors.orange : Colors.grey2}
            size={size}
        >
            {label}
        </Checkbox>
    );
};

const CustomIcon = (props: any) => {
    const { isIndeterminate, isChecked, ...rest } = props;
    let icon;

    if (isIndeterminate) icon = RiCheckboxIndeterminateFill;

    icon = isChecked ? RiCheckboxFill : RiCheckboxBlankLine;

    return <Icon boxSize="24px" as={icon} {...rest} />;
};

export default DefCheckbox;
