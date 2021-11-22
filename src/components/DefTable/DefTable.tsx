import { Table, Thead, Tbody, Tr, Th, Td, Icon, TableProps, Link } from '@chakra-ui/react';
import React from 'react';
import { RiArrowUpDownLine } from 'react-icons/ri';

import './DefTable.scss';

type ThProps = {
    title: string;
    sortable?: boolean;
};

type BodyProps = {
    link: string | undefined;
    body: (string | number | React.ReactNode)[];
};

type DefTableProps = {
    header: ThProps[];
    body: BodyProps[];
} & TableProps;

const DefTable = ({ header, body, ...props }: DefTableProps) => {
    return (
        <Table className="custom-table" {...props}>
            <Thead>
                <Tr>
                    {header.map(({ title, sortable = true }) => {
                        return (
                            <Th key={title} py={5}>
                                {title}
                                {sortable && <Icon boxSize="18px" ms={2} as={RiArrowUpDownLine} />}
                            </Th>
                        );
                    })}
                </Tr>
            </Thead>
            <Tbody>
                {body.map(({ link, body }, index) => {
                    return (
                        <Tr key={index}>
                            {body.map((td, index) => (
                                <Td key={index} py={5}>
                                    <Link
                                        href={link || '#'}
                                        py={5}
                                        px={6}
                                        _hover={{ border: 'none' }}
                                        _focus={{ boxShaddow: 'none' }}
                                    >
                                        {td}
                                    </Link>
                                </Td>
                            ))}
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>
    );
};

export default DefTable;
