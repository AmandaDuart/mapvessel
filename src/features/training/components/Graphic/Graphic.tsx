import { Box, Text } from '@chakra-ui/react';
//import { FunctionComponent } from 'react';
import { LineChart, Legend, Label, Line, Tooltip, ResponsiveContainer } from 'recharts';

import { Colors } from 'utils/global';

export type DataType = {
    value: number;
};

type PropsType = {
    name: string;
    data?: DataType[];
    datas?: any;
};

const tempSettings = {
    loss: {
        training_loss: {
            name: 'Training Loss',
            stroke: '#7B61FF',
        },
        validation_loss: {
            name: 'Validation Loss',
            stroke: '#FF4626',
        },
        uncertainity: {
            name: 'Uncertainity',
            stroke: '#8B8D97',
        },
    },
    accuracy: {
        training_accuracy: {
            name: 'Training Accuracy',
            stroke: '#28C1C1',
        },
        validation_accuracy: {
            name: 'Validation Accuracy',
            stroke: '#FFC20C',
        },
        uncertainity: {
            name: 'Uncertainity',
            stroke: '#8B8D97',
        },
    },
};

const Graphic = ({ name, datas }: PropsType) => {
    const currentSettings = Object.entries(tempSettings).filter(([key]) => key === name);

    return (
        <Box>
            <Text
                mb={3}
                color={Colors.grey}
                textTransform="capitalize"
                fontWeight="bold"
                fontSize="16px"
            >
                {name}
            </Text>
            <Box
                className="graphic-box"
                maxW="100%"
                maxH="375px"
                minH="200px"
                px={4}
                pt={2}
                color={Colors.bgColor2}
                borderLeft="1px solid"
                borderBottom="1px solid"
            >
                <ResponsiveContainer width="99%" aspect={3}>
                    <LineChart data={datas}>
                        <Label value={name} offset={0} position="insideTopRight" />
                        <Tooltip
                            labelFormatter={() => name}
                            formatter={(value: number, name: string) => [`${name}: ${value}%`]}
                        />
                        <Legend
                            iconType="plainline"
                            verticalAlign="top"
                            height={36}
                            align="right"
                        />

                        {Object.entries(currentSettings[0][1]).map(
                            ([key, { name, stroke }]: any) => {
                                return (
                                    <Line
                                        key={key}
                                        dataKey={key}
                                        type="monotone"
                                        name={name}
                                        stroke={stroke}
                                        strokeWidth={3}
                                    />
                                );
                            }
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default Graphic;
