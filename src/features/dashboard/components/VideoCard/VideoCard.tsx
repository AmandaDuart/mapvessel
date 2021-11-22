import {
    Flex,
    Circle,
    Icon,
    Text,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    IconButton,
} from '@chakra-ui/react';
import React from 'react';
import { RiMoreFill } from 'react-icons/ri';

import './VideoCard.scss';

type VideoCardProps = {
    index: number;
    selIndex: number | undefined;
    img: string;
    onTapImage: any;
    status: string;
    name: string;
    title: string;
    onRemove: (index: number) => void;
    // desc: string;
};

const VideoCard = ({
    index,
    selIndex,
    img,
    onTapImage,
    status,
    name,
    title,
    onRemove,
}: // desc,
VideoCardProps) => {
    return (
        <Flex
            id={'item' + index}
            className={`videocard-item ${index == selIndex ? 'selected' : ''}`}
            transition="all 0.5s ease"
            data-item="true"
            data-index={index}
            w="100%"
            minW="200px"
            minH="110px"
            bgImage={`url(${img})`}
            direction="column"
            justifyContent="space-between"
            alignItems="flex-end"
            onClick={() => {
                onTapImage({ imageUrl: img, status, name }, index);
            }}
        >
            <Circle className="cicle-more" p={1} m={0}>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<Icon as={RiMoreFill} h="18px" w="18px"></Icon>}
                        // variant="link"
                        colorScheme="black"
                        h="18px"
                        w="18px"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    />
                    <MenuList>
                        <MenuItem
                            color="black"
                            onClick={() => {
                                onRemove(index);
                            }}
                        >
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Circle>

            <Flex
                className="videocard-info"
                w="100%"
                h="30px"
                p={2}
                borderBottomRadius="6px"
                justifyContent="space-between"
                alignItems="center"
            >
                <Text fontSize="sm" fontWeight={600}>
                    {title}
                </Text>
                <Text
                    fontSize="sm"
                    fontWeight={600}
                    textTransform="capitalize"
                    className={`video-status-${status}`}
                >
                    {status}
                </Text>
            </Flex>
        </Flex>
    );
};

export default VideoCard;
