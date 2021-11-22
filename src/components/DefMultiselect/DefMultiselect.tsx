import { Icon, Box, BoxProps } from '@chakra-ui/react';
import React from 'react';
import { RiCloseLine, RiArrowDropDownLine } from 'react-icons/ri';
import { MultiSelect } from 'react-multi-select-component';

import DefCheckbox from 'components/DefCheckbox';

import './DefMultiselect.scss';

type optionsProp = {
    label: string;
    value: string;
};

type DefMultiselectProps = {
    options: string[];
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    values: optionsProp[] | undefined;
    hasSelectAll?: boolean;
} & BoxProps;

const DefMultiselect = ({
    options,
    placeholder,
    values,
    onChange,
    hasSelectAll = true,
    ...props
}: DefMultiselectProps) => {
    const formattedOptions: optionsProp[] = options
        ? options.map((option) => {
              return { label: option, value: option.toLowerCase() };
          })
        : [];
    return (
        <Box {...props}>
            <MultiSelect
                disableSearch
                options={formattedOptions}
                hasSelectAll={hasSelectAll}
                labelledBy={placeholder}
                onChange={onChange}
                value={values ? values : []}
                ArrowRenderer={() => <Icon as={RiArrowDropDownLine} h="24px" w="24px" />}
                ClearIcon={<Icon as={RiCloseLine} h="0px" w="0px" />}
                overrideStrings={{ selectSomeItems: placeholder }}
                ItemRenderer={({ checked, option, onClick, disabled }: any) => (
                    <DefCheckbox
                        label={option.label}
                        isDisabled={disabled}
                        onChange={onClick}
                        isChecked={checked}
                    />
                )}
            />
        </Box>
    );
};

export default DefMultiselect;
