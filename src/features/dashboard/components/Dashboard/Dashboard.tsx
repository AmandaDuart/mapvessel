import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { io } from 'socket.io-client';

import { useAuth } from 'hooks/AuthContext';
import { useModel } from 'hooks/ModelContext';
import { Api } from 'utils/API';

import 'features/dashboard/components/Dashboard/Dashboard.scss';
import MediaGallery, { ImageType, AssetType } from '../MediaGallery/MediaGallery';
import VideoContainer from '../VideoContainer/VideoContainer';
import VideoController from '../VideoController/VideoController';
import VideoReport from '../VideoReport/VideoReport';

// const namespace = 'ws://142.114.205.202:5000/';
const namespace = process.env.REACT_APP_SOCKET_HOST || 'ws://142.114.205.202:5000/';
const socket = io(namespace);

const ASSET_PATH = process.env.REACT_APP_ASSET_VIDEO_PATH;

type Buffer = {
    base64: string;
    is_end: boolean;
    fps?: number;
    classes?: string[];
};

let buffer: Buffer[] = [];
let isBeganPlaying = false;
let isPlaying = false;
let isBuffering = false;
let timer: NodeJS.Timeout | undefined = undefined;

const BufferSize = 30;

const showBufferingCover = (show: boolean) => {
    const coverNode = document.getElementById('buffering-cover');
    if (coverNode) {
        coverNode.style.visibility = show ? 'visible' : 'hidden';
    }
};

const addBuffer = (buf: Buffer) => {
    buffer.push(buf);
    //console.log('added buffer : len ->', buffer.length);
    if (!isBeganPlaying && (buffer.length >= BufferSize || buf.is_end)) {
        isBeganPlaying = true;
        isBuffering = false;
        showBufferingCover(false);
        //todo trigger timeout
        if (timer) {
            clearInterval(timer);
        }

        isPlaying = true;
        timer = setInterval(() => {
            //console.log({
            //    isBuffering,
            //    isPlaying,
            //    isBeganPlaying,
            //});

            if (isPlaying == false) {
                return;
            }

            if (isBuffering) {
                const isGotEndFrame = buffer.length > 0 && buffer[buffer.length - 1].is_end;
                if (!isGotEndFrame && buffer.length < BufferSize) {
                    return;
                }
                isBuffering = false;
            }

            const buf: Buffer | undefined = popBuffer();
            if (buf && buf.base64) {
                if (isBuffering) {
                    isBuffering = false;
                }
                showBufferingCover(false);
                draw(buf.base64);
                if (buf.is_end) {
                    if (timer) clearInterval(timer);
                }
            } else {
                if (!isBuffering) {
                    isBuffering = true;
                }
                showBufferingCover(isBuffering);
            }
        }, 67);
    }
    if (!isBeganPlaying || buffer.length < BufferSize) {
        isBuffering = true;
        showBufferingCover(isBuffering);
    }
};

const popBuffer = (): Buffer | undefined => {
    if (buffer.length > 0) {
        const first = buffer[0];
        buffer = buffer.length > 1 ? buffer.slice(1) : [];
        return first;
    } else {
        isBuffering = true;
        return undefined;
    }
};

const cleanBuffer = () => {
    buffer = [] as Buffer[];
};

// const pausePlay = () => {
//     isPlaying = false;
// };

// const resumePlay = () => {
//     isPlaying = true;
// };

const stopPlay = () => {
    cleanBuffer();
    isBeganPlaying = false;
    isPlaying = false;
    console.log('stop play: timer : ', timer);
    if (timer) {
        clearInterval(timer);
    }
};

const draw = (imgData: any) => {
    console.log('socket data received at draw: ');
    // todo buffering logic

    const imgNode = document.getElementById('main_stream_img') as HTMLImageElement;
    if (imgNode) {
        imgNode.src = `data:image/jpg;base64,${imgData}`;
    }
};

