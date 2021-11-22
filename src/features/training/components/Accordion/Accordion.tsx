import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    //Box,
    Flex,
    Icon,
    Text,
} from '@chakra-ui/react';
import React from 'react';
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri';

import { Colors } from 'utils/global';

type DefAccordionProps = {
    title: string;
    children?: React.ReactNode;
};

const DefAccordion = ({ title, children }: DefAccordionProps) => {
    return (
        <Flex bgColor={Colors.black1d1} borderRadius="12px">
            <Accordion allowToggle flex="1">
                <AccordionItem border="none" py={4}>
                    {({ isExpanded }) => (
                        <>
                            <AccordionButton
                                px={5}
                                _expanded={{
                                    borderBottom: `1px solid ${Colors.grey}`,
                                    paddingBottom: 4,
                                }}
                            >
                                <Flex flex="1">
                                    {isExpanded ? (
                                        <Icon as={RiArrowDownSFill} boxSize="32px" />
                                    ) : (
                                        <Icon as={RiArrowUpSFill} boxSize="32px" />
                                    )}
                                    <Text ms={2} fontSize="20px" fontWeight={700}>
                                        {title}
                                    </Text>
                                </Flex>
                            </AccordionButton>
                            <AccordionPanel pt={4} px={0}>
                                {children}
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>
            </Accordion>
        </Flex>
    );
};

export default DefAccordion;
