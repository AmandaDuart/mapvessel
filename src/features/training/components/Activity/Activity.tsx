import { Stack } from '@chakra-ui/react';
import React from 'react';

import DefAccordion from '../Accordion/Accordion';
import data from '../data2.json';
import Graphic from '../Graphic/Graphic';

const Activity = () => {
    return (
        <DefAccordion title="Activity">
            <Stack flex={1} justifyContent="center" spacing={7} py={5} ml={7} mr={5}>
                {Object.entries(data).map(([key, data]) => {
                    return <Graphic key={key} name={key} datas={data} />;
                })}
            </Stack>
        </DefAccordion>
    );
};

export default Activity;
