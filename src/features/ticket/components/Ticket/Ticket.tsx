import { Flex, Link, Icon, Stack } from '@chakra-ui/react';
import React from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';

import Logo from 'assets/images/Logo.png';

import TicketInfo from '../TicketInfo/TicketInfo';
import TicketThread from '../TicketThread/TicketThread';
import './Ticket.scss';

const ticketInfoTemp = {
    agent: 'Avery L.',
    openBy: {
        user: 'John Smith',
        email: 'johnsmith@domainname.com',
    },
    ticketReference: 'MTTJ-0134-EEGN',
    priority: 'Low',
};

const ticketTempProps = {
    subject: 'Username Change',
    openedIn: 'May 23 2021',
    messages: [
        {
            sender: 'You',
            time: '3 months ago',
            message: [
                'Hi guys, I want change username of my account to johnsmith99. Please let me know how to proceed.',
            ],
        },
        {
            sender: 'Avery L.',
            time: '3 months ago',
            message: [
                'Thank you for getting back to us. We hope this message finds you well.',
                "For your current account, unfortunately, it's not possible anymore. The only time you can have the username be changed is if you will create a totally new account.",
                'Should you require further assistance, feel free to write us back.',
            ],
            image: Logo,
            agent: true,
        },
        {
            sender: 'You',
            time: '3 months ago',
            message: ['Okay thank you.'],
        },
    ],
};

const Ticket = () => {
    const { id } = useParams();
    console.log(id);

    return (
        <Flex flex="1" direction="column" w="100%" minH="calc(100vh - 150px)" mt={5} mb={5}>
            <Link href="/support" display="flex" alignItems="center">
                <Icon as={RiArrowLeftLine} boxSize="20px" me={3} />
                Goto Support Tickets
            </Link>
            <Stack flex={1} mt={5} spacing={5} direction="row" align="flex-start">
                <TicketThread {...ticketTempProps} />
                <TicketInfo {...ticketInfoTemp} />
            </Stack>
        </Flex>
    );
};

export default Ticket;
