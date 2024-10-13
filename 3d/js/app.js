// Copyright (c) 2024 YA-androidapp(https://github.com/yzkn) All rights reserved.


import { addProtocol, Map, maplibregl, NavigationControl, ScaleControl, TerrainControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// 標高タイル
import { useGsiTerrainSource } from 'maplibre-gl-gsi-terrain';

// エクスポート
import {
    MaplibreExportControl,
    Size,
    PageOrientation,
    Format,
    DPI
} from '@watergis/maplibre-gl-export';
import '@watergis/maplibre-gl-export/dist/maplibre-gl-export.css';

//toGeoJSON
import * as tj from '@mapbox/togeojson';

// Geocoding
import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder';
import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';


// const gsiTerrainSource = useGsiTerrainSource(addProtocol); // 地理院標高タイル
const gsiTerrainSource = useGsiTerrainSource(addProtocol, {
    tileUrl: 'https://tiles.gsj.jp/tiles/elev/mixed/{z}/{y}/{x}.png',
    maxzoom: 17,
    attribution: '<a href="https://gbank.gsj.jp/seamless/elev/">産総研シームレス標高タイル</a>'
});


const map = new Map({
    container: 'map',
    center: [139.767125, 35.681236],
    zoom: 10,
    pitch: 70,
    maplibreLogo: true,

    style: {
        version: 8,
        sources: {
            terrain: gsiTerrainSource,

            pale: {
                type: 'raster',
                tiles: ['https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果（名称：電子地形図（タイル））です。',
            },
            photo: {
                type: 'raster',
                tiles: ['https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg'],
                tileSize: 256,
                attribution: '出典：国土地理院ウェブサイト(https://maps.gsi.go.jp/development/ichiran.html)　この地理院タイルは基本測量成果（名称：電子地形図（タイル））です。',
            },
        },
        terrain: {
            source: 'terrain',
            exaggeration: 1.2,
        },
        layers: [
            {
                id: 'pale',
                type: 'raster',
                source: 'pale',
                layout: {
                    visibility: 'none',
                },
            },
            {
                id: 'photo',
                type: 'raster',
                source: 'photo',
            },
        ],
    },
    // style: 'https://gsi-cyberjapan.github.io/gsivectortile-mapbox-gl-js/std.json',
});

map.addControl(
    new NavigationControl({
        visualizePitch: true,
        showZoom: true,
        showCompass: true
    }),
    'bottom-right'
);

map.addControl(
    new ScaleControl()
);

map.addControl(
    new MaplibreGeocoder({
        forwardGeocode: async (config) => {
            const term = config.query;
            const response = await fetch(
                `https://msearch.gsi.go.jp/address-search/AddressSearch?q=${encodeURIComponent(term)}`
            );
            if (!response.ok) {
                return {};
            }
            const resultJson = await response.json();
            const features = resultJson.map(({ geometry: { coordinates: center }, properties }) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: center,
                },
                place_name: properties.title,
                center
            }));

            return {
                features,
            };
        },
    }, {
        maplibregl: maplibregl,
        marker: false,
        showResultsWhileTyping: true,
        placeholder: '地名検索',
        reverseGeocode: true,
    }),
    'top-right',
);

map.addControl(
    new TerrainControl({
        source: 'terrain',
        exaggeration: 1
    })
);

const exportControl = new MaplibreExportControl({
    PageSize: Size.A4,
    PageOrientation: PageOrientation.Landscape,
    Format: Format.PNG,
    DPI: DPI[400],
    Crosshair: false,
    PrintableArea: true,
    Local: 'ja',
    Filename: 'terrain'
});
map.addControl(exportControl, 'top-right');

map.on('moveend', async (e) => {
    document.title = 'mytrack3D (' + await reverseGeocoding(map.getCenter().lat, map.getCenter().lng) + '付近)';

    if ('URLSearchParams' in window) {
        const url = new URL(window.location);
        url.searchParams.set("lat", map.getCenter().lat);
        url.searchParams.set("lon", map.getCenter().lng);
        history.pushState(null, '', url);
    }

    // 35123401381234
    const latlon = Math.floor(map.getCenter().lat * 1000) * 100000000 + Math.floor(map.getCenter().lon * 1000);
    gtag('event', 'mapmove', { 'event_category': 'mapmove', 'event_label': 'mapmove3d', 'value': latlon });
})


function handleFilesSelect(evt) {
    const files = Array.from(evt.target.files);

    files.forEach(file => {

        console.log({ file })

        const reader = new FileReader();

        reader.onload = function (theFile) {
            let str = theFile.target.result;
            console.log({ str })

            let geoJSONcontent;
            if (file.name.endsWith('.kml')) {
                let kml = (new DOMParser()).parseFromString(str, 'text/xml');
                console.log({ kml })
                geoJSONcontent = tj.kml(kml);
            } else {
                // Parse as (geo)JSON
                geoJSONcontent = JSON.parse(str);
            }

            console.log({ geoJSONcontent })

            // Add as source to the map
            const dtime = new Date().getTime();

            map.addSource('uploaded' + dtime, {
                'type': 'geojson',
                'data': geoJSONcontent
            });

            map.addLayer({
                'id': 'uploaded' + dtime,
                'type': 'line',
                'source': 'uploaded' + dtime,
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': 'red',
                    'line-width': 3
                }
            });
        };
        reader.readAsText(file, 'UTF-8');

    });
}

document.getElementById('file').addEventListener('change', handleFilesSelect, false);