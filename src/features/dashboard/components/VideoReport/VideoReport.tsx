import { Flex, Stack, Stat, StatLabel, StatNumber, Icon, StackDivider } from '@chakra-ui/react';
import React from 'react';
import { RiEyeLine } from 'react-icons/ri';

import DefButton from 'components/DefButton';
import { Colors, Utils } from 'utils/global';

type VideoReportProps = {
    countingData: any | undefined;
    classes: string[];
    fullPage?: boolean;
};

const VideoReport = ({ countingData, classes, fullPage = false }: VideoReportProps) => {
    return (
        <>
            {!fullPage && (
                <Flex>
                    <Flex
                        w="100%"
                        bg={Colors.bgColor}
                        wrap="wrap"
                        justify="space-between"
                        align="center"
                        borderRadius="12px"
                        py={3}
                        px={5}
                        mt={4}
                        gridGap={4}
                    >
                        <Stack direction="row" wrap="wrap" spacing={0} gridGap={4}>
                            {countingData &&
                                countingData.map((label: any) => {
                                    return (
                                        <Stat ms={0} key={Utils.randKey()}>
                                            <StatLabel color={Colors.grey}>
                                                {label.label || label}
                                            </StatLabel>
                                            <StatNumber fontSize="md" fontWeight="normal">
                                                {classes &&
                                                    classes.filter((data) => {
                                                        const l = label.label || label;
                                                        return l.toLowerCase() === data;
                                                    }).length}
                                                x
                                            </StatNumber>
                                        </Stat>
                                    );
                                })}
                        </Stack>
                        <DefButton
                            title="View Report"
                            leftIcon={<Icon as={RiEyeLine} boxSize="24px" />}
                            onClick={() => {}}
                            variant="link"
                            size="sm"
                        />
                    </Flex>
                </Flex>
            )}

            {fullPage && (
                <Flex
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    borderRadius="12px"
                    py={3}
                    px={5}
                    mt={4}
                    mb={4}
                >
                    <Stack
                        direction="row"
                        flex={0.75}
                        divider={<StackDivider me={4} borderColor={Colors.white} />}
                    >
                        {countingData &&
                            countingData.map((data: any, index: number) => {
                                return (
                                    <Stat key={index}>
                                        <Flex alignItems="center" justifyContent="space-around">
                                            <StatLabel fontWeight="normal" fontSize="16px">
                                                {data.title}
                                            </StatLabel>
                                            <StatNumber fontWeight="bold">
                                                {data.counting}x
                                            </StatNumber>
                                        </Flex>
                                    </Stat>
                                );
                            })}
                    </Stack>
                    <Flex
                        justify="flex-end"
                        bg={Colors.blackGradient}
                        opacity={0.75}
                        backdropFilter="blur(10px)"
                        px={5}
                        py={2}
                        borderRadius="6px"
                    >
                        <DefButton
                            title="View Report"
                            leftIcon={<Icon as={RiEyeLine} boxSize="24px" />}
                            onClick={() => {}}
                            variant="link"
                            size="sm"
                        />
                    </Flex>
                </Flex>
            )}
        </>
    );
};

export default VideoReport;
