import { Flex } from '@chakra-ui/react';
import React from 'react';

import Header from 'components/Nav/Header';
import Sidebar from 'components/Nav/Sidebar';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <Flex>
            <Sidebar />
            <Flex minH="100vh" w="calc(100% - 100px)" direction="column" p={5}>
                <Header />
                <main>{children}</main>
            </Flex>
        </Flex>
    );
};

export default Layout;
