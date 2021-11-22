import Icon from '@chakra-ui/icon';
import {
    Box,
    Circle,
    Flex,
    Stack,
    Text,
    Image,
    useDisclosure,
    Modal,
    ModalBody,
    ModalContent,
    Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
    RiFullscreenLine,
    RiMoreFill,
    RiVidiconLine,
    RiStopCircleLine,
    RiFullscreenExitLine,
    RiEyeOffLine,
    RiEyeLine,
} from 'react-icons/ri';

import { Colors } from 'utils/global';

import { ImageType } from '../MediaGallery/MediaGallery';
import VideoReport from '../VideoReport/VideoReport';

type VideoCointainerProps = {
    media: ImageType;
    fps: number | undefined;
    countingData?: any;
    classes?: string[];
    showVideo: boolean;
    videoTitle: string;
    video: string | undefined;
};

const VideoContainer = ({
    media,
    fps,
    classes = [],
    countingData,
    showVideo,
    video,
    videoTitle,
}: VideoCointainerProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showReport, setShowReport] = useState(true);
    return (
        <Box className="video-container" borderRadius="12px" flex="1" mb={3}>
            <Flex
                w="100%"
                bg={Colors.bgColor}
                px={4}
                py={2}
                borderTopRadius="12px"
                borderBottom={`20px solid ${Colors.bgColor}`}
                color="#E4E4E4"
                fontSize="14px"
                fontWeight="600"
            >
                <Stack flex="1" direction="row" spacing={10} alignItems="center">
                    <Text display="flex" alignItems="center">
                        <Icon color={Colors.grey} as={RiVidiconLine} boxSize="24px" me={2} />
                        {media.name}
                    </Text>
                    <Flex>
                        Title:&nbsp;
                        <Text color={Colors.grey2}>{videoTitle}</Text>
                        {/* <Text casing="capitalize" className={`video-status-${media.status}`}>
                            {videoTitle}
                        </Text> */}
                    </Flex>
                    <Flex>
                        Status:&nbsp;
                        <Text casing="capitalize" className={`video-status-running`}>
                            active
                        </Text>
                    </Flex>
                    <Text color={Colors.grey2}>{fps || 30}fps</Text>
                </Stack>
                <Stack flex="1" direction="row" justify="flex-end" spacing={3}>
                    <Circle
                        onClick={onOpen}
                        bg={Colors.bgColor2}
                        cursor="pointer"
                        p={2}
                        boxSize="36px"
                    >
                        <Icon as={RiFullscreenLine} boxSize="18px" />
                    </Circle>
                    <Circle bg={Colors.bgColor2} p={2} boxSize="36px">
                        <Icon as={RiMoreFill} boxSize="18px" />
                    </Circle>
                </Stack>
            </Flex>

            <Flex
                h="calc(100vh - 320px)"
                boxShadow="0px 0px 15px 10px rgba(0, 0, 0, 0.5)"
                justifyContent="center"
                position="relative"
            >
                {showVideo && video ? (
                    <video src={video} width="100%" height="100%" controls>
                        <track kind="captions" label="english_captions" />
                        Video is not available.
                    </video>
                ) : (
                    <Image
                        src={media.imageUrl}
                        maxH="100%"
                        objectFit="contain"
                        draggable="false"
                        borderRadius="12px"
                        id="main_stream_img"
                    />
                )}

                <Box
                    id="buffering-cover"
                    bg="#0009"
                    position="absolute"
                    left={0}
                    right={0}
                    bottom={0}
                    top={0}
                    color={'white'}
                    visibility="hidden"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Spinner color="white.500" marginRight={5} /> Buffering ...
                </Box>
            </Flex>

            <Modal isCentered onClose={onClose} isOpen={isOpen} size="full" scrollBehavior="inside">
                <ModalContent>
                    <ModalBody px={0} py="0" display="flex">
                        <Flex w="100%">
                            <Image
                                w="100%"
                                h={showReport ? 'calc(100vh - 75px)' : '100vh'}
                                src={media.imageUrl}
                            />
                            <Flex
                                h="150px"
                                w="270px"
                                bgColor={`rgba(29, 29, 29, 0.5);`}
                                borderRadius="12px"
                                backdropFilter="blur(30px)"
                                direction="column"
                                justifyContent="space-between"
                                my="30px"
                                position="absolute"
                                right="50%"
                            >
                                <Text
                                    pt={5}
                                    ps={6}
                                    color={Colors.orange}
                                    fontWeight="bold"
                                    display="flex"
                                    alignItems="center"
                                    fontSize="18px"
                                >
                                    <Icon as={RiVidiconLine} boxSize="24px" me="14px" />
                                    &nbsp;
                                    {media.name}
                                </Text>

                                <Box flex={1} mt="15px" alignSelf="center">
                                    <Flex mb="15px" fontWeight="bold">
                                        Status: &nbsp;
                                        <Text
                                            casing="capitalize"
                                            className={`video-status-running`}
                                            color={Colors.grey2}
                                        >
                                            active
                                        </Text>
                                    </Flex>
                                    <Text fontWeight="bold" color={Colors.grey2}>
                                        30fps
                                    </Text>
                                </Box>

                                <Box
                                    h="6px"
                                    w="100%"
                                    bg={Colors.orangeGradient}
                                    borderBottomRadius="12px"
                                ></Box>
                            </Flex>

                            <Stack
                                py="30px"
                                spacing="20px"
                                pe={4}
                                direction="row"
                                position="absolute"
                                right={0}
                            >
                                <Circle
                                    className="cicle-more"
                                    bg={Colors.blackGradient}
                                    opacity={0.5}
                                    boxSize="42px"
                                >
                                    <Icon as={RiStopCircleLine} w="21px" h="21px" />
                                </Circle>
                                <Circle
                                    bg={Colors.orangeGradient}
                                    boxSize="42px"
                                    cursor="pointer"
                                    onClick={onClose}
                                >
                                    <Icon as={RiFullscreenExitLine} w="21px" h="21px" />
                                </Circle>
                                <Circle bg={Colors.blackGradient} opacity={0.5} boxSize="42px">
                                    <Icon as={RiMoreFill} w="21px" h="21px" />
                                </Circle>

                                <Circle
                                    bg={Colors.blackGradient}
                                    opacity={0.5}
                                    boxSize="42px"
                                    cursor="pointer"
                                    onClick={() => setShowReport(!showReport)}
                                >
                                    <Icon
                                        as={showReport ? RiEyeOffLine : RiEyeLine}
                                        w="21px"
                                        h="21px"
                                    />
                                </Circle>
                            </Stack>
                        </Flex>

                        {showReport && (
                            <Flex
                                h="75px"
                                w="100%"
                                bg={Colors.orangeGradient}
                                borderTopRadius="12px"
                                position="absolute"
                                bottom={0}
                                backdropFilter="blur(10px)"
                            >
                                <VideoReport
                                    classes={classes}
                                    countingData={countingData}
                                    fullPage={true}
                                />
                            </Flex>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default VideoContainer;