export const Dashboard = () => {
    const [fps, setFps] = useState<number | undefined>(30);
    //const [modal, setModal] = useState<string>('');
    const { token } = useAuth();
    const [dataType, setDataType] = useState<any>(undefined);
    const [labels, setLabels] = useState<any>([]);
    const [classes, setClasses] = useState<string[]>([]);
    const [media, setMedia] = useState<ImageType>();
    const [selIndex, setSelIndex] = useState<number>();
    const [showVideo, setShowVideo] = useState<boolean>(false);
    const [assets, setAssets] = useState<AssetType[]>();
    // const useModel = React.useContext(modelContext);
    const { models, setActiveModel, activeModel, getModels } = useModel();
    const countingData = labels.length ? labels : activeModel?.data[dataType] || [];

    React.useEffect(() => {
        getModels();
    }, []);

    const loadVideoAsset = async () => {
        const res = await Api.getVideoAssets(token);
        if (res.status === 200) {
            console.log('loadVideoAsset', res.assets);
            setAssets(res.assets);
        } else {
            alert(res.error);
        }
    };

    React.useEffect(() => {
        // if (token) {
        loadVideoAsset();
        // }
    }, []);

    React.useEffect(() => {
        console.log({ socket });
        socket.on('open', () => console.log('socket connected'));
        socket.on('response', (msg) => {
            // todo buffering logic
            console.log('image', msg);
            const buf: Buffer = {
                base64: msg.detected_frame,
                is_end: !!msg.is_ended,
            };
            addBuffer(buf);
            setFps(msg.fps);
            setClasses(msg.classes);
            console.log('msg.is_ended => ', buf.is_end);
            // draw(msg.detected_frame);
            if (buf.is_end) {
                console.log('--->>>>> Reach out end framework : will stop detect.');
                onStop();
            }
        });
        // getModel(dispatch);
        console.log('socket listener set');
    }, []);

    const onStart = async () => {
        setShowVideo(false);

        const asset =
            Array.isArray(assets) && assets.length > 0 && selIndex !== undefined && selIndex >= 0
                ? assets[selIndex]
                : null;

        if (!asset) {
            alert('No selected asset.');
            return;
        }

        const path = ASSET_PATH + '/' + asset.filename;
        const classLabels = labels?.map((label: any) => label.value);

        const configData = {
            video_source: path,
            conf_thresh: 0.5,
            video_type: 'local_file',
            model: activeModel?.name || 'yolor',
            data_type: dataType || 'default',
            class_labels: { default: classLabels.length ? 'false' : 'true', labels: classLabels },
        };
        cleanBuffer();
        showBufferingCover(true);
        //todo begin timeout callback;
        console.log('socket emit: detect -> ', path, configData);
        socket.emit('detect', configData);
    };

    const onStop = () => {
        socket.emit('stop');
        console.log('Socket emit Stop request : >>>');
        stopPlay();
        showBufferingCover(false);
        //todo finish timeout callback
    };

    return (
        <Flex w="100%" h="100%" pt={5}>
            <Flex
                flex="1"
                direction={{ base: 'column-reverse', md: 'row' }}
                h={{ base: '100%', md: 'calc(100vh - 120px)' }}
                w="calc(100vw - 170px)"
            >
                <Flex flex="4" direction="column" m={{ base: 2, md: 4 }} mt={{ base: 4 }} h="100%">
                    {media && (
                        <VideoContainer
                            media={media}
                            fps={fps}
                            countingData={countingData}
                            classes={classes}
                            videoTitle={
                                assets &&
                                selIndex !== undefined &&
                                selIndex >= 0 &&
                                selIndex < assets?.length
                                    ? assets[selIndex].video_title
                                    : ''
                            }
                            showVideo={showVideo}
                            video={
                                assets &&
                                selIndex !== undefined &&
                                selIndex >= 0 &&
                                selIndex < assets.length
                                    ? process.env.REACT_APP_API_HOST + assets[selIndex].filepath
                                    : undefined
                            }
                        />
                    )}

                    <VideoController
                        models={models}
                        setActiveModel={setActiveModel}
                        types={activeModel?.datatypes ?? []}
                        dataType={dataType}
                        setDataType={setDataType}
                        labels={labels ?? []}
                        setLabels={setLabels}
                        isMediaSelected={media ? true : false}
                        onPlay={onStart}
                        onStop={onStop}
                        onRestart={() => {}}
                    />

                    {media && <VideoReport classes={classes} countingData={countingData} />}
                </Flex>

                <MediaGallery
                    onSelect={(image, index) => {
                        console.log(media);
                        setSelIndex(index);
                        setMedia(image);
                        setShowVideo(true);
                    }}
                    selIndex={selIndex}
                    assets={assets}
                    reloadCallback={loadVideoAsset}
                />
            </Flex>
        </Flex>
    );
};
