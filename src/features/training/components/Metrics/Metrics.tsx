import React from 'react';

import DefTable from 'components/DefTable';

import DefAccordion from '../Accordion/Accordion';

const tableHeader = [
    {
        title: 'Labels',
    },
    {
        title: 'Item Count',
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
        body: ['Bike', 6861, 98.33, 98.87, 98.91],
    },
    {
        link: '',
        body: ['Car', 6031, 98.17, 99.99, 99.97],
    },
    {
        link: '',
        body: ['Bus', 8694, 97.59, 99.61, 99.56],
    },
    {
        link: '',
        body: ['Tempo', 8694, 97.59, 99.61, 99.56],
    },
];

const Metrics = () => {
    return (
        <DefAccordion title="Metrics">
            <DefTable header={tableHeader} body={tableBody} />
        </DefAccordion>
    );
};

export default Metrics;
