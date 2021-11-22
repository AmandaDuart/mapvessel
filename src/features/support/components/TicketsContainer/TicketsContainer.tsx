import { TabPanel, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';

import DefTable from 'components/DefTable';
import DefTabs from 'components/DefTabs';
import { Colors } from 'utils/global';

type TicketsContainerProps = {
    onOpen: () => void;
};

const tableHeader = [
    {
        title: 'Reference',
    },
    {
        title: 'Subject',
        sortable: false,
    },
    {
        title: 'Priority',
    },
    {
        title: 'Date Created',
    },
    {
        title: 'Last Action',
    },
];

const tableBody = [
    {
        link: '/ticket/0',
        body: [
            'MTTJ-0134-EEGN',
            'Username Change',
            <Text key={'low'} color={Colors.positive}>
                Low
            </Text>,
            'Sun, 23rd May 2021 4:32am',
            <Flex key={'action'}>
                <Text color={Colors.grey} me={4}>
                    Avery V.
                </Text>
                Sun, 23rd May 2021 10:27pm
            </Flex>,
        ],
    },
    {
        link: '/ticket/0',
        body: [
            'MTTJ-0134-EEG1',
            'Objects not loading',
            <Text key={'medium'} color={Colors.neutral}>
                Medium
            </Text>,
            'Mon, 17th May 2021 2:29am',
            <Flex key={'action'}>
                <Text color={Colors.grey} me={4}>
                    Emeline L.
                </Text>
                Fri, 14th Aug 2020 2:02pm
            </Flex>,
        ],
    },
    {
        link: '/ticket/0',
        body: [
            'MTTJ-0134-EEG2',
            'Error in reports',
            <Text key={'high'} color={Colors.negative}>
                High
            </Text>,
            'Wed, 12th Aug 2020 2:39pm',
            <Flex key={'action'}>
                <Text color={Colors.grey} me={4}>
                    You
                </Text>
                Fri, 14th Aug 2020 2:02pm
            </Flex>,
        ],
    },
];

const TicketsContainer = ({ onOpen }: TicketsContainerProps) => {
    const EmptyTab = () => {
        return (
            <Flex direction="column" alignItems="center" justifyContent="center" p={6}>
                <Text>There are no open tickets to display in this tab.</Text>
                <Link color={Colors.orange} variant="" onClick={onOpen}>
                    Click here to open a new ticket
                </Link>
            </Flex>
        );
    };

    return (
        <DefTabs flex={1} tabList={['Open Tickets', 'Resolved']}>
            <TabPanel>
                <DefTable header={tableHeader} body={tableBody} />
            </TabPanel>
            <TabPanel>
                <EmptyTab />
            </TabPanel>
        </DefTabs>
    );
};

export default TicketsContainer;
