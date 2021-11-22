import { Box, Stack, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { RiVideoAddLine, RiSearchLine, RiCloseLine } from 'react-icons/ri';

//import DefButton from 'components/DefButton';
//import DefFileInput from 'components/DefFileInput';
import DefInput from 'components/DefInput';
import { useAuth } from 'hooks/AuthContext';
import { Api } from 'utils/API';
//import DefModal from 'components/DefModal';
//import DefSelect from 'components/DefSelect';
import { Colors, Utils } from 'utils/global';

import 'features/dashboard/components/Dashboard/Dashboard.scss';
import VideoCard from '../VideoCard/VideoCard';
import VideoSourceModal from '../VideoSourceModal/VideoSourceModal';

export type ImageType = {
    imageUrl: string;
    status: string;
    name: string;
};

export type AssetType = {
    id: number;
    filename: string;
    assetType: string;
    filepath: string;
    video_title: string;
    video_desc: string;
    thumb: string;
    created_at: string;
    updated_at: string;
};

type MediaGalleryProps = {
    selIndex: number | undefined;
    // images: ImageType[];
    onSelect: (image: ImageType, index: number) => void | undefined;
    assets: AssetType[] | undefined | [];
    reloadCallback: () => void;
};

const MediaGallery = ({ selIndex, onSelect, assets, reloadCallback }: MediaGalleryProps) => {
    const { token } = useAuth();
    const [videoSource, setVideoSource] = useState<string>('');
    const [videoCameraUser, setVideoCameraUser] = useState<string>('');
    const [videoCameraPwd, setVideoCameraPwd] = useState<string>('');
    const [videoDescription, setVideoDescription] = useState<string>('');
    const [searchVideo, setSearchVideo] = useState('');
    const [video, setVideo] = useState<any>('');
    const [videoTitle, setVideoTitle] = useState<string>('');
    const [visibleAssets, setVisibleAssets] = useState<AssetType[]>([]);

    const [uploading, setUploading] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onTapImage = (img: ImageType, index: number) => {
        onSelect(img, index);
    };

    useEffect(() => {
        if (assets) {
            const filteredVideos = assets.filter(({ filename }) =>
                filename.toLowerCase().includes(searchVideo.toLowerCase())
            );
            console.warn(visibleAssets);

            setVisibleAssets(filteredVideos);
        }
    }, [searchVideo, assets]);

    const onSubmit = async () => {
        const data = {
            videoSource,
            video,
            videoTitle,
        };

        console.log('data', data);
        if (videoSource == 'local_file') {
            setUploading(true);
            //todo upload video file
            console.log('uploaded video file: ', video);
            const res = await Api.uploadVideo(token, video, videoTitle, videoDescription);
            console.log('upload result: ', res);
            if (res && res.status == 200) {
                console.log('Successfully uploaded video.');
            } else {
                console.log('Failed uploaded video.', res.error);
            }
            setUploading(false);
            if (reloadCallback) reloadCallback();
            onClose();
        }

        if (videoSource === 'ip_cam') {
            setUploading(true);
            //todo upload video file
            console.log('uploaded video file: ', video);
            const res = await Api.uploadVideoIPCam(
                token,
                video,
                videoTitle,
                videoDescription,
                videoCameraUser,
                videoCameraPwd
            );
            console.log('upload result: ', res);
            if (res && res.status == 200) {
                console.log('Successfully uploaded video.');
            } else {
                console.log('Failed uploaded video.', res.error);
            }
            setUploading(false);
            if (reloadCallback) reloadCallback();
            onClose();
        }
    };

    const onRemove = async (index: number) => {
        if (!assets) {
            return;
        }
        const assetId = assets[index].id;
        await Api.removeAsset(token, assetId);

        if (reloadCallback) {
            reloadCallback();
        }
    };

    return (
        <Box flex="1">
            <Stack
                id="gallery"
                className="scroll-container-bar"
                overflowX={{ base: 'auto', md: 'hidden' }}
                overflowY={{ base: 'hidden', md: 'auto' }}
                h={{ base: '120px', md: '100%' }}
                display={{ base: 'flex', md: 'block' }}
                direction={{ base: 'row', md: 'column' }}
                px={2}
                mb={4}
                spacing="12px"
            >
                <Box mb={3}>
                    <DefInput
                        placeholder="Search video sources"
                        value={searchVideo}
                        onChange={(e) => {
                            setSearchVideo(e.target.value);
                        }}
                        leftIcon={<Icon as={RiSearchLine} />}
                        rightIcon={
                            <Icon
                                display={searchVideo ? 'block' : 'none'}
                                cursor="pointer"
                                onClick={() => setSearchVideo('')}
                                as={RiCloseLine}
                            />
                        }
                        variant="flushed"
                        size="sm"
                        fontWeight="600"
                        fontSize="12px"
                    />
                </Box>
                <Flex
                    className="videocard-add-item"
                    transition="all 0.5s ease"
                    w="100%"
                    minW="200px"
                    minH="110px"
                    alignItems="center"
                    justifyContent="center"
                    color={Colors.grey}
                    border={`1px dashed ${Colors.grey}`}
                    borderRadius="6px"
                    onClick={onOpen}
                    cursor="pointer"
                >
                    <Icon color={Colors.grey} as={RiVideoAddLine} boxSize="24px" me={3} />
                    <Text fontSize="12px" fontWeight="600">
                        Add Video Source
                    </Text>
                </Flex>
                {assets &&
                    assets.map((asset, index) => (
                        <VideoCard
                            key={Utils.randKey()}
                            title={asset.video_title}
                            // desc={asset.video_desc}
                            index={index}
                            onTapImage={onTapImage}
                            selIndex={selIndex}
                            img={
                                process.env.REACT_APP_API_HOST + 'asset/video/thumbs/' + asset.thumb
                            }
                            onRemove={(index) => {
                                onRemove(index);
                            }}
                            status={''}
                            name={''}
                        />
                    ))}
            </Stack>

            <VideoSourceModal
                videoSource={videoSource}
                setVideoSource={setVideoSource}
                video={video}
                setVideo={setVideo}
                videoDescription={videoDescription}
                setVideoDescription={setVideoDescription}
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={onSubmit}
                uploading={uploading}
                videoTitle={videoTitle}
                setVideoTitle={setVideoTitle}
                videoCameraUser={videoCameraUser}
                setVideoCameraUser={setVideoCameraUser}
                videoCameraPwd={videoCameraPwd}
                setVideoCameraPwd={setVideoCameraPwd}
            />
        </Box>
    );
};

export default MediaGallery;
