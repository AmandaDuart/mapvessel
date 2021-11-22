import { Box, Flex, Text, Icon, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { RiSearchLine } from 'react-icons/ri';

import DefButton from 'components/DefButton';
import DefInput from 'components/DefInput';
import { Colors } from 'utils/global';

import TicketForm from '../TicketForm/TicketForm';
import TicketsContainer from '../TicketsContainer';
import './Support.scss';

const Support = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex flex="1" direction="column" w="100%" minH="calc(100vh - 150px)" mt={5} mb={5}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Text fontSize="24px">Your Tickets</Text>
                <DefInput
                    placeholder="Search Tickets"
                    size="md"
                    value=""
                    onChange={() => {}}
                    rightIcon={<Icon as={RiSearchLine} />}
                    p={5}
                    width="auto"
                />
            </Flex>

            <Box
                bg={Colors.black1d1}
                borderRadius="12px"
                py={5}
                overflowX="auto"
                className="scroll-container-bar"
            >
                <Flex justifyContent="space-between">
                    <TicketsContainer onOpen={onOpen} />

                    <DefButton
                        position="absolute"
                        right="20px"
                        me={5}
                        title="Open New Ticket"
                        onClick={onOpen}
                    />
                </Flex>
            </Box>

            <TicketForm isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};

export default Support;
