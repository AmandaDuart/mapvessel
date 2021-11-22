import { Tabs, TabList, Tab, TabPanels, TabsProps } from '@chakra-ui/tabs';
import React from 'react';

import './DefTabs.scss';

type DefTabsProps = {
    tabList: string[];
} & TabsProps;

const DefTabs = ({ tabList, children, ...props }: DefTabsProps) => {
    return (
        <Tabs {...props}>
            <TabList>
                {tabList.map((tabLabel) => (
                    <Tab key={tabLabel}>{tabLabel}</Tab>
                ))}
            </TabList>

            <TabPanels>{children}</TabPanels>
        </Tabs>
    );
};

export default DefTabs;
