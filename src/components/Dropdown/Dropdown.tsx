import {
    Flex,
    Text,
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    AccordionProps,
    useOutsideClick,
} from '@chakra-ui/react';
import React, { useRef, RefObject } from 'react';

import { Colors } from 'utils/global';
import './Dropdown.scss';

type DropdownProps = {
    children: React.ReactNode;
    dropdownText: string;
    additionalText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    rightExpandedIcon?: React.ReactNode;
    w?: string | number;
} & AccordionProps;

const Dropdown = ({
    dropdownText,
    additionalText,
    leftIcon,
    rightIcon,
    rightExpandedIcon,
    children,
    w,
    ...props
}: DropdownProps) => {
    const ref = useRef() as RefObject<HTMLDivElement>;

    useOutsideClick({
        ref: ref,
        handler: () => {
            const button = document.querySelector('.chakra-accordion__button');
            button?.setAttribute('aria-expanded', 'false');
            const collapse = document.querySelector('.chakra-collapse');
            collapse?.setAttribute(
                'style',
                'overflow: hidden; display: none; opacity: 0; height: 0px;'
            );
        },
    });

    return (
        <>
            <Accordion ref={ref} allowToggle border="transparent" zIndex={100} w={w} {...props}>
                <AccordionItem>
                    {({ isExpanded }) => (
                        <>
                            <AccordionButton
                                pt={2}
                                pb={1}
                                px={0}
                                _expanded={{ bg: Colors.bgColor }}
                                borderTopRadius="12px"
                            >
                                <Flex w="100%" alignItems="center" justifyContent="space-evenly">
                                    {leftIcon}
                                    <Text color={Colors.white}>
                                        {dropdownText} {additionalText}
                                    </Text>
                                    {isExpanded ? rightExpandedIcon : rightIcon}
                                </Flex>
                            </AccordionButton>
                            <AccordionPanel
                                bg={Colors.bgColor}
                                borderBottomRadius="12px"
                                position="absolute"
                                pb={4}
                                className="dropdownList"
                                w={w}
                                px="0"
                            >
                                {children}
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>
            </Accordion>
        </>
    );
};

export default Dropdown;
