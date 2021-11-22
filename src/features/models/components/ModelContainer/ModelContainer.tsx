import { TabPanel } from '@chakra-ui/react';
import React from 'react';

import DefTable from 'components/DefTable';
import DefTabs from 'components/DefTabs';

const tableHeader = [
    {
        title: 'Datasets',
    },
    {
        title: 'Number of Actual',
    },
    {
        title: 'Number of Statistics',
    },
    {
        title: 'Precision (%)',
    },
    {
        title: 'Recall (%)',
    },
    {
        title: 'Accuracy Rate (%)',
    },
];

const tableBody = [
    {
        link: '',
        body: ['City Traffic', 6823, 6861, 98.33, 98.87, 98.91],
    },
    {
        link: '',
        body: ['Urban Traffic', 5922, 6031, 98.17, 99.99, 99.97],
    },
    {
        link: '',
        body: ['Military Vehicles', 8517, 8694, 97.59, 99.61, 99.56],
    },
];

const ModelContainer = () => {
    return (
        <DefTabs tabList={['Statistics', 'Datasets', 'Labels']}>
            <TabPanel>
                <DefTable header={tableHeader} body={tableBody} />
            </TabPanel>
            <TabPanel>
                <DefTable header={tableHeader} body={tableBody} />
            </TabPanel>
            <TabPanel>
                <DefTable header={tableHeader} body={tableBody} />
            </TabPanel>
        </DefTabs>
    );
};

export default ModelContainer;
