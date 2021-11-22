import { Flex, Box } from '@chakra-ui/react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useRef, useEffect, useState } from 'react';

import { Colors } from 'utils/global';

import { addVessels } from '../../../../utils/addVessels';

mapboxgl.accessToken =
    'pk.eyJ1IjoiZmFiaW9yZWlzdGkiLCJhIjoiY2tlbDFiYWZ2MDhodzJwbnVyOWl2Y3B5ZiJ9.hKG9xzctVNMEAYRLmS1hwA';

export default function VesselsMap() {
    const mapContainer: any = useRef(null);
    const map: any = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // Initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [lng, lat],
            zoom: zoom,
        });
        map.current.addControl(new mapboxgl.FullscreenControl());
        addVessels(map);
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('load', () => {
            map.current.loadImage(
                //url imagem no formato png
                'https://i.ibb.co/F5RVq1g/color-ship.png',
                (error: any, image: any) => {
                    if (error) throw error;

                    // Add the image to the map style.
                    map.current.addImage('vessel', image);
                }
            );
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <Box w="calc(100vw - 50px)" h="calc(100vh - 100px);">
            <Flex
                bgColor={Colors.bgColor2}
                color="#fff"
                className="modalg sidebar"
                opacity={0.5}
                p={3}
                zIndex={1}
                position="absolute"
                h="auto"
                w="inherit"
            >
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </Flex>
            <Box
                w="calc(100vw - 50px)"
                h="calc(100vh - 100px);"
                className="tamModal map-container"
                ref={mapContainer}
            />
        </Box>
    );
}
