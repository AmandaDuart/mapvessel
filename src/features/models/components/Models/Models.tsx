import { Box, Flex, Text, Divider } from '@chakra-ui/react';
import { useState } from 'react';

import { Colors } from 'utils/global';

import ModelContainer from '../ModelContainer/ModelContainer';
import ModelController from '../ModelController/ModelController';
import ModelsGallery from '../ModelsGallery/ModelsGallery';

import './Models.scss';

const models = [
    {
        model: 'YOLOv3',
        lastRun: 'Never run',
    },
    {
        model: 'YOLOR',
        lastRun: 'Never run',
    },
    {
        model: 'Scaled Yolov4',
        lastRun: 'Never run',
    },
    {
        model: 'YOLOv3',
        lastRun: 'Never run',
    },
    {
        model: 'YOLOR',
        lastRun: 'Never run',
    },
    {
        model: 'Scaled Yolov4',
        lastRun: 'Never run',
    },
];

const Models = () => {
    const [activeModel, setActiveModel] = useState(0);

    return (
        <Flex
            flex="1"
            w="100%"
            h="calc(100vh - 150px)"
            mt={5}
            mb={5}
            bg={Colors.black1d1}
            borderRadius="12px"
        >
            <Box
                minW="200px"
                flex={0.5}
                py={5}
                px={5}
                className="scroll-container-bar"
                overflowX="hidden"
                overflowY="auto"
            >
                <ModelsGallery
                    models={models}
                    activeModel={activeModel}
                    setActiveModel={setActiveModel}
                />
            </Box>

            <Box>
                <Divider orientation="vertical" borderColor={Colors.bgColor2} />
            </Box>

            <Flex flex={1} direction="column" w="100%" mb={3} mt={{ base: 5, md: 0 }}>
                <ModelController />
                <Divider borderColor={Colors.bgColor2} />
                <Box pt={7} px={7}>
                    <Flex justifyContent="space-between" mb={2}>
                        <Text
                            alignSelf="center"
                            color={Colors.white}
                            fontSize="20px"
                            fontWeight="bold"
                        >
                            {models[activeModel].model}
                        </Text>
                        <Flex fontSize="12px" color="#666A76">
                            Last run:&nbsp;
                            <Text fontWeight="bold">{models[activeModel].lastRun}</Text>
                        </Flex>
                    </Flex>
                    {/* <Text color="#666A76">
                        Trains a Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </Text> */}
                </Box>

                <Box
                    flex={1}
                    width="100%"
                    mt={10}
                    className="scroll-container-bar"
                    overflowX="hidden"
                    overflowY="auto"
                >
                    <ModelContainer />
                </Box>
            </Flex>
        </Flex>
    );
};

export default Models;
