import { Box, Flex, Text, Table, Tbody, Tr, Td } from '@chakra-ui/react';
import React from 'react';

import DefButton from 'components/DefButton';
import { Colors } from 'utils/global';

type OpenByProps = {
    user: string;
    email: string | undefined;
};

type TicketInfoProps = {
    agent: string | undefined;
    openBy: OpenByProps;
    ticketReference: string | undefined;
    priority: string | undefined;
};

const TicketInfo = ({ agent, openBy, ticketReference, priority }: TicketInfoProps) => {
    return (
        <Box bg={Colors.black1d1} borderRadius="12px" p={5} flex={0.3}>
            <Text fontSize="12px" color="#E4E4E4" fontWeight="600">
                Ticket info
            </Text>

            <Flex my={3}>
                <Table className="ticket-info-table" variant="unstyled">
                    <Tbody>
                        <Tr>
                            <Td>Assigned Agent:</Td>
                            <Td>{agent}</Td>
                        </Tr>
                        <Tr>
                            <Td>Ticket Open by:</Td>
                            <Td>
                                {openBy.user}
                                <Text fontSize="9px" color={Colors.grey}>
                                    {openBy.email}
                                </Text>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>Ticket Reference:</Td>
                            <Td>
                                <Text color={Colors.grey}>{ticketReference}</Text>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>Priority:</Td>
                            <Td>
                                <Text color={Colors.positive}>{priority}</Text>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Flex>

            <DefButton w="100%" size="sm" title="Mark Ticket as Resolved" onClick={() => {}} />
        </Box>
    );
};

export default TicketInfo;
